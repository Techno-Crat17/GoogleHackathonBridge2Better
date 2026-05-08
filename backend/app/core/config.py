# pyrefly: ignore [missing-import]
from pydantic_settings import BaseSettings, SettingsConfigDict
# pyrefly: ignore [missing-import]
from pydantic import Field

class Settings(BaseSettings):
    PROJECT_NAME: str = "Bridge2Better AI Backend"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = Field(default="sqlite+aiosqlite:///./bridge2better.db")
    
    # Redis
    REDIS_URL: str = Field(default="redis://localhost:6379/0")
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
