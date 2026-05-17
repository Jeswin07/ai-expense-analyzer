from app.db.database import Base
from app.db.database import engine
from app.models import expense # pylint: disable=unused-import


def create_tables():
    Base.metadata.create_all(bind=engine)
