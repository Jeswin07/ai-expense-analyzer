from datetime import date
from datetime import datetime

from sqlalchemy import Column
from sqlalchemy import Date
from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey

from app.db.database import Base


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
        )

    title = Column(
        String,
        nullable=False
    )

    amount = Column(
        Float,
        nullable=False
    )

    category = Column(
        String,
        nullable=False
    )


    department = Column(
        String,
        nullable=True
    )

    vendor = Column(
        String,
        nullable=True
    )

    expense_type = Column(
        String,
        nullable=True
    )

    payment_method = Column(
        String,
        nullable=True
    )

    gst_amount = Column(
        Float,
        default=0
    )

    invoice_id = Column(
        String,
        nullable=True
    )

    expense_date = Column(
        Date,
        default=date.today,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )
