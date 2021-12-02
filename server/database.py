import databases
from starlette.config import Config

config = Config()

DATABASE_URL = config(
    "DATABASE_URL",
    cast=databases.DatabaseURL,
    default="postgres://postgres:Aman@localhost:5432/vector_assessment",
)

if DATABASE_URL.dialect == "postgres":
    DATABASE_URL = DATABASE_URL.replace(dialect="postgresql")  # pragma: nocover
    
database = databases.Database(DATABASE_URL)