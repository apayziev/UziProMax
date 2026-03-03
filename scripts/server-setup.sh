#!/bin/bash
# Server setup script for UziProMax
# Run: curl -fsSL https://raw.githubusercontent.com/apayziev/UziProMax/main/scripts/server-setup.sh | bash

set -e

echo "=== UziProMax Server Setup ==="

# Update & install
apt-get update && apt-get install -y git curl

# Install Docker
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sh
fi

# Clone project
cd /opt
git clone https://github.com/apayziev/UziProMax.git uzipromax || (cd uzipromax && git pull)
cd uzipromax/app

# Create .env
cp .env.example .env
echo ">>> .env faylini tahrirlang: nano .env"
echo ">>> So'ng: docker compose up -d"
