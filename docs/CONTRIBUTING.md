# 🤝 Contributing to Waymesh Copilot

Thank you for your interest in contributing! This guide will help you get started.

---

## Code of Conduct

- Be respectful and professional
- Welcome diverse perspectives
- Focus on constructive feedback
- Report inappropriate behavior

---

## Getting Started

### 1. Fork and Clone
```bash
git clone https://github.com/YOUR_USERNAME/waymesh-copilot.git
git remote add upstream https://github.com/waymesh-ai/waymesh-copilot.git
```

### 2. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/your-bug-fix
```

### 3. Setup Development
Follow the [Setup Guide](SETUP.md).

---

## Development Workflow

### Frontend (TypeScript/React)

```bash
npm run dev          # Development server
npm run type-check   # Type checking
npm run build        # Production build
```

**Code Standards:**
- Use type annotations
- Use interfaces for props
- Use functional components
- ESLint & Prettier formatting

### Backend (Python)

```bash
source .venv/bin/activate
pytest tests/ -v     # Run tests
pytest --cov=src    # With coverage
python -m black src/  # Format code
```

**Code Standards:**
- Use type hints
- Write docstrings
- PEP 8 style
- >80% test coverage

---

## Commit Messages

Use conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** feat, fix, docs, style, refactor, test, chore

**Example:**
```
feat(chat): add domain detection for suppliers

Implement keyword matching for supplier identification.
Add tests for domain detection.

Closes #123
```

---

## Pull Request Process

1. **Sync with upstream:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests locally:**
   ```bash
   npm run build        # Frontend
   pytest tests/ -v    # Backend
   ```

3. **Create PR with template:**
   - Clear title using conventional commits
   - Describe what and why
   - Link related issues
   - Include screenshots for UI changes

4. **Address feedback:**
   - Respond to reviews promptly
   - Don't force-push after review starts
   - Push updates to same branch

---

## Testing

### Frontend
```bash
npm run type-check   # TypeScript checks
npm run build        # Full build check
```

### Backend
```bash
pytest tests/ -v                    # All tests
pytest tests/test_module.py -v      # Specific file
pytest tests/test_module.py::test_func -v  # Specific test
```

---

## Documentation

Update docs for:
- New features
- API changes
- Configuration options
- Breaking changes

Update files in `docs/` folder.

---

## Questions?

- 📖 Check [docs/](docs/)
- 💬 GitHub Discussions
- 🐛 Search existing issues
- 📧 support@waymesh.ai

---

Thank you for contributing! 🎉
