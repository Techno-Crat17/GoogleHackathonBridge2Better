import requests
import json

def test_matchmaking():
    url = "http://localhost:8001/api/v1/match"
    
    # Define a student's learning query
    student_query = "I am a high school student from India preparing for JEE Mains. I struggle with wave-particle duality and modern physics."
    
    # Define a list of available mentors with diverse expertise
    mentors = [
        {
            "id": 1,
            "expertise": "Frontend Web Development, UI/UX Design, React.js"
        },
        {
            "id": 2,
            "expertise": "Advanced Calculus, Number Theory, Discrete Mathematics"
        },
        {
            "id": 3,
            "expertise": "Physics for JEE Mains, Quantum Mechanics, Thermodynamics"
        },
        {
            "id": 4,
            "expertise": "Organic Chemistry, Biology, Medical Entrance Exam Prep"
        }
    ]
    
    payload = {
        "student_query": student_query,
        "mentors": mentors,
        "top_k": 3
    }
    
    print(f"--- STUDENT QUERY ---")
    print(f'"{student_query}"\n')
    
    print("--- AVAILABLE MENTORS ---")
    for m in mentors:
        print(f"Mentor {m['id']}: {m['expertise']}")
    print("\nSending request to AI Matchmaking Engine (SentenceTransformers + FAISS)...\n")
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        
        results = response.json()
        print("--- MATCH RESULTS (Ranked by Semantic Similarity) ---")
        for i, match in enumerate(results):
            print(f"Rank {i+1}: Mentor {match['mentor_id']}")
            print(f"Expertise: {match['expertise']}")
            print(f"Match Score: {match['match_score']:.4f}\n")
            
    except Exception as e:
        print(f"Error testing matchmaking: {e}")

if __name__ == "__main__":
    test_matchmaking()
