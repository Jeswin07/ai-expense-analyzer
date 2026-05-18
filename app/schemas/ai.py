from pydantic import BaseModel


class AISummaryResponse(BaseModel):
    ai_summary: str
