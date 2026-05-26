from pydantic_settings import BaseSettings
from pydantic_settings import SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "AI Expense Analyzer"
    app_version: str = "1.0.0"
    debug: bool = True
    groq_api_key: str = ""
    secret_key: str = (
    "test_secret_key"
    )
    database_url: str = (
    "sqlite:///./test.db"
    )


    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()
