# 🌐 Waymesh Copilot

> AI-powered travel intelligence for boutique travel agencies

**Waymesh Copilot** is a full-stack AI application that transforms private supplier knowledge, contracts, and destination data into actionable travel intelligence. It combines a modern React/Next.js frontend with a Python-based backend for document ingestion, embedding generation, and RAG-powered retrieval.

---

## 📋 Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

---

## ✨ Features

### Frontend (Next.js Copilot)
- 💬 **Multi-turn Conversations** - Persistent chat history with localStorage
- 🎯 **Domain Detection** - Automatically identifies 6 travel industry domains:
  - Suppliers (hotels, resorts, properties)
  - Destinations (cities, regions, attractions)
  - Contracts (rates, terms, agreements)
  - Proposals (itineraries, packages)
  - Agency SOPs (guidelines, procedures)
  - DMC Partners (ground operators, local experts)
- 📱 **Responsive UI** - Three-panel layout (Sidebar, Chat, Details)
- ⚡ **Real-time Streaming** - Claude API integration for instant responses

### Backend (Python AI Layer)
- 📚 **Document Ingestion** - Load data from APIs, files, and external sources
- 🔍 **Intelligent Extraction** - Parse raw documents into structured fields
- 🧩 **Chunking & Embedding** - Convert text into vector embeddings for RAG
- 🗄️ **Supabase Integration** - Managed PostgreSQL with vector support
- 🤖 **RAG Retrieval** - Semantic search over company and destination data
- 📝 **Prompt Templates** - Specialized prompts for concierge and quote generation

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  WAYMESH COPILOT                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐          ┌─────────────────────┐      │
│  │   Frontend       │          │   Backend           │      │
│  │   (Next.js 15)   │          │   (Python)          │      │
│  ├──────────────────┤          ├─────────────────────┤      │
│  │ - React 19       │◄────────►│ - Ingestion Layer   │      │
│  │ - TypeScript     │  API     │ - AI/RAG Layer      │      │
│  │ - Tailwind CSS   │          │ - Supabase Client   │      │
│  │ - Anthropic SDK  │          │ - Anthropic SDK     │      │
│  └──────────────────┘          └─────────────────────┘      │
│         :8080                           :8000               │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Database (Supabase PostgreSQL)               │   │
│  │    - Documents | Embeddings | Conversations | Users  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │    External APIs (Claude, Google Places, etc.)       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose | Version |
|-----------|---------|----------|
| **Next.js** | React framework with SSR | 15.3.4 |
| **React** | UI library | 19.0.0 |
| **TypeScript** | Type safety | 5.x |
| **Tailwind CSS** | Styling | (configured) |
| **Anthropic SDK** | Claude API client | ^0.106.0 |

### Backend
| Technology | Purpose | Version |
|-----------|---------|----------|
| **Python** | Backend runtime | 3.10+ |
| **Supabase** | Database & vectors | >=2.0.0 |
| **Pydantic** | Data validation | >=2.0.0 |
| **Anthropic** | Claude API | >=0.40.0 |
| **Pandas** | Data processing | >=2.0.0 |
| **pytest** | Testing | >=8.0.0 |

---

## 📦 Prerequisites

### System Requirements
- **macOS/Linux/Windows** (WSL)
- **Node.js** 18+ and **npm** or **yarn**
- **Python** 3.10+
- **Git**

### API Keys Required
- 🔑 **Anthropic API Key** - For Claude AI
- 🔑 **Supabase Project URL & Keys** - Database
- 🔑 **Google Places API Key** (optional) - For destination data

---

## 🚀 Quick Start

See [docs/QUICKSTART.md](docs/QUICKSTART.md) for a 5-minute setup!

Or follow these steps:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/waymesh-ai/waymesh-copilot.git
cd waymesh-copilot
```

### 2️⃣ Setup Frontend
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your API keys
# ANTHROPIC_API_KEY=sk-ant-...
```

### 3️⃣ Setup Backend
```bash
# Create Python virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Create backend environment file
cp .env.example .env
# Edit .env with Supabase and API credentials
```

### 4️⃣ Run Both Services
```bash
# Terminal 1: Start Frontend
npm run dev
# Frontend runs at http://localhost:3000

# Terminal 2: Start Backend (Python)
source .venv/bin/activate
python -m uvicorn app.main:app --reload --port 8000
# Backend runs at http://localhost:8000
```

🎉 **Done!** Open http://localhost:3000 in your browser.

---

## 📚 Detailed Setup

See [docs/SETUP.md](docs/SETUP.md) for comprehensive 20-30 minute setup guide.

---

## 📂 Project Structure

```
waymesh-copilot/
│
├── 📁 frontend/                     # Next.js Frontend (NEW)
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/route.ts        # Chat API endpoint
│   │   ├── components/
│   │   │   ├── CenterPanel.tsx      # Main chat interface
│   │   │   ├── LeftSidebar.tsx      # Conversation history
│   │   │   ├── RightSidebar.tsx     # Details panel
│   │   │   ├── InputBar.tsx         # Message input
│   │   │   ├── ConversationState.tsx
│   │   │   └── WelcomeState.tsx
│   │   ├── types.ts                 # TypeScript types
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Main page
│   │   └── globals.css              # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.ts
│
├── 📁 src/                          # Python Backend (EXISTING)
│   ├── config/                      # Settings & environment
│   ├── database/                    # Supabase client & queries
│   ├── ingestion/                   # Data loading pipeline
│   ├── ai/                          # AI/RAG layer
│   └── __init__.py
│
├── 📁 notebooks/                    # Jupyter notebooks
├── 📁 data/                         # Data & samples
├── 📁 tests/                        # Test suite
│
├── 📁 docs/                         # Documentation (UPDATED)
│   ├── QUICKSTART.md                # 5-minute quick start
│   ├── SETUP.md                     # Full setup guide
│   ├── ARCHITECTURE.md              # System design
│   ├── CONTRIBUTING.md              # Developer guide
│   └── README.md                    # Main README
│
├── 📄 package.json                  # Frontend dependencies
├── 📄 requirements.txt               # Python dependencies
├── 📄 .env.example                  # Example env vars
├── 📄 .gitignore                    # Git ignore rules
└── 📄 README.md                     # This file
```

---

## 🔐 Environment Variables

See [.env.example](.env.example) for all available variables.

### Frontend (.env.local)
```env
ANTHROPIC_API_KEY=sk-ant-your-api-key-here
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-key-here
SUPABASE_ANON_KEY=your-key-here
ANTHROPIC_API_KEY=sk-ant-your-api-key-here
ENVIRONMENT=development
```

---

## 🤝 Contributing

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for development workflow and code standards.

---

## 📖 Documentation

- **[QUICKSTART.md](docs/QUICKSTART.md)** - Get running in 5 minutes ⚡
- **[SETUP.md](docs/SETUP.md)** - Complete setup guide (20-30 min)
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System design & data flow
- **[CONTRIBUTING.md](docs/CONTRIBUTING.md)** - Developer guidelines

---

## 🐛 Troubleshooting

See [docs/SETUP.md#troubleshooting](docs/SETUP.md#common-issues--solutions) for common issues.

---

## 📝 License

This project is private and part of Waymesh AI.

---

## 👥 Support

For issues, questions, or contributions:
- **GitHub Issues**: [Create an issue](https://github.com/waymesh-ai/waymesh-copilot/issues)
- **Email**: support@waymesh.ai

---

**Happy coding! 🚀**

*Last updated: 2026-06-26*
