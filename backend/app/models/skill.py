from sqlalchemy import Column, Integer, String, Text
from app.db.base_class import Base

class Skill(Base):
    __tablename__ = "skills"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String, index=True) # e.g. "Science", "Technology", "Soft Skills"
