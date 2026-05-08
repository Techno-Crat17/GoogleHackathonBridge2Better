from sentence_transformers import SentenceTransformer
import numpy as np
import faiss

# Initialize model lazily
model = None

def get_model():
    global model
    if model is None:
        model = SentenceTransformer('all-MiniLM-L6-v2')
    return model

def find_best_matches(student_query: str, mentor_profiles: list[dict], top_k: int = 3):
    """
    Finds the best mentors for a given student query using semantic search.
    mentor_profiles should be a list of dicts: [{"id": 1, "expertise": "Physics, Maths, Python"}, ...]
    """
    if not mentor_profiles:
        return []
        
    embedder = get_model()
    
    # 1. Embed the mentors' expertise
    expertise_list = [m.get("expertise", "") for m in mentor_profiles]
    mentor_embeddings = embedder.encode(expertise_list, convert_to_numpy=True)
    
    # 2. Build FAISS index
    dimension = mentor_embeddings.shape[1]
    index = faiss.IndexFlatIP(dimension) # Using Inner Product for Cosine Similarity (assuming normalized, but SentenceTransformers outputs are mostly normalized, we can normalize to be safe)
    faiss.normalize_L2(mentor_embeddings)
    index.add(mentor_embeddings)
    
    # 3. Embed student query
    query_embedding = embedder.encode([student_query], convert_to_numpy=True)
    faiss.normalize_L2(query_embedding)
    
    # 4. Search
    k = min(top_k, len(mentor_profiles))
    similarities, indices = index.search(query_embedding, k)
    
    # 5. Format results
    results = []
    for i in range(k):
        idx = indices[0][i]
        score = float(similarities[0][i])
        matched_mentor = mentor_profiles[idx]
        results.append({
            "mentor_id": matched_mentor.get("id"),
            "expertise": matched_mentor.get("expertise"),
            "match_score": score
        })
        
    return results
