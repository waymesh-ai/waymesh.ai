"""Supabase client setup. Use service role key for backend/ingestion jobs only."""
from supabase import create_client, Client

from src.config.settings import settings


def get_client(use_service_role: bool = True) -> Client:
    key = settings.supabase_service_role_key if use_service_role else settings.supabase_anon_key
    return create_client(settings.supabase_url, key)
