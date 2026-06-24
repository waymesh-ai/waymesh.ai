# Om Gan Ganpate Namah
# Waymesh

AI operating layer for boutique travel companies — turns private supplier knowledge,
contracts, and destination data into structured, AI-ready operations.

## Structure

```
src/
  config/        app settings, environment loading
  database/      Supabase client and query helpers
  ingestion/      
    loaders/      pull data from APIs, files, and external sources
    extraction/    parse raw documents into structured fields
    chunking/      split documents/text into retrievable chunks
    staging/       write/validate records in staging tables before promotion
  ai/
    embeddings/    embedding generation for document chunks
    retrieval/     RAG retrieval over company + destination data
    prompts/       prompt templates for concierge, quotes, extraction

notebooks/   exploratory work, not production code
data/
  sample/    small sample inputs for local testing
  outputs/   generated outputs (gitignored, except structure)
tests/       test suite
docs/        technical docs, schema notes, diagrams
```

## Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in real values
```
