# Colouring Bahrain — Actual Server Setup Guide

**Purpose:** Replace / update the outdated CCRP wiki guide  
[Setting up a local development environment](https://github.com/colouring-cities/ccrp-technical-manual/wiki/Setting-up-a-local-development-environment)  
with what was **actually installed and used** on this main server.

**Last audited:** 24 August 2026  
**Host:** AWS Ubuntu instance (`ip-172-31-72-46`)  
**App path:** `/home/ubuntu/colouring-core`  
**Runtime user:** `ubuntu`

---

## 1. Important: how this differs from the official wiki

The wiki is a **local development** guide (VirtualBox / Ubuntu VM, `npm start`).  
This machine is a **production-style main server**.

| Topic | Official wiki (old) | This server (actual) |
| --- | --- | --- |
| OS | Generic Ubuntu / VM | **Ubuntu 24.04.3 LTS** (AWS) |
| Node.js | **v16.13.2** | **v18.20.4** |
| npm | 8.19.4 | 8.19.4 |
| PostgreSQL | **12** | **18.1** (active cluster) |
| PostGIS | 3.x on PG12 | **3.6.1** on PG18 |
| Python | 3.x | **3.12.3** |
| How the app runs | `npm start` (Razzle/dev) | **`npm run build` + PM2** (`build/server.js`) |
| Process manager | none / terminal | **PM2 6.0.14** |
| Reverse proxy | VirtualBox port forward `8080→3000` | **nginx 1.24.0** on port **80** → Node **3000** |
| Public hostname | localhost | **t8dr.com / www.t8dr.com** |
| Database name | placeholder | **`colouringcoredb`** |
| DB role | placeholder | **`ubuntu`** (superuser) |
| Tile engine | mapnik (via npm) | **mapnik npm 4.5.9** (native Mapnik 4.0.0) |
| Mail | optional SMTP env | Local **Postfix** / sendmail (no `MAIL_SERVER_*` in PM2 env) |

Also present on disk but **not** what the wiki assumes:

- Leftover Node **v16.13.2** tarball at `~/node-v16.13.2-linux-x64.tar.xz` (PATH was later switched to v18).
- PostgreSQL **12** packages still installed, but **only PG 18 cluster is online** on port 5432.
- Legacy `~/keep_alive.sh` + cron that restarts via `screen` + `npm run start:prod` — **PM2 is the real live process**; treat the cron as legacy.

---

## 2. What is running right now (snapshot)

```text
App process : PM2 name "coloring-core" → /home/ubuntu/colouring-core/app/build/server.js
Node listen : 0.0.0.0:3000
nginx       : :80 → 127.0.0.1:3000
Postgres    : 18/main on :5432
DB          : colouringcoredb  (~18,799 buildings / ~18,521 geometries / ~25 users)
Tile cache  : /home/ubuntu/colouring-core/app/tilecache
Geometries  : served from build/public/geometries (and /api/map-layers/* for DB overlays)
```

**Operational warning (as of 24 Aug 2026):**

- Live **build** still contains **Colouring Bahrain** customisations (city name, overlays, emails).
- Git working tree under `/home/ubuntu/colouring-core` currently tracks **upstream `master`** defaults (`cityName: "Cities"`, London sample geometries in `app/public/geometries`).
- Do **not** rebuild/redeploy from a clean `master` checkout without restoring Bahrain config, geometries, and app customisations first.
- A full tree backup exists at:  
  `/home/ubuntu/colouring-core-live-backup-20260815-091901.tar.gz` (~401 MB).

---

## 3. Directory layout (outside and inside the app)

```text
/home/ubuntu/
├── colouring-core/                 # main repo checkout
│   ├── app/                        # Node/Razzle application (PM2 cwd)
│   │   ├── build/                  # production build (what PM2 runs)
│   │   ├── ecosystem.config.js     # live PM2 env (secrets live here)
│   │   ├── map_styles/             # Mapnik XML (must also exist in build/)
│   │   ├── public/geometries/      # static overlays (copied into build on compile)
│   │   ├── src/                    # TypeScript/React source
│   │   ├── tilecache/              # rendered map tiles cache
│   │   └── package.json
│   ├── migrations/                 # SQL up/down migrations
│   ├── etl/                        # Python ETL helpers + venv
│   ├── maintenance/                # ops scripts
│   ├── docs/                       # documentation (this file)
│   └── provision/                  # old Vagrant provision scripts (outdated versions)
├── coloring-core-old/              # older leftover tree
├── geometries_backup/              # geometry backup folder
├── keep_alive.sh                   # legacy screen keep-alive
├── cron_log.log
└── colouring-core-live-backup-*.tar.gz
```

Repo remote:

```text
origin  git@github.com:colouring-cities/colouring-core.git
```

---

## 4. Fresh setup steps (matching this server)

Use these steps if rebuilding a similar main server. Values in `<angle brackets>` must be filled; values used on this host are noted.

### 4.1 Base OS packages

```bash
sudo apt-get update -y
sudo apt-get upgrade -y

sudo apt-get install -y \
  build-essential git wget curl parallel rename \
  python3 python3-pip python3-dev python3-venv \
  gdal-bin libspatialindex-dev libgeos-dev libproj-dev \
  libpq-dev pkg-config \
  nginx postfix
```

On this host, GDAL is **3.8.4**, GEOS **3.12.1**, PROJ **9.4.0**.

### 4.2 PostgreSQL 18 + PostGIS (not 12)

The wiki installs PostgreSQL 12. On Ubuntu 24.04 this server uses the PGDG packages and **PostgreSQL 18**.

```bash
sudo apt-get install -y postgresql-common
# Follow current postgresql.org PGDG apt instructions for Ubuntu noble, then:
sudo apt-get install -y \
  postgresql-18 postgresql-contrib-18 \
  postgresql-18-postgis-3 libpq-dev
```

Ensure locale exists:

```bash
sudo locale-gen en_US.UTF-8
```

Configure listen + auth (paths use **18**, not 12):

```bash
sudo sed -i "s/#\?listen_addresses.*/listen_addresses '*'/" /etc/postgresql/18/main/postgresql.conf
echo "host    all             all             all                     md5" | sudo tee -a /etc/postgresql/18/main/pg_hba.conf
sudo systemctl restart postgresql
```

Create role + database (this server):

```bash
# Role: ubuntu / DB: colouringcoredb
sudo -u postgres psql -c "SELECT 1 FROM pg_user WHERE usename = 'ubuntu';" | grep -q 1 \
  || sudo -u postgres psql -c "CREATE ROLE ubuntu SUPERUSER LOGIN PASSWORD '<pgpassword>';"

sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname = 'colouringcoredb';" | grep -q 1 \
  || sudo -u postgres createdb -E UTF8 -T template0 --locale=en_US.utf8 -O ubuntu colouringcoredb
```

Extensions:

```bash
export PGHOST=localhost PGPORT=5432 PGUSER=ubuntu PGPASSWORD='<pgpassword>' PGDATABASE=colouringcoredb
psql -c "CREATE EXTENSION IF NOT EXISTS postgis;"
psql -c "CREATE EXTENSION IF NOT EXISTS pgcrypto;"
psql -c "CREATE EXTENSION IF NOT EXISTS pg_trgm;"
```

### 4.3 Node.js 18 (not 16)

Wiki uses Node 16. This server needed **Node 18** for the current dependency set / Ubuntu 24 toolchain.

```bash
export NODE_VERSION=v18.20.4
export DISTRO=linux-x64
wget -nc https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-$DISTRO.tar.xz
sudo mkdir -p /usr/local/lib/node
sudo tar xf node-$NODE_VERSION-$DISTRO.tar.xz -C /usr/local/lib/node
sudo mv /usr/local/lib/node/node-$NODE_VERSION-$DISTRO /usr/local/lib/node/node-$NODE_VERSION
rm node-$NODE_VERSION-$DISTRO.tar.xz

cat >> ~/.profile <<EOF
export NODEJS_HOME=/usr/local/lib/node/node-$NODE_VERSION/bin
export PATH=\$NODEJS_HOME:\$PATH
EOF
source ~/.profile

node -v   # expect v18.20.4
npm -v    # expect 8.19.4 (or upgrade carefully)
```

Install PM2 globally:

```bash
sudo env "PATH=$PATH" npm install -g pm2@6
pm2 -v    # this host: 6.0.14
```

### 4.4 Clone / place the codebase

```bash
cd ~
git clone git@github.com:colouring-cities/colouring-core.git
# or restore from the Bahrain backup tarball if recreating this exact site
```

On this server the live tree is `/home/ubuntu/colouring-core`.

### 4.5 Install Node dependencies

```bash
cd ~/colouring-core/app
npm install
# If peer dependency conflicts appear (legacy packages), this host has used:
# npm install --legacy-peer-deps
```

**Mapnik note:** `mapnik` is a native module (`^4.5.9`). It must compile/load successfully (`require('mapnik')`). On this host it reports Mapnik **4.0.0** bindings. If install fails, fix system build libs before continuing; the map tiles will not render without it.

### 4.6 Configure city + secrets

1. Edit `app/src/cc-config.json` for Bahrain (map centre, city name, geometry API paths, etc.).
2. Copy Bahrain overlay GeoJSON / client GIS files into `app/public/geometries/` (and `data/` as needed).
3. Create `app/ecosystem.config.js` from `ecosystem.config.template.js` (repo root) / the live file pattern below.
4. **Do not commit secrets.**

Live PM2 env shape used on this host:

```js
module.exports = {
  apps: [{
    name: 'coloring-core',
    script: 'build/server.js',
    cwd: '/home/ubuntu/colouring-core/app',
    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: '3000',
      RAZZLE_PUBLIC_PATH: '/',
      RAZZLE_PUBLIC_DIR: '/home/ubuntu/colouring-core/app/build/public',
      PGHOST: 'localhost',
      PGPORT: '5432',
      PGDATABASE: 'colouringcoredb',
      PGUSER: 'ubuntu',
      PGPASSWORD: '<pgpassword>',
      APP_COOKIE_SECRET: '<long-random-secret>',
      TILECACHE_PATH: '/home/ubuntu/colouring-core/app/tilecache'
      // Optional SMTP (template supports these; this host currently relies on local Postfix):
      // MAIL_SERVER_HOST, MAIL_SERVER_PORT, MAIL_SERVER_USER, MAIL_SERVER_PASSWORD
    }
  }]
};
```

Create tilecache:

```bash
mkdir -p ~/colouring-core/app/tilecache
```

### 4.7 Database schema + data

#### Migrations

```bash
export PGHOST=localhost PGPORT=5432 PGUSER=ubuntu PGPASSWORD='<pgpassword>' PGDATABASE=colouringcoredb
ls ~/colouring-core/migrations/*.up.sql | sort | while read -r m; do
  echo "Running $m"
  psql -v ON_ERROR_STOP=1 -f "$m"
done
```

This repo currently ships numbered migrations through **059**.  
Bahrain-specific columns/tables on this DB (e.g. engagement / heritage / `map_*` overlay tables) may come from later maintenance SQL or imports — apply those after the stock migrations if restoring this exact deployment.

#### Load buildings

Options (same idea as the wiki, but paths/credentials match this server):

1. Restore from `pg_dump` / backup.
2. ETL scripts under `~/colouring-core/etl` (activate `etl/venv`, install `requirements.txt`, then `load_geometries.sh` / `create_building_records.sh`).
3. Import client footprint / cadastral GeoJSON with maintenance scripts.

After geometry changes, clear relevant `tilecache/` folders so Mapnik does not keep stale tiles.

### 4.8 Build for production (not `npm start`)

Wiki ends at `npm start` for local viewing. On the main server:

```bash
cd ~/colouring-core/app
npm run build

# Critical: Mapnik styles must exist in the build output
mkdir -p build/map_styles
cp map_styles/*.xml build/map_styles/
```

Recommended: keep a `postbuild` script in `package.json` so this copy always happens:

```json
"postbuild": "mkdir -p build/map_styles && cp map_styles/*.xml build/map_styles/"
```

### 4.9 Start with PM2

```bash
cd ~/colouring-core/app
pm2 start ecosystem.config.js
pm2 save
# Optional: enable boot persistence
# pm2 startup systemd -u ubuntu --hp /home/ubuntu
```

Useful commands:

```bash
pm2 status
pm2 logs coloring-core
pm2 restart all --update-env
```

### 4.10 nginx reverse proxy

Site file on this host: `/etc/nginx/sites-enabled/coloring-core.conf`

```nginx
server {
    listen 80;
    server_name t8dr.com www.t8dr.com;

    client_max_body_size 50M;

    location /static/ {
        alias /home/ubuntu/colouring-core/app/build/public/static/;
        try_files $uri =404;
        expires 30d;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        # Express trust-proxy / secure cookies depend on this
        proxy_set_header X-Forwarded-Proto https;
        proxy_buffering off;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo nginx -t
sudo systemctl reload nginx
```

**Notes from this deployment:**

- There is **no Let’s Encrypt** tree on this host (`/etc/letsencrypt/live` absent). TLS may be terminated upstream (e.g. Cloudflare / load balancer). nginx currently listens on **80** only.
- `X-Forwarded-Proto https` is forced so Express session cookies can work behind HTTPS termination.

### 4.11 Python / ETL (optional but installed)

```bash
cd ~/colouring-core/etl
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
```

This host already has `etl/venv`.

---

## 5. Day-to-day deploy checklist (this server)

```bash
cd /home/ubuntu/colouring-core/app

# 1) Pull / restore Bahrain custom source if needed
# 2) Install deps if package.json changed
npm install --legacy-peer-deps

# 3) Production build
npm run build
mkdir -p build/map_styles && cp map_styles/*.xml build/map_styles/

# 4) Restart live process with updated env
pm2 restart all --update-env

# 5) Quick health checks
curl -I http://127.0.0.1:3000/
pm2 status
```

If map colours disappear after deploy, first check:

1. `build/map_styles/polygon.xml` exists.
2. Tile cache may need a selective clear under `tilecache/<layer>/`.
3. Overlay GeoJSON / `/api/map-layers/...` still present.

---

## 6. Environment variables that matter

| Variable | Used for |
| --- | --- |
| `NODE_ENV` | `production` for PM2 |
| `PORT` | App listen port (`3000`) |
| `RAZZLE_PUBLIC_DIR` | Absolute path to `build/public` |
| `RAZZLE_PUBLIC_PATH` | Public asset prefix (`/`) |
| `PGHOST` `PGPORT` `PGDATABASE` `PGUSER` `PGPASSWORD` | Postgres |
| `APP_COOKIE_SECRET` | Session signing |
| `TILECACHE_PATH` | Mapnik tile cache directory |
| `MAIL_SERVER_*` | Optional SMTP (template); not set in current PM2 env |

Express is configured with `trust proxy` and session `cookie.secure: 'auto'` so login works behind the nginx / HTTPS edge.

---

## 7. Legacy / do-not-confuse pieces

1. **`provision/vm_provision.sh`** still mentions Node **v12** and PostgreSQL **10/12** — ignore for this server.
2. **Wiki Node 16 / PG12** — outdated for Ubuntu 24.04 + current deps.
3. **`keep_alive.sh` cron** (`* * * * *`) starts a `screen` session named `colouring` with `npm run start:prod`. Live traffic is served by **PM2**, not that screen session. Prefer fixing PM2 over relying on the cron.
4. **`coloring-core-old/`** — leftover older tree; not the live app.
5. **Source vs build drift** — always confirm `build/server.js` and `src/cc-config.json` match the Bahrain site before a rebuild.

---

## 8. Verification commands

```bash
# Versions
node -v; npm -v; pm2 -v; psql --version; nginx -v; python3 --version

# Services
systemctl is-active postgresql nginx postfix
pg_lsclusters
pm2 status

# Database
PGPASSWORD='<pgpassword>' PGUSER=ubuntu PGHOST=localhost PGDATABASE=colouringcoredb \
  psql -c '\dx' -c 'SELECT count(*) FROM buildings; SELECT count(*) FROM geometries;'

# App + proxy
curl -I http://127.0.0.1:3000/
curl -I http://127.0.0.1/   # via nginx

# Mapnik load
node -e "console.log(require('mapnik').versions)"
```

Expected healthy signals on this host:

- Node `v18.20.4`
- Postgres cluster `18 main` online on `5432`
- PM2 `coloring-core` **online**
- nginx **active**
- Homepage HTTP **200**
- Mapnik require succeeds

---

## 9. Suggested backup / recovery

Already on this host:

```text
/home/ubuntu/colouring-core-live-backup-20260815-091901.tar.gz
```

Recommended routine:

1. `pg_dump colouringcoredb > colouringcoredb-YYYYMMDD.sql`
2. Archive `/home/ubuntu/colouring-core/app` (especially `build/`, `public/geometries/`, `ecosystem.config.js`, `map_styles/`, `src/cc-config.json`)
3. Keep nginx site file `/etc/nginx/sites-enabled/coloring-core.conf`

---

## 10. Short “boss summary”

- Official CCRP setup wiki is a **dev VM recipe** (Node 16, Postgres 12, `npm start`).
- Colouring Bahrain main server is **Ubuntu 24.04 + Node 18 + Postgres 18 + nginx + PM2 production build**.
- Public site is proxied as **t8dr.com → nginx:80 → Node:3000**.
- Database is **`colouringcoredb`** with Muharraq building data already loaded.
- Always deploy with **`npm run build`**, copy **`map_styles` into `build/`**, then **`pm2 restart`**.

---

*Document generated from live inspection of this server, not from the outdated wiki defaults.*
