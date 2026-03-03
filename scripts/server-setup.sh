#!/bin/bash
# Server setup script for UziProMax
# Run: curl -fsSL https://raw.githubusercontent.com/apayziev/UziProMax/main/scripts/server-setup.sh | bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== UziProMax Server Setup ===${NC}"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}Please run as root${NC}"
    exit 1
fi

# Update system
echo -e "${YELLOW}Updating system packages...${NC}"
apt-get update && apt-get upgrade -y

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
apt-get install -y git curl wget ufw fail2ban

# Configure firewall
echo -e "${YELLOW}Configuring firewall...${NC}"
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Install Docker
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Installing Docker...${NC}"
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
else
    echo -e "${GREEN}Docker already installed${NC}"
fi

# Create application directory
APP_DIR="/opt/uzipromax"
echo -e "${YELLOW}Setting up application directory...${NC}"

if [ -d "$APP_DIR" ]; then
    cd "$APP_DIR"
    git pull
else
    git clone https://github.com/apayziev/UziProMax.git "$APP_DIR"
    cd "$APP_DIR"
fi

# Setup environment file
cd "$APP_DIR/app"
if [ ! -f .env ]; then
    cp .env.example .env
    
    # Generate secure secret key
    SECRET_KEY=$(openssl rand -hex 32)
    sed -i "s/your-secret-key-here/$SECRET_KEY/" .env
    
    # Generate secure postgres password
    POSTGRES_PASSWORD=$(openssl rand -base64 24 | tr -d '/+=')
    sed -i "s/POSTGRES_PASSWORD=\"postgres\"/POSTGRES_PASSWORD=\"$POSTGRES_PASSWORD\"/" .env
    
    echo -e "${YELLOW}>>> Edit .env file with your settings: nano $APP_DIR/app/.env${NC}"
fi

# Login to GitHub Container Registry (for private repos)
echo -e "${YELLOW}To pull images, login to GHCR:${NC}"
echo "echo YOUR_GITHUB_TOKEN | docker login ghcr.io -u YOUR_USERNAME --password-stdin"

echo ""
echo -e "${GREEN}=== Setup Complete ===${NC}"
echo ""
echo -e "Next steps:"
echo -e "1. Edit environment file: ${YELLOW}nano $APP_DIR/app/.env${NC}"
echo -e "2. Start services: ${YELLOW}cd $APP_DIR/app && docker compose -f docker-compose.prod.yml up -d${NC}"
echo -e "3. Check status: ${YELLOW}docker compose -f docker-compose.prod.yml ps${NC}"
echo -e "4. View logs: ${YELLOW}docker compose -f docker-compose.prod.yml logs -f${NC}"
echo ""
