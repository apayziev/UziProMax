
# Variables
PYTHON := backend/.venv/bin/python
export PYTHONPATH := backend
APP_MODULE := app.main:app

.PHONY: help
help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: setup
setup: ## Run initial setup (install, env, migrations, superuser, hooks)
	@echo "🚀 Starting local setup..."
	@command -v uv >/dev/null 2>&1 || { echo "❌ 'uv' is not installed. Install: https://github.com/astral-sh/uv"; exit 1; }
	@[ -f .env ] || cp .env.example .env && echo "📝 Created .env from .env.example"
	@echo "📦 Installing backend dependencies..."
	@uv --project backend sync
	@echo "⚙️ Running database migrations..."
	@cd backend && uv run alembic upgrade head
	@echo "👤 Creating superuser..."
	@cd backend && uv run python -m app.commands.create_first_superuser || true
	@make install-hooks
	@echo "✅ Setup complete! Run 'make run' or 'make docker-local'"

.PHONY: install-hooks
install-hooks: ## Install git hooks (pre-commit)
	uv --project backend run pre-commit install

.PHONY: install
install: ## Install dependencies using uv
	uv --project backend sync

.PHONY: run
run: ## Run the FastAPI application locally with reload
	uv --project backend run uvicorn app.main:app --reload

.PHONY: test
test: ## Run tests using pytest
	uv --project backend run pytest

.PHONY: test-frontend
test-frontend: ## Run frontend Playwright tests
	cd frontend && npx playwright test

.PHONY: test-frontend-ui
test-frontend-ui: ## Run frontend tests with Playwright UI
	cd frontend && npx playwright test --ui

.PHONY: test-frontend-headed
test-frontend-headed: ## Run frontend tests with visible browser
	cd frontend && npx playwright test --headed

.PHONY: test-frontend-debug
test-frontend-debug: ## Run frontend tests in debug mode
	cd frontend && npx playwright test --debug

.PHONY: test-all
test-all: ## Run all tests (backend + frontend)
	@echo "Running backend tests..."
	@make test
	@echo "\nRunning frontend tests..."
	@make test-frontend

.PHONY: lint
lint: ## Run linting checks (ruff and mypy)
	uv --project backend run ruff check .
	cd backend && uv run mypy app

.PHONY: format
format: ## Run code formatting (ruff)
	uv --project backend run ruff format .
	uv --project backend run ruff check . --fix

.PHONY: migrate
migrate: ## Run database migrations to head
	cd backend && uv run alembic upgrade head

.PHONY: makemigrations
makemigrations: ## Create a new database migration (usage: make makemigrations m="migration message")
	cd backend && uv run alembic revision --autogenerate -m "$(m)"

.PHONY: cmd
cmd: ## Run a custom command from app.commands (usage: make cmd n="command_name")
	cd backend && uv run python -m app.commands.$(n)

.PHONY: docker-local
docker-local: ## Start local development services
	docker compose -f docker-compose.local.yml up -d

.PHONY: docker-prod
docker-prod: ## Start production services
	docker compose -f docker-compose.yml up -d

.PHONY: docker-down
docker-down: ## Stop all services
	docker compose -f docker-compose.local.yml down
	docker compose -f docker-compose.yml down

.PHONY: docker-logs
docker-logs: ## View docker compose logs
	docker compose logs -f

.PHONY: clean
clean: ## Clean up temporary files
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
	find . -type d -name ".pytest_cache" -exec rm -rf {} +
	find . -type d -name ".mypy_cache" -exec rm -rf {} +
	find . -type d -name ".ruff_cache" -exec rm -rf {} +

.PHONY: generate-client
generate-client: ## Generate the frontend client from the backend OpenAPI spec
	@cd backend && uv run python -c "import app.main; import json; print(json.dumps(app.main.app.openapi()))" > ../frontend/openapi.json
	@cd frontend && npm run generate-client && npx biome format --write ./src/client

.PHONY: deploy
deploy: ## Deploy to production server (run on server)
	@echo "=== UziProMax Deployment ==="
	git pull origin main
	docker compose -f docker-compose.prod.yml pull
	docker compose -f docker-compose.prod.yml up -d
	@sleep 10
	@curl -sf http://localhost/api/v1/health > /dev/null && echo "✅ Health check passed!" || (echo "❌ Health check failed!" && docker compose -f docker-compose.prod.yml logs --tail=50 && exit 1)
	docker image prune -f
	@echo "=== Deployment Complete ==="
	docker compose -f docker-compose.prod.yml ps
