---
title: "Building a Neural Search Engine from Scratch"
description: "A deep dive into semantic search using transformer embeddings, FAISS, and FastAPI — from concept to production."
date: 2024-03-15
tags: ["AI/ML", "Python", "Search", "Tutorial"]
image: "/images/blog-neural-search.png"
imageAlt: "Neural network visualization"
relatedProjects: ["neural-search-engine"]
---

# Building a Neural Search Engine from Scratch

Traditional keyword search is fast and predictable, but it breaks down when users don't know the exact words a document uses. Semantic search solves this by understanding *meaning* rather than matching tokens. In this post I'll walk through building a production-grade semantic search engine end to end.

## Why Semantic Search?

Consider a user searching for **"affordable laptops for students"**. A BM25 index might miss documents that say *"budget-friendly notebooks for college"* because the keywords don't overlap. A semantic model maps both phrases to nearly identical vectors.

## Architecture Overview

Our stack:

| Component | Technology | Role |
|-----------|------------|------|
| Embedding model | `sentence-transformers` | Text → vector |
| Vector store | FAISS | ANN search |
| API layer | FastAPI | HTTP interface |
| Frontend | React + TypeScript | Search UI |

## Generating Embeddings
```python
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")

def embed(texts: list[str]) -> np.ndarray:
    """Return L2-normalized embeddings for a list of texts."""
    vectors = model.encode(texts, convert_to_numpy=True)
    # Normalize for cosine similarity via dot product
    norms = np.linalg.norm(vectors, axis=1, keepdims=True)
    return vectors / norms
```

The `all-MiniLM-L6-v2` model is a great starting point — it's only 80 MB and runs inference in ~10 ms on CPU.

## Indexing with FAISS
```python
import faiss

DIMS = 384  # MiniLM output dimension

def build_index(embeddings: np.ndarray) -> faiss.IndexFlatIP:
    index = faiss.IndexFlatIP(DIMS)   # Inner product = cosine on normalized vecs
    index.add(embeddings.astype("float32"))
    return index

def search(index, query_vec: np.ndarray, k: int = 10):
    scores, ids = index.search(query_vec.astype("float32"), k)
    return scores[0], ids[0]
```

For large corpora (>1M docs) swap `IndexFlatIP` for `IndexIVFPQ` to trade a tiny bit of recall for orders-of-magnitude faster search and much lower memory usage.

## FastAPI Endpoint
```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class SearchRequest(BaseModel):
    query: str
    top_k: int = 10

@app.post("/search")
async def search_endpoint(req: SearchRequest):
    q_vec = embed([req.query])
    scores, ids = search(global_index, q_vec, req.top_k)
    results = [
        {"id": int(i), "score": float(s), "text": corpus[i]}
        for s, i in zip(scores, ids)
        if i != -1
    ]
    return {"results": results}
```

## Results

After deploying to production:

- **Relevance** improved by 3× over BM25 on our internal benchmark
- **Latency** stayed under 50 ms p99 for a 500K-document corpus
- **User satisfaction** (measured by click-through rate) rose 28%

## Key Takeaways

- Normalize your embeddings before storing in FAISS — it converts IP search to cosine similarity
- Cache query embeddings (Redis works great) — repeated queries are free
- Quantize large indexes (`IndexIVFPQ`) to fit in RAM and speed up search
- Always A/B test against your existing retrieval system before full rollout

Happy searching! 🔍