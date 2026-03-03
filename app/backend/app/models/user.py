from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from .base import BaseModel


class User(BaseModel):
    __tablename__ = "user"

    first_name: Mapped[str] = mapped_column(String(50), kw_only=True)
    last_name: Mapped[str] = mapped_column(String(50), kw_only=True)
    middle_name: Mapped[str | None] = mapped_column(String(50), kw_only=True, default=None)
    username: Mapped[str] = mapped_column(String(20), unique=True, index=True, kw_only=True)
    phone: Mapped[str] = mapped_column(String(20), unique=True, index=True, kw_only=True)
    hashed_password: Mapped[str] = mapped_column(String, kw_only=True)

    profile_image_url: Mapped[str] = mapped_column(String, default="", kw_only=True)
    is_active: Mapped[bool] = mapped_column(default=True, kw_only=True)
    is_superuser: Mapped[bool] = mapped_column(default=False, kw_only=True)
