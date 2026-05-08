from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    role = Column(String, default="student") # student, mentor, admin
    is_active = Column(Boolean, default=True)
    
    # Relationships
    student_profile = relationship("StudentProfile", back_populates="user", uselist=False)
    mentor_profile = relationship("MentorProfile", back_populates="user", uselist=False)
