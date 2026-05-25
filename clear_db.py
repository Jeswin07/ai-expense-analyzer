from app.db.session import SessionLocal
from app.models.expense import Expense

db = SessionLocal()

db.query(Expense).delete()

db.commit()

print("All expenses deleted.")