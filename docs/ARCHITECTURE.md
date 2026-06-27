# 🏗️ Waymesh Copilot - Architecture Guide

This document describes the system architecture of Waymesh Copilot, including data flow, component interactions, and design decisions.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                      WAYMESH COPILOT SYSTEM                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────┐   ┌──────────────────────────┐   │
│  │     FRONTEND (React 19)      │   │   BACKEND (Python)       │   │
│  ├──────────────────────────────┤   ├──────────────────────────┤   │
│  │                              │   │                          │   │
│  │ • CenterPanel (Chat UI)      │   │ • Ingestion Layer        │   │
│  │ • LeftSidebar (History)      │   │ • Embedding Generation   │   │
│  │ • RightSidebar (Details)     │   │ • RAG Retrieval          │   │
│  │ • InputBar (Messages)        │   │ • Prompt Management      │   │
│  │                              │   │ • Data Processing        │   │
│  │ Port: 3000                   │   │ Port: 8000               │   │
│  └──────────────────────────────┘   └──────────────────────────┘   │
│           ↕ HTTP/REST API                                           │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │         DATABASE (Supabase PostgreSQL + pgvector)           │   │
│  │                                                              │   │
│  │  • conversations    • messages    • documents               │   │
│  │  • embeddings       • staging     • validation              │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐   │
│  │  Claude API      │  │ Google Places    │  │  Other APIs    │   │
│  │ (Embeddings)     │  │    (Locations)   │  │  (Future)      │   │
│  └──────────────────┘  └──────────────────┘  └────────────────┘   │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture (Next.js)

### Component Hierarchy

```
frontend/app/
├── page.tsx (Root Component)
│   └── CopilotPage
│       ├── LeftSidebar
│       │   └── Conversation List
│       │       └── Conversation Items (grouped by date)
│       ├── CenterPanel
│       │   ├── WelcomeState (empty state)
│       │   └── ConversationState
│       │       ├── Message List
│       │       └── Message Bubbles
│       └── RightSidebar
│           └── Active Domains Display
└── components/
    ├── InputBar
    ├── Helpers & Utilities
    └── Types
```

### Domain Detection System

The system automatically identifies 6 domains from conversation text:

| Domain | Keywords | Use Case |
|--------|----------|----------|
| **supplier** | hotel, resort, villa, property | Supplier management |
| **destination** | city, country, island, region | Destination info |
| **contract** | rate, terms, commission, pricing | Contract details |
| **proposal** | itinerary, quote, package, trip | Quote generation |
| **agency** | SOP, policy, guideline, procedure | Internal knowledge |
| **partner** | DMC, ground operator, local expert | Partner network |

---

## Backend Architecture (Python)

### Module Structure

```
src/
├── config/           # Settings & environment
├── database/         # Supabase client & queries
├── ingestion/        # Data loading pipeline
│   ├── loaders/      # APIs, files, sources
│   ├── extraction/   # Parse to structured
│   ├── chunking/     # Split for embeddings
│   └── staging/      # Validate & prepare
├── ai/
│   ├── embeddings/   # Vector generation
│   ├── retrieval/    # RAG logic
│   └── prompts/      # Prompt templates
└── __init__.py
```

### Data Flow

**Ingestion Pipeline:**
```
External Data → Loaders → Extraction → Chunking → Staging → Embeddings → Supabase
```

**Retrieval Pipeline:**
```
User Query → RAG Search → Retrieve Docs → Augment Prompt → Claude → Response
```

---

## Database Schema

### Tables

**conversations** - Chat sessions
```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY,
  user_id UUID,
  title TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**messages** - Chat messages
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id),
  content TEXT,
  role TEXT CHECK (role IN ('user', 'assistant')),
  created_at TIMESTAMP
);
```

**documents** - Indexed documents with embeddings
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY,
  title TEXT,
  content TEXT,
  domain TEXT,
  embedding vector(1536),
  created_at TIMESTAMP
);

CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops);
```

---

## API Endpoints

### POST /api/chat

**Request:**
```json
{
  "messages": [
    {"role": "user", "content": "Tell me about hotels in Amalfi"},
    {"role": "assistant", "content": "..."}
  ]
}
```

**Response** (Server-Sent Events):
```
data: {"text": "Luxury hotels in Amalfi..."}
data: {"text": " offer stunning views..."}
data: [DONE]
```

---

## Security & Authentication

### Current
- Frontend: No auth (localStorage only)
- Backend: API key based (future)
- Database: Public (development)

### Production
- User authentication (Supabase Auth)
- JWT tokens
- Row-level security
- HTTPS only

---

## Performance Considerations

- **Vector Search**: HNSW indexes for fast similarity
- **Caching**: Redis for frequent queries
- **Pagination**: Large conversation histories
- **Lazy Loading**: Messages on scroll
- **Batch Processing**: Multiple embeddings

---

## Technology Decisions

**Why Next.js?** - SSR, TypeScript, great DX
**Why Python?** - AI/ML ecosystem, data processing
**Why Supabase?** - PostgreSQL + pgvector, open-source
**Why Claude?** - SOTA reasoning, long context

---

*Last updated: 2026-06-26*
