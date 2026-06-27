# 🚀 Waymesh Copilot - Complete Setup Guide

This guide walks you through setting up the entire Waymesh Copilot stack on your machine.

**Estimated setup time**: 20-30 minutes

---

## Prerequisites Checklist

Before starting, ensure you have:

- [ ] **macOS, Linux, or Windows (WSL)**
- [ ] **Node.js 18+** - [Download](https://nodejs.org/)
  ```bash
  node --version  # Should be v18.0.0 or higher
  ```
- [ ] **npm or yarn** - Comes with Node.js
  ```bash
  npm --version  # Should be v9.0.0 or higher
  ```
- [ ] **Python 3.10+** - [Download](https://www.python.org/)
  ```bash
  python --version  # Should be 3.10+ or higher
  ```
- [ ] **Git** - [Download](https://git-scm.com/)
  ```bash
  git --version
  ```
- [ ] **API Keys** (see next section)

### API Keys Required

You'll need these API keys. Get them before starting:

1. **Anthropic API Key**
   - Go to [console.anthropic.com](https://console.anthropic.com)
   - Sign up or login
   - Create an API key
   - Copy the key: `sk-ant-...`

2. **Supabase Project** (Database)
   - Go to [app.supabase.com](https://app.supabase.com)
   - Create a new project or use existing
   - Go to Project Settings → API
   - Copy: Project URL, Service Role Key, Anon Key

3. **Google Places API Key** (Optional)
   - Go to [console.cloud.google.com](https://console.cloud.google.com)
   - Enable "Places API"
   - Create an API key
   - Copy the key

---

## Step-by-Step Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/waymesh-ai/waymesh-copilot.git
cd waymesh-copilot

# Verify directory structure
ls -la
```

Expected output:
```
frontend/
docs/
src/
node_modules/ (may not exist yet)
package.json
tsconfig.json
.env.example
README.md
```

---

### Step 2: Frontend Setup (Next.js)

#### 2.1 Install Frontend Dependencies

```bash
# Install Node.js dependencies
npm install

# Verify installation
npm list | head -20
```

This installs:
- `next` - React framework
- `react` & `react-dom` - React library
- `@anthropic-ai/sdk` - Claude API client
- TypeScript, type definitions, and dev tools

#### 2.2 Create Frontend Environment File

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the file with your credentials
nano .env.local  # or use your preferred editor
```

Update these values in `.env.local`:
```env
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
NEXT_PUBLIC_API_URL=http://localhost:8000
```

#### 2.3 Verify Frontend Build

```bash
# Try building the frontend
npm run build

# If successful, you'll see:
# ✓ Compiled successfully
# ✓ All checks passed
```

If there are TypeScript errors, fix them before continuing.

---

### Step 3: Backend Setup (Python)

#### 3.1 Create Python Virtual Environment

```bash
# Create virtual environment
python3 -m venv .venv

# Activate it (macOS/Linux)
source .venv/bin/activate

# On Windows, use:
# .venv\Scripts\activate

# Verify activation (you should see (.venv) prefix)
which python
```

#### 3.2 Install Python Dependencies

```bash
# Upgrade pip first
pip install --upgrade pip

# Install dependencies from requirements.txt
pip install -r requirements.txt

# Verify installation
pip list

# Should include:
# - supabase (>=2.0.0)
# - anthropic (>=0.40.0)
# - pydantic (>=2.0.0)
# - python-dotenv (>=1.0.0)
```

#### 3.3 Create Backend Environment File

```bash
# Copy the backend environment file
cp .env.example .env

# Edit it with your credentials
nano .env  # or use your preferred editor
```

Update these values in `.env`:
```env
# Database (from Supabase Project Settings)
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-key-here
SUPABASE_ANON_KEY=eyJhbGc...your-key-here

# AI Provider
ANTHROPIC_API_KEY=sk-ant-your-key-here

# Environment
ENVIRONMENT=development
```

#### 3.4 Verify Backend Setup

```bash
# Test Python imports
python -c "from src.config import settings; print('✓ Backend config loaded')"

# If successful, you'll see: ✓ Backend config loaded
```

---

### Step 4: Database Setup (Supabase)

#### 4.1 Create Required Tables

Log into [Supabase Console](https://app.supabase.com) and create these tables:

**Table: conversations**
```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Table: messages**
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id),
  content TEXT NOT NULL,
  role TEXT NOT NULL, -- 'user' or 'assistant'
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Table: documents**
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1536),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable vector search
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);
```

#### 4.2 Enable Required Extensions

In Supabase Console → SQL Editor, run:
```sql
-- Enable pgvector for embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Enable UUID functions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

---

### Step 5: Run the Application

You need to run both frontend and backend services.

#### 5.1 Terminal 1: Start Backend

```bash
# Make sure you're in the project directory
cd /path/to/waymesh-copilot

# Activate Python environment
source .venv/bin/activate

# Start the backend
python -m uvicorn app.main:app --reload --port 8000
```

Expected output:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

#### 5.2 Terminal 2: Start Frontend

```bash
# In a new terminal, navigate to project
cd /path/to/waymesh-copilot

# Run development server
npm run dev
```

Expected output:
```
▲ Next.js 15.3.4
- Local:        http://localhost:3000
```

#### 5.3 Access the Application

Open your browser and go to: **http://localhost:3000**

You should see the Waymesh Copilot interface! 🎉

---

## Verification Checklist

After setup, verify everything works:

- [ ] Frontend loads at http://localhost:3000
- [ ] Can type messages in the chat interface
- [ ] Messages are stored in localStorage
- [ ] Backend API responds at http://localhost:8000
- [ ] No console errors in browser DevTools
- [ ] Domains are detected correctly

---

## Running on Different Machines

### For Team Members

1. **Clone the repo:**
   ```bash
   git clone https://github.com/waymesh-ai/waymesh-copilot.git
   cd waymesh-copilot
   ```

2. **Get API keys from your team lead**
   - Anthropic API key
   - Supabase credentials
   - Google Places API key (if needed)

3. **Follow Steps 2-5 above**

4. **Troubleshoot using the [Troubleshooting Guide](#common-issues--solutions)**

### For Production Deployment

See deployment documentation for:
- Building optimized bundles
- Configuring environment variables
- Deploying to cloud platforms
- Database backups and recovery

---

## Next Steps

After successful setup:

1. **Read the Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md)
2. **Explore the codebase**: Start in `frontend/app/page.tsx` and `src/config/`
3. **Run tests**: `pytest tests/ -v`
4. **Create a feature branch**: `git checkout -b feature/your-feature`
5. **Check Contributing**: [CONTRIBUTING.md](CONTRIBUTING.md)

---

## Common Issues & Solutions

### Port Already in Use

**Frontend (3000):**
```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process (replace PID with actual ID)
kill -9 <PID>

# Or use a different port
npm run dev -- -p 3001
```

**Backend (8000):**
```bash
# Use a different port
python -m uvicorn app.main:app --port 8001
```

### Module Not Found Errors

**Frontend:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Backend:**
```bash
# Make sure venv is activated
source .venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Supabase Connection Error

```bash
# Verify your .env has correct values
cat .env | grep SUPABASE

# Test connection
python -c "from supabase import create_client; print('Connection OK')"
```

### API Key Invalid

- Check the API key is not expired
- Verify you copied it correctly (no extra spaces)
- For Anthropic: Visit [console.anthropic.com](https://console.anthropic.com)
- For Supabase: Visit [app.supabase.com](https://app.supabase.com)

---

## Getting Help

- **Issues**: Check [GitHub Issues](https://github.com/waymesh-ai/waymesh-copilot/issues)
- **Documentation**: Read [README.md](../README.md)
- **Team**: Contact your team lead or support@waymesh.ai

---

**Good luck! 🚀**

*Last updated: 2026-06-26*
