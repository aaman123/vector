import databases
import os
from starlette.config import Config
from decouple import config as de_config

config = Config()

DATABASE_URL = config(
    "DATABASE_URL",
    cast=databases.DatabaseURL,
    default=de_config('DATABASE_URL'),
)

if DATABASE_URL.dialect == "postgres":
    DATABASE_URL = DATABASE_URL.replace(dialect="postgresql")  # pragma: nocover
    
database = databases.Database(DATABASE_URL)