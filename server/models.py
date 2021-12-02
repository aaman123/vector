import sqlalchemy

engine = sqlalchemy.create_engine('postgresql://postgres:Aman@localhost:5432/vector_assessment', echo=True)
metadata = sqlalchemy.MetaData()

cards = sqlalchemy.Table(
    "cards",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("type", sqlalchemy.String),
    sqlalchemy.Column("title", sqlalchemy.String),
    sqlalchemy.Column("imgUrl", sqlalchemy.String),
)

# metadata.create_all(engine)