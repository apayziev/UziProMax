#!/bin/bash
# Manual deployment script
# Usage: ./scripts/deploy.sh [production|staging]

set -e

ENVIRONMENT=${1:-production}
APP_DIR="/opt/uzipromax/app"
COMPOSE_FILE="docker-compose.prod.yml"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}=== UziProMax Deployment ===${NC}"
echo -e "Environment: ${YELLOW}$ENVIRONMENT${NC}"

cd "$APP_DIR"

# Pull latest code
echo -e "${YELLOW}Pulling latest code...${NC}"
git pull origin main

# Pull latest images
echo -e "${YELLOW}Pulling Docker images...${NC}"
docker compose -f "$COMPOSE_FILE" pull

# Deploy with zero-downtime
echo -e "${YELLOW}Deploying services...${NC}"
docker compose -f "$COMPOSE_FILE" up -d

# Wait for services
echo -e "${YELLOW}Waiting for services to start...${NC}"
sleep 15

# Health check
echo -e "${YELLOW}Running health check...${NC}"
if curl -sf http://localhost/api/v1/health > /dev/null; then
    echo -e "${GREEN}Health check passed!${NC}"
else
    echo -e "${RED}Health check failed!${NC}"
    docker compose -f "$COMPOSE_FILE" logs --tail=50
    exit 1
fi

# Cleanup
echo -e "${YELLOW}Cleaning up old images...${NC}"
docker image prune -f

echo -e "${GREEN}=== Deployment Complete ===${NC}"
docker compose -f "$COMPOSE_FILE" ps
