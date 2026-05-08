# pyrefly: ignore [missing-import]
from fastapi import FastAPI
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
# pyrefly: ignore [missing-import]
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Bridge2Better AI Services"
    API_V1_STR: str = "/api/v1"

settings = Settings()

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

from api.routes import router as matchmaking_router

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(matchmaking_router, prefix=settings.API_V1_STR)

@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "Bridge2Better AI Services is running"}

@app.get("/")
async def root():
    return {"message": "Welcome to Bridge2Better AI Services Engine"}
