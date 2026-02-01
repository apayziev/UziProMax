from typing import Any

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_password_hash, verify_password
from app.models.user import User
from app.schemas.users import UserCreate, UserUpdate

from .base import BaseCRUD


class CRUDUser(BaseCRUD[User]):
    """CRUD operations for User model with authentication logic."""

    async def get_by_phone(
        self,
        db: AsyncSession,
        phone: str,
        is_deleted: bool = False,
    ) -> User | None:
        """Get user by phone number.

        Parameters
        ----------
        db : AsyncSession
            The database session.
        phone : str
            Phone number to search for.
        is_deleted : bool, default=False
            Whether to include deleted users.

        Returns
        -------
        User | None
            The user if found, None otherwise.
        """
        return await self.get(db, phone=phone, is_deleted=is_deleted)

    async def get_by_username(
        self,
        db: AsyncSession,
        username: str,
        is_deleted: bool = False,
    ) -> User | None:
        """Get user by username.

        Parameters
        ----------
        db : AsyncSession
            The database session.
        username : str
            Username to search for.
        is_deleted : bool, default=False
            Whether to include deleted users.

        Returns
        -------
        User | None
            The user if found, None otherwise.
        """
        return await self.get(db, username=username, is_deleted=is_deleted)

    async def create(
        self,
        db: AsyncSession,
        user_create: UserCreate,
    ) -> User:
        """Create a new user with hashed password.

        Parameters
        ----------
        db : AsyncSession
            The database session.
        user_create : UserCreate
            User creation data including plain password.

        Returns
        -------
        User
            The created user instance.

        Raises
        ------
        Exception
            If email or username already exists (handle in route layer).
        """
        hashed_password = get_password_hash(user_create.password)

        user_data = user_create.model_dump(exclude={"password", "name"})
        db_user = User(**user_data, hashed_password=hashed_password, name=user_create.name)

        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)
        return db_user

    async def update(
        self,
        db: AsyncSession,
        db_user: User,
        user_update: UserUpdate | dict[str, Any],
    ) -> User:
        """Update user information.

        Parameters
        ----------
        db : AsyncSession
            The database session.
        db_user : User
            The existing user instance to update.
        user_update : UserUpdate | dict
            Fields to update (only provided fields will be updated).

        Returns
        -------
        User
            The updated user instance.
        """
        if isinstance(user_update, dict):
            update_data = user_update
        else:
            update_data = user_update.model_dump(exclude_unset=True)

        if "password" in update_data:
            update_data["hashed_password"] = get_password_hash(update_data.pop("password"))

        for field, value in update_data.items():
            setattr(db_user, field, value)

        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)
        return db_user

    async def authenticate(
        self,
        db: AsyncSession,
        username_or_phone: str,
        password: str,
    ) -> User | None:
        """Authenticate a user by username/phone and password.

        Parameters
        ----------
        db : AsyncSession
            The database session.
        username_or_phone : str
            Username or phone number.
        password : str
            Plain text password to verify.

        Returns
        -------
        User | None
            The user if authentication succeeds, None otherwise.
        """
        # Try to find by phone first (if starts with + or contains only digits)
        if username_or_phone.startswith('+') or username_or_phone.replace(' ', '').isdigit():
            db_user = await self.get_by_phone(db, phone=username_or_phone)
        else:
            db_user = await self.get_by_username(db, username=username_or_phone)

        if db_user is None:
            return None

        if not await verify_password(password, db_user.hashed_password):
            return None

        return db_user


crud_users = CRUDUser(User)
