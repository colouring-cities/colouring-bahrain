# Deployment Plan: Colouring Bahrain on AWS EC2

## Overview
This document outlines the deployment strategy for the Colouring Bahrain application on AWS EC2.

## Architecture Components
- **Frontend**: React application (Razzle SSR)
- **Backend**: Node.js API
- **Database**: PostgreSQL
- **Process Manager**: PM2
- **ETL**: Python scripts for data loading
- **Map Server**: Tile server and custom styling

---

## Pre-Deployment Setup

### 1. EC2 Instance Configuration
- **Instance Type**: t3.large or t3.xlarge (depending on expected load)
- **OS**: Ubuntu 22.04 LTS or 24.04 LTS
- **Storage**: 50-100GB EBS volume (appropriate tier for database)
- **Security Groups**: 
  - Port 80 (HTTP)
  - Port 443 (HTTPS)
  - Port 5432 (PostgreSQL - restricted to application subnet)
  - Port 22 (SSH - restricted to admin IPs)

### 2. Prerequisites
- Node.js 16.x or higher
- Python 3.8+
- PostgreSQL 12.x+
- npm or yarn
- Git
- Nginx or Apache (reverse proxy)

---

## Deployment Steps

### Phase 1: Environment Setup

#### 1.1 System Dependencies
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y \
  nodejs npm git python3 python3-pip \
  postgresql postgresql-contrib \
  nginx \
  build-essential \
  curl wget
```

#### 1.2 Node.js & npm Setup
```bash
# If using Node.js LTS from NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

#### 1.3 PM2 Installation
```bash
sudo npm install -g pm2
pm2 startup
pm2 save
```

#### 1.4 Python & Dependencies
```bash
sudo apt install -y python3-venv python3-pip
pip3 install --upgrade pip
```

---

### Phase 2: Database Setup

#### 2.1 PostgreSQL Configuration
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql << EOF
CREATE DATABASE colouringbahrain;
CREATE USER colouring WITH PASSWORD 'secure_password_here';
ALTER ROLE colouring SET client_encoding TO 'utf8';
ALTER ROLE colouring SET default_transaction_isolation TO 'read committed';
ALTER ROLE colouring SET default_transaction_deferrable TO on;
ALTER ROLE colouring SET default_transaction_level TO 'read committed';
ALTER ROLE colouring SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE colouringbahrain TO colouring;
EOF
```

#### 2.2 Database Migrations
```bash
# Clone repository
cd /opt
sudo git clone https://github.com/colouring-cities/colouring-bahrain.git
cd colouring-bahrain

# Run migrations
cd /opt/colouring-bahrain/migrations
for file in *.sql; do
  if [[ $file == *.up.sql ]]; then
    psql -U colouring -d colouringbahrain -f "$file"
  fi
done
```

#### 2.3 Load Initial Data
```bash
cd /opt/colouring-bahrain/etl

# Install Python requirements
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run data loading scripts (adjust based on available data)
python3 load_geometries.sh
python3 load_postcodes.sh
python3 load_uprns.sh
```

---

### Phase 3: Application Deployment

#### 3.1 Node.js Application Setup
```bash
cd /opt/colouring-bahrain/app

# Install dependencies
npm ci

# Create environment configuration
cat > .env << EOF
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=colouringbahrain
DB_USER=colouring
DB_PASSWORD=secure_password_here

# Application
NODE_ENV=production
PORT=3000
API_BASE_URL=https://yourdomain.com

# Session & Security
SESSION_SECRET=generate_random_string_here
JWT_SECRET=generate_random_string_here
SECURE_COOKIES=true

# Map Configuration
MAP_STYLE_URL=https://yourdomain.com/map-styles
MAP_TILE_URL=https://tiles.yourdomain.com/{z}/{x}/{y}.pbf
EOF

# Build application
npm run build
```

#### 3.2 PM2 Configuration
```bash
# Create ecosystem configuration
cat > /opt/colouring-bahrain/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'colouring-bahrain',
    script: './node_modules/.bin/razzle',
    args: 'start',
    cwd: '/opt/colouring-bahrain/app',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/colouring/error.log',
    out_file: '/var/log/colouring/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
EOF

# Start with PM2
pm2 start /opt/colouring-bahrain/ecosystem.config.js
pm2 save
```

---

### Phase 4: Reverse Proxy & SSL Configuration

#### 4.1 Nginx Configuration
```bash
sudo tee /etc/nginx/sites-available/colouring-bahrain > /dev/null << EOF
upstream colouring_app {
  server 127.0.0.1:3000;
  keepalive 64;
}

server {
  listen 80;
  server_name yourdomain.com www.yourdomain.com;
  return 301 https://\$server_name\$request_uri;
}

server {
  listen 443 ssl http2;
  server_name yourdomain.com www.yourdomain.com;

  # SSL certificates (use Let's Encrypt)
  ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers on;

  client_max_body_size 100M;

  location / {
    proxy_pass http://colouring_app;
    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host \$host;
    proxy_cache_bypass \$http_upgrade;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
  }

  location /api/ {
    proxy_pass http://colouring_app;
    proxy_http_version 1.1;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
  }
}
EOF

sudo ln -s /etc/nginx/sites-available/colouring-bahrain /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 4.2 SSL Certificate Setup (Let's Encrypt)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com
```

---

### Phase 5: Monitoring & Logging

#### 5.1 PM2 Monitoring
```bash
# Enable PM2 monitoring
pm2 install pm2-logrotate
pm2 install pm2-auto-pull

# Check status
pm2 list
pm2 logs
```

#### 5.2 Logging Setup
```bash
sudo mkdir -p /var/log/colouring
sudo chown ubuntu:ubuntu /var/log/colouring

# Application logs via PM2 (configured above)
```

#### 5.3 System Monitoring
```bash
# Optional: Install additional monitoring tools
sudo apt install -y htop iotop nethogs
```

---

## Post-Deployment Verification

### 1. Health Checks
```bash
# Check application is running
curl -i http://localhost:3000

# Check through Nginx/HTTPS
curl -i https://yourdomain.com

# Database connectivity
psql -U colouring -d colouringbahrain -c "SELECT 1;"
```

### 2. Verify Services
```bash
systemctl status postgresql
systemctl status nginx
pm2 list
```

### 3. Database Verification
```bash
psql -U colouring -d colouringbahrain -c "\dt"
```

---

## Maintenance & Updates

### Regular Tasks
- **Database Backups**: Set up automated backups (daily)
  ```bash
  pg_dump -U colouring colouringbahrain > /backups/colouring_$(date +%Y%m%d).sql
  ```
- **SSL Certificate Renewal**: Auto-renew with certbot
  ```bash
  sudo certbot renew --dry-run
  ```
- **Application Updates**: Pull latest changes and rebuild
  ```bash
  cd /opt/colouring-bahrain
  git pull origin CB-BIGIT-DEV01
  cd app
  npm ci && npm run build
  pm2 restart colouring-bahrain
  ```

### Log Rotation
- PM2 auto-logs are handled by pm2-logrotate
- Nginx logs: managed by system logrotate

---

## Security Considerations

### 1. Firewall Rules
- Restrict PostgreSQL access to application server only
- Disable SSH from public internet (use bastion/VPN)
- Enable AWS Security Groups appropriately

### 2. Environment Variables
- Store sensitive data in `.env` (not in version control)
- Use AWS Secrets Manager or Parameter Store for production secrets

### 3. Database Security
- Use strong passwords for database users
- Regular security updates for PostgreSQL
- Enable SSL for database connections if remote

### 4. API Security
- Implement rate limiting
- Enable CORS for trusted domains only
- Validate all user inputs
- Keep dependencies updated: `npm audit fix`

---

## Rollback Procedure

```bash
# If deployment fails, revert to previous version
cd /opt/colouring-bahrain
git checkout HEAD~1
cd app
npm ci && npm run build
pm2 restart colouring-bahrain
```

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Port 3000 already in use | `lsof -i :3000` and kill process or change port |
| Database connection fails | Check `.env` credentials and PostgreSQL is running |
| Static assets not loading | Check `app/public/` directory permissions |
| High memory usage | Check PM2 cluster instances and adjust in ecosystem config |
| SSL certificate errors | Verify certificate paths and run `certbot renew` |

---

## Deployment Checklist

- [ ] EC2 instance created and security groups configured
- [ ] System dependencies installed
- [ ] PostgreSQL installed and configured
- [ ] Database and user created
- [ ] Repository cloned
- [ ] Migrations applied
- [ ] Node.js dependencies installed (`npm ci`)
- [ ] Environment variables configured (`.env`)
- [ ] Application built successfully
- [ ] PM2 configured and started
- [ ] Nginx configured as reverse proxy
- [ ] SSL certificate installed
- [ ] Health checks passed
- [ ] Backups configured
- [ ] Monitoring enabled

---

## Contact & Support

For issues or questions regarding deployment, contact the development team or refer to the [README.md](README.md) and [docs/](docs/) directory.

