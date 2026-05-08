# Bridge2Better AI Architecture

## Overview
Bridge2Better AI is a bidirectional mentorship platform connecting underserved youth with retired professionals.

## System Components

### 1. Frontend (Next.js 15)
- App Router for server-rendered pages and client components.
- Tailwind CSS and shadcn/ui for modern, futuristic styling.
- Framer Motion for smooth animations and micro-interactions.
- Zustand for client-side state management.

### 2. Backend (FastAPI)
- High-performance asynchronous API.
- PostgreSQL for relational data (Users, Sessions, Skills).
- SQLAlchemy (async) for ORM.
- Redis for caching and session management.
- Celery for background tasks (e.g., email notifications).

### 3. AI Services
- FastAPI microservice specifically for heavy AI/ML models.
- Matchmaking engine using Sentence Transformers.
- RAG system for session summarization and knowledge retrieval.
- Vector database (Qdrant or FAISS) for embedding storage.

### 4. Orchestration (LangGraph)
- Multi-agent architecture handling matchmaking, summarization, notifications, and analytics.

## Infrastructure
- **Containerization**: Docker & Docker Compose for local development.
- **Database**: PostgreSQL (relational), Redis (cache/broker), Qdrant (vector).
