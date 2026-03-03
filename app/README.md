# 🏥 UziProMax

A medical UZI (ultrasound) examination management system.

---

## 🧩 Core Stack

### 🖥 Backend

* ⚙️ **FastAPI** — async, explicit, readable
* 🐘 **PostgreSQL** — SQLAlchemy 2.0 + Alembic
* 🔐 **JWT Auth** — simple, replaceable
* 🤖 **CI/CD** — GitHub Actions

### 🎨 Frontend

* ⚛️ **React** — Vite, TanStack Router/Query
* 🎨 **Tailwind CSS** + Radix UI
* 🧪 **Playwright** — end-to-end tests

---

## 🚀 Deployment

### Quick Server Setup

```bash
curl -fsSL https://raw.githubusercontent.com/apayziev/UziProMax/main/scripts/server-setup.sh | bash
```

### GitHub Secrets (Required)

Add these to your repository secrets (`Settings → Secrets → Actions`):

| Secret | Description |
|--------|-------------|
| `SERVER_HOST` | Server IP address (e.g., `46.101.163.143`) |
| `SERVER_USER` | SSH username (e.g., `root`) |
| `SERVER_SSH_KEY` | Private SSH key for server access |
| `GHCR_TOKEN` | GitHub PAT with `read:packages` scope |

### CI/CD Pipeline

1. **Push to `main`** triggers:
   - Backend tests (pytest, ruff, mypy)
   - Frontend tests (lint, build)
   - Docker image build & push to GHCR
   - Auto-deploy to production server

2. **Pull Requests**:
   - Run all tests
   - Block merge if tests fail

### Manual Deployment

```bash
ssh root@your-server
cd /opt/uzipromax/app
./scripts/deploy.sh
```

---

## 📜 License

MIT
