import os
from enum import Enum

from pydantic import SecretStr, computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class AppSettings(BaseSettings):
    """Application metadata settings."""

    APP_NAME: str = "UziProMax"
    APP_DESCRIPTION: str | None = "UZI tekshiruvlari uchun tibbiy tizim"
    APP_VERSION: str | None = "0.1.0"
    LICENSE_NAME: str | None = "MIT"
    CONTACT_NAME: str | None = None
    CONTACT_EMAIL: str | None = None


class CryptSettings(BaseSettings):
    """JWT and cryptography settings."""

    SECRET_KEY: SecretStr = SecretStr("secret-key-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7


class DatabaseSettings(BaseSettings):
    """PostgreSQL database configuration."""

    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_PORT: int = 5432
    POSTGRES_DB: str = "postgres"
    POSTGRES_SYNC_PREFIX: str = "postgresql://"
    POSTGRES_ASYNC_PREFIX: str = "postgresql+asyncpg://"
    POSTGRES_URL: str | None = None

    @computed_field  # type: ignore[prop-decorator]
    @property
    def POSTGRES_URI(self) -> str:
        """Construct PostgreSQL connection URI from components."""
        credentials = f"{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
        location = f"{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        return f"{credentials}@{location}"


class FirstUserSettings(BaseSettings):
    """First admin user credentials."""

    ADMIN_FIRST_NAME: str = "Admin"
    ADMIN_LAST_NAME: str = "User"
    ADMIN_MIDDLE_NAME: str | None = None
    ADMIN_USERNAME: str = "admin"
    ADMIN_PHONE: str = "+998901234567"
    ADMIN_PASSWORD: str = "!Ch4ng3Th1sP4ssW0rd!"


class EnvironmentOption(str, Enum):
    """Environment types for the application."""

    LOCAL = "local"
    STAGING = "staging"
    PRODUCTION = "production"


class EnvironmentSettings(BaseSettings):
    """Environment configuration."""

    ENVIRONMENT: EnvironmentOption = EnvironmentOption.LOCAL


class CORSSettings(BaseSettings):
    """CORS (Cross-Origin Resource Sharing) configuration."""

    CORS_ORIGINS: list[str] = ["http://localhost:5173"]
    CORS_METHODS: list[str] = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    CORS_HEADERS: list[str] = ["*"]


class Settings(
    AppSettings,
    DatabaseSettings,
    CryptSettings,
    FirstUserSettings,
    EnvironmentSettings,
    CORSSettings,
):
    """Combined application settings."""

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.realpath(__file__)), "..", "..", "..", ".env"),
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()
