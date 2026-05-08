from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class MentorProfile(Base):
    __tablename__ = "mentor_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    bio = Column(Text, nullable=True)
    expertise_areas = Column(JSON, default=list) # e.g. ["Physics", "Mathematics"]
    industry_experience_years = Column(Integer, default=0)
    
    user = relationship("User", back_populates="mentor_profile")

class StudentProfile(Base):
    __tablename__ = "student_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    bio = Column(Text, nullable=True)
    interests = Column(JSON, default=list) # e.g. ["Coding", "Robotics"]
    
    user = relationship("User", back_populates="student_profile")
