# ⚡ Waymesh Copilot - Quick Start

Get Waymesh Copilot running in **5 minutes**! ⏱️

---

## Prerequisites (2 minutes)

✅ Have these installed:
- Node.js 18+: `node --version`
- Python 3.10+: `python --version`
- Git: `git --version`

✅ Have these API keys ready:
- Anthropic API key: [Get it](https://console.anthropic.com)
- Supabase URL & keys: [Get them](https://app.supabase.com)

---

## Installation (3 minutes)

### 1. Clone & Enter Directory
```bash
git clone https://github.com/waymesh-ai/waymesh-copilot.git
cd waymesh-copilot
```

### 2. Frontend Setup
```bash
npm install
cp .env.example .env.local
```

Edit `.env.local`:
```env
ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Backend Setup
```bash
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env
```

Edit `.env`:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_KEY
SUPABASE_ANON_KEY=YOUR_KEY
ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE
ENVIRONMENT=development
```

---

## Run

### Terminal 1: Frontend
```bash
npm run dev
# Open http://localhost:3000 ✅
```

### Terminal 2: Backend
```bash
source .venv/bin/activate
python -m uvicorn app.main:app --reload --port 8000
```

---

## Done! 🎉

Visit **http://localhost:3000** and start chatting!

---

## Next Steps

- 📖 [Full Setup Guide](SETUP.md)
- 🏗️ [Architecture](ARCHITECTURE.md)
- 🤝 [Contributing](CONTRIBUTING.md)
- ❓ [Troubleshooting](SETUP.md#common-issues--solutions)

---

**Questions?** Check the [README](../README.md) or open an [issue](https://github.com/waymesh-ai/waymesh-copilot/issues)
