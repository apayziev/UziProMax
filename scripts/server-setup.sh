#!/bin/bash
# Server setup script for UziProMax
# Run this script on a fresh Ubuntu/Debian server

set -e

echo "=== UziProMax Server Setup ==="

# Update system
echo "Updating system packages..."
apt-get update
apt-get upgrade -y

# Install required packages
echo "Installing required packages..."
apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    git \
    ufw

# Install Docker
echo "Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
else
    echo "Docker already installed"
fi

# Install Docker Compose plugin (already included in recent Docker installations)
echo "Verifying Docker Compose..."
docker compose version

# Configure firewall
echo "Configuring firewall..."
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Create deploy directory
echo "Creating deployment directory..."
mkdir -p /opt/uzipromax

# Set permissions
chmod 755 /opt/uzipromax

# Add current user to docker group (if not root)
if [ "$USER" != "root" ]; then
    usermod -aG docker $USER
fi

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "1. Add SSH public key to ~/.ssh/authorized_keys for GitHub Actions"
echo "2. Configure GitHub Secrets (see DEPLOYMENT.md)"
echo "3. Push to main branch to trigger deployment"
echo ""
echo "Server IP: $(curl -s ifconfig.me)"
