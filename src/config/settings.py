"""App configuration loaded from environment variables."""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    supabase_url: str = ""
    supabase_service_role_key: str = ""
    supabase_anon_key: str = ""
    anthropic_api_key: str = ""
    google_places_api_key: str = ""
    environment: str = "development"

    class Config:
        env_file = ".env"


settings = Settings()
