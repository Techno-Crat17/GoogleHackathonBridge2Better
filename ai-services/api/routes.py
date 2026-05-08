from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from services.matchmaking import find_best_matches

router = APIRouter()

class MentorProfile(BaseModel):
    id: int
    expertise: str

class MatchRequest(BaseModel):
    student_query: str
    mentors: List[MentorProfile]
    top_k: int = 3

class MatchResponse(BaseModel):
    mentor_id: int
    expertise: str
    match_score: float

@router.post("/match", response_model=List[MatchResponse])
async def match_mentors(request: MatchRequest):
    """
    Accepts a student's learning interests and a list of available mentors,
    and returns the top matches ranked by semantic similarity.
    """
    try:
        mentor_dicts = [{"id": m.id, "expertise": m.expertise} for m in request.mentors]
        matches = find_best_matches(request.student_query, mentor_dicts, top_k=request.top_k)
        return matches
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Matchmaking failed: {str(e)}")
