# 🚀 Aurora Sejahtera - Deployment Guide

**Complete guide untuk deploy Aurora Sejahtera ke production hosting**

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Environment Variables](#environment-variables)
4. [Pre-Deployment Testing](#pre-deployment-testing)
5. [Deployment Options](#deployment-options)
   - [Vercel (Recommended)](#option-1-vercel-recommended)
   - [Railway](#option-2-railway)
   - [DigitalOcean](#option-3-digitalocean-app-platform)
   - [VPS Manual Setup](#option-4-vps-manual-ubuntu-setup)
   - [Hostinger VPS + GitHub Actions](#option-5-hostinger-vps--github-actions-auto-deploy)
6. [DNS Configuration](#dns-configuration)
7. [Post-Deployment Checklist](#post-deployment-checklist)
8. [Monitoring & Maintenance](#monitoring--maintenance)
9. [Common Issues](#common-issues)
10. [Scaling Tips](#scaling-considerations)

---

## 📋 Prerequisites

Sebelum deploy, pastikan Anda punya:

- ✅ **MongoDB Atlas account** - https://www.mongodb.com/cloud/atlas (Free tier available)
- ✅ **Git repository** - GitHub, GitLab, atau Bitbucket
- ✅ **Domain name** (optional) - Bisa pakai subdomain gratis dari hosting
- ✅ **Node.js 18+** terinstall di local machine
- ✅ **Semua fitur sudah tested** di development environment

**Tech Stack Project**:
- Next.js 16.1.3
- MongoDB (via Mongoose)
- NextAuth 4.24.13
- TypeScript
- Tailwind CSS 4

---

## 🗄️ MongoDB Atlas Setup

### Step 1: Create Cluster

1. **Sign Up/Login**: https://www.mongodb.com/cloud/atlas
2. **Create New Cluster**:
   - Klik: **Build a Database** → **Free Shared (M0)**
   - Provider: **AWS** atau **Google Cloud**
   - Region: **Singapore** atau **Jakarta** (terdekat dengan users Indonesia)
   - Cluster Name: `aurora-sejahtera-prod`

### Step 2: Create Database User

1. **Database Access** (sidebar) → **Add New Database User**
2. **Authentication Method**: Password
3. **Username**: `aurora_admin`
4. **Password**: Click **Autogenerate Secure Password** → **Copy & Save**
5. **Database User Privileges**:
   - Built-in Role: `Read and write to any database`
   - Atau `Atlas admin` untuk full control
6. **Add User**

⚠️ **PENTING**: Simpan username & password ini dengan aman!

### Step 3: Whitelist IP Address

1. **Network Access** (sidebar) → **Add IP Address**
2. **For Development**:
   - Click **Add Current IP Address**
3. **For Production Hosting**:
   - Click **Allow Access from Anywhere** → `0.0.0.0/0`
   - Atau masukkan specific IP hosting jika diketahui

⚠️ **Security Note**: `0.0.0.0/0` memperbolehkan akses dari mana saja (aman karena tetap butuh username/password). Untuk extra security, gunakan specific IP hosting.

### Step 4: Get Connection String

1. **Cluster** → **Connect** → **Connect your application**
2. **Driver**: Node.js, Version: 5.5 or later
3. **Copy Connection String**:
   ```
   mongodb+srv://aurora_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

4. **Modify Connection String**:
   - Replace `<password>` dengan password yang dibuat di Step 2
   - Tambahkan database name setelah `.net/`: `/aurora-production`

   **Final String**:
   ```
   mongodb+srv://aurora_admin:YourPassword123@cluster0.xxxxx.mongodb.net/aurora-production?retryWrites=true&w=majority
   ```

5. **Test Connection String**:
   - Update `.env.local` dengan connection string baru
   - Jalankan `npm run dev`
   - Buka http://localhost:3000 → Harus connect ke Atlas, bukan local MongoDB

---

## 🔐 Environment Variables

### Generate NEXTAUTH_SECRET

**⚠️ CRITICAL**: Jangan gunakan secret yang sama dengan development!

**Option 1: OpenSSL** (Linux/Mac Terminal):
```bash
openssl rand -base64 32
```

**Option 2: Node.js**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option 3: Online Generator**:
- https://generate-secret.vercel.app/32

Copy hasil generate untuk digunakan di production.

### Production Environment Variables

File `.env.production` atau set di hosting dashboard:

```env
# ===== DATABASE =====
MONGODB_URI=mongodb+srv://aurora_admin:PASSWORD@cluster0.xxxxx.mongodb.net/aurora-production?retryWrites=true&w=majority

# ===== NEXTAUTH (CRITICAL!) =====
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=YOUR_GENERATED_SECRET_HERE

# ===== SITE CONFIG =====
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com/api

# ===== NODE ENVIRONMENT =====
NODE_ENV=production
```

**Important Notes**:
- `NEXTAUTH_URL`: Harus exact match dengan production domain (dengan https://)
- `NEXTAUTH_SECRET`: HARUS beda dengan development
- Jangan commit `.env.production` ke Git!

---

## 🧪 Pre-Deployment Testing

### 1. Build Test Locally

```bash
# Install dependencies
npm install

# Build production
npm run build

# Check for build errors
# If success, you'll see:
# ✓ Compiled successfully
```

### 2. Test Production Build

```bash
# Start production server locally
npm start
```

Buka http://localhost:3000 dan test:
- ✅ Homepage loading
- ✅ Admin login works
- ✅ Database queries working
- ✅ No console errors
- ✅ Images loading

### 3. Update Admin Credentials

**⚠️ CRITICAL**: Ubah password default sebelum production!

**Method 1: Via Admin Panel** (Recommended):
1. Login sebagai admin (`admin@aurorasejahtera.com` / `admin123`)
2. Create new admin user dengan email & password baru
3. Logout & login dengan user baru
4. Delete user default

**Method 2: Via Database** (Advanced):
```javascript
// Connect to MongoDB Atlas via Compass or mongosh
db.users.updateOne(
  { email: "admin@aurorasejahtera.com" },
  {
    $set: {
      email: "admin@yourdomain.com",
      // Generate bcrypt hash untuk password baru
      password: "$2a$10$hashedPasswordHere"
    }
  }
)
```

### 4. Update Site Settings

Login admin → Pengaturan → Update semua settings:
- Company name & description
- Email & phone numbers
- WhatsApp number (real number)
- Office address
- Google Maps embed URL
- Social media links
- Upload company logo (real logo, bukan placeholder)

---

## 🚀 Deployment Options

## Option 1: Vercel (RECOMMENDED) ⭐

**Best for**: Beginners, small-medium projects
**Pros**:
- ✅ Free tier generous
- ✅ Automatic deployments dari Git
- ✅ Global CDN
- ✅ Zero configuration
- ✅ Automatic HTTPS
- ✅ Environment variables management

**Cons**:
- ❌ Serverless functions (10s timeout free tier)
- ❌ Uploaded files tidak persistent (need cloud storage)

### Deployment Steps:

#### 1. Push ke GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit for deployment"

# Create main branch
git branch -M main

# Add remote repository
git remote add origin https://github.com/yourusername/aurora-sejahtera.git

# Push to GitHub
git push -u origin main
```

#### 2. Import Project ke Vercel

1. Login: https://vercel.com
2. Click **Add New...** → **Project**
3. **Import Git Repository**:
   - Connect GitHub account jika belum
   - Select repository: `aurora-sejahtera`
   - Click **Import**

#### 3. Configure Project

**Build & Development Settings**:
- Framework Preset: **Next.js** (auto-detected)
- Root Directory: `./` (default)
- Build Command: `npm run build` (default)
- Output Directory: `.next` (default)
- Install Command: `npm install` (default)

**Biarkan default, jangan diubah!**

#### 4. Add Environment Variables

Klik **Environment Variables** → Add satu per satu:

```
Key: MONGODB_URI
Value: mongodb+srv://aurora_admin:PASSWORD@...

Key: NEXTAUTH_URL
Value: https://aurora-sejahtera.vercel.app (atau domain kamu)

Key: NEXTAUTH_SECRET
Value: your_generated_secret_here

Key: NODE_ENV
Value: production
```

**Tips**:
- Pilih environment: **Production, Preview, Development** (all)
- Copy-paste dari notepad untuk avoid typos
- Double-check tidak ada trailing spaces

#### 5. Deploy!

1. Click **Deploy**
2. Wait 2-5 minutes (build process)
3. Jika success, akan muncul: 🎉 **Congratulations**
4. Your live site: `https://aurora-sejahtera.vercel.app`

#### 6. Seed Database

```bash
curl https://aurora-sejahtera.vercel.app/api/seed
```

Atau buka browser: `https://aurora-sejahtera.vercel.app/api/seed`

#### 7. Custom Domain (Optional)

1. **Vercel Dashboard** → Project → **Settings** → **Domains**
2. **Add Domain**: `yourdomain.com`
3. **Configure DNS** (di registrar domain):
   - Add CNAME record:
     ```
     Type: CNAME
     Name: @
     Value: cname.vercel-dns.com
     ```
   - Add CNAME for www:
     ```
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```
4. Wait 24-48 hours for DNS propagation
5. Vercel auto-issues SSL certificate

#### 8. Update NEXTAUTH_URL

Setelah custom domain aktif:
1. **Settings** → **Environment Variables**
2. Edit `NEXTAUTH_URL` → `https://yourdomain.com`
3. **Redeploy**: Deployments → Latest → **Redeploy**

---

### ⚠️ Vercel File Upload Issue

**Problem**: Files uploaded ke `/public/images/uploads/` akan **hilang saat redeploy** karena serverless environment.

**Solution**: Migrate ke cloud storage

#### Recommended: Cloudinary (Free Tier)

1. **Sign up**: https://cloudinary.com (Free: 25GB storage, 25GB bandwidth/month)
2. **Get credentials**: Dashboard → API Keys
3. **Install SDK**:
   ```bash
   npm install cloudinary next-cloudinary
   ```

4. **Update Environment Variables**:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

5. **Update ImageUpload Component** (future update needed)

**Alternative Cloud Storage**:
- **UploadThing**: https://uploadthing.com (5GB free)
- **AWS S3**: Pay as you go
- **Vercel Blob**: https://vercel.com/docs/storage/vercel-blob

---

## Option 2: Railway

**Best for**: Projects butuh persistent storage
**Pros**:
- ✅ Persistent file storage
- ✅ No cold starts
- ✅ Simple deployment
- ✅ Free $5 credit/month

**Cons**:
- ❌ Credits terbatas (need upgrade untuk production)

### Steps:

1. **Login**: https://railway.app
2. **New Project** → **Deploy from GitHub repo**
3. **Select Repository**: `aurora-sejahtera`
4. **Add Service Variables** (Environment Variables):
   - Same as Vercel list above
5. **Deploy**: Automatic
6. **Generate Domain**:
   - Settings → **Networking** → **Generate Domain**
   - You'll get: `your-app.railway.app`
7. **Update NEXTAUTH_URL**:
   - Variables → Edit `NEXTAUTH_URL` → `https://your-app.railway.app`
   - Redeploy
8. **Custom Domain**:
   - Settings → Custom Domains → Add domain
   - Configure DNS CNAME to `proxy.railway.app`

---

## Option 3: DigitalOcean App Platform

**Best for**: Scalable production apps
**Pros**:
- ✅ Full Node.js environment
- ✅ Persistent storage
- ✅ Easy scaling
- ✅ Managed service

**Cons**:
- ❌ Paid ($5/month minimum - Basic plan)

### Steps:

1. **Login**: https://cloud.digitalocean.com
2. **Create** → **Apps** → **Create App**
3. **GitHub**: Connect & select `aurora-sejahtera`
4. **Configure Resources**:
   - **Type**: Web Service
   - **Build Command**: `npm run build`
   - **Run Command**: `npm start`
   - **HTTP Port**: 3000
5. **Environment Variables**: Add all variables
6. **Choose Plan**: Basic ($5/mo) or Professional ($12/mo)
7. **Launch App**
8. **Custom Domain**: Settings → Domains → Add
9. **Update NEXTAUTH_URL** & redeploy

---

## Option 4: VPS Manual (Ubuntu Setup)

**Best for**: Full control, advanced users
**Pros**:
- ✅ Complete control
- ✅ Persistent storage
- ✅ No serverless limitations
- ✅ Can run multiple apps

**Cons**:
- ❌ Requires Linux knowledge
- ❌ Manual configuration
- ❌ You manage updates & security

### Server Requirements:
- **OS**: Ubuntu 22.04 LTS
- **RAM**: 2GB minimum (4GB recommended)
- **Storage**: 20GB SSD
- **CPU**: 1-2 cores

**VPS Providers**:
- DigitalOcean: $6/month (1GB RAM)
- Vultr: $5/month (1GB RAM)
- Linode: $5/month (1GB RAM)
- AWS Lightsail: $5/month (1GB RAM)

### Complete Setup Script:

```bash
# ======================================
# Aurora Sejahtera - VPS Setup Script
# Ubuntu 22.04 LTS
# ======================================

# 1. Update system packages
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version   # Should show v9.x.x

# 3. Install PM2 (process manager)
sudo npm install -g pm2

# 4. Install Nginx (web server / reverse proxy)
sudo apt install -y nginx

# 5. Install Git
sudo apt install -y git

# 6. Create deployment directory
sudo mkdir -p /var/www
cd /var/www

# 7. Clone repository
sudo git clone https://github.com/yourusername/aurora-sejahtera.git
cd aurora-sejahtera

# 8. Install dependencies
sudo npm install

# 9. Build production
sudo npm run build

# 10. Create environment file
sudo nano .env.production

# Paste environment variables:
# MONGODB_URI=mongodb+srv://...
# NEXTAUTH_URL=https://yourdomain.com
# NEXTAUTH_SECRET=...
# NODE_ENV=production
#
# Save: Ctrl+X, then Y, then Enter

# 11. Start application with PM2
sudo pm2 start npm --name "aurora" -- start

# 12. Setup PM2 startup script
sudo pm2 startup
sudo pm2 save

# 13. Check application status
pm2 status
pm2 logs aurora  # View logs

# Application now running on localhost:3000
```

### Configure Nginx Reverse Proxy:

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/aurora
```

**Paste this configuration**:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # Forward real client IP
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Allow larger file uploads (for image uploads)
    client_max_body_size 10M;
}
```

**Enable site & restart Nginx**:

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/aurora /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx
```

### Setup SSL Certificate (HTTPS):

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts:
# - Enter email
# - Agree to terms
# - Choose: Redirect HTTP to HTTPS (option 2)

# Test auto-renewal
sudo certbot renew --dry-run

# Certificate auto-renews every 90 days
```

### PM2 Useful Commands:

```bash
# View all processes
pm2 list

# Restart application
pm2 restart aurora

# Stop application
pm2 stop aurora

# View real-time logs
pm2 logs aurora

# Monitor CPU/RAM usage
pm2 monit

# Delete process
pm2 delete aurora
```

### Update Application (Future Updates):

```bash
# Navigate to project
cd /var/www/aurora-sejahtera

# Pull latest code
sudo git pull

# Install new dependencies (if any)
sudo npm install

# Rebuild
sudo npm run build

# Restart with PM2
pm2 restart aurora

# Check logs for errors
pm2 logs aurora
```

---

## Option 5: Hostinger VPS + GitHub Actions (Auto Deploy)

**Best for**: Hostinger users, auto-deploy setiap push ke GitHub
**Pros**:
- ✅ Auto-deploy setiap push ke `main` branch
- ✅ Persistent file storage
- ✅ Full control server
- ✅ Hostinger API & MCP server tersedia
- ✅ Affordable pricing

**Cons**:
- ❌ Perlu setup awal VPS
- ❌ Manage server sendiri

### Step 1: Setup Hostinger VPS

1. **Beli VPS** di https://www.hostinger.co.id/vps-hosting
   - Minimum: **KVM 1** (1 vCPU, 4GB RAM, 50GB SSD) ~Rp 50k/bulan
   - Recommended: **KVM 2** untuk production

2. **Setup VPS** (pilih OS: **Ubuntu 22.04**)

3. **Login via SSH**:
   ```bash
   ssh root@YOUR_VPS_IP
   ```

4. **Install dependencies di VPS**:
   ```bash
   # Update system
   apt update && apt upgrade -y

   # Install Node.js 18
   curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
   apt install -y nodejs

   # Install PM2, Nginx, Git
   npm install -g pm2
   apt install -y nginx git

   # Setup firewall
   ufw allow OpenSSH
   ufw allow 'Nginx Full'
   ufw enable
   ```

5. **Clone repository & first deploy**:
   ```bash
   # Create directory
   mkdir -p /var/www
   cd /var/www

   # Clone repo
   git clone https://github.com/YOUR_USERNAME/aurora-sejahtera.git
   cd aurora-sejahtera

   # Install & build
   npm install
   npm run build

   # Create environment file
   nano .env.production
   # Paste environment variables (MONGODB_URI, NEXTAUTH_URL, NEXTAUTH_SECRET, NODE_ENV=production)
   # Save: Ctrl+X → Y → Enter

   # Start with PM2
   pm2 start npm --name "aurora" -- start
   pm2 startup
   pm2 save
   ```

6. **Setup Nginx** (sama seperti [Option 4](#configure-nginx-reverse-proxy))

7. **Setup SSL** (sama seperti [Option 4](#setup-ssl-certificate-https))

### Step 2: Setup SSH Key untuk GitHub Actions

Di VPS, buat SSH key khusus untuk deployment:

```bash
# Generate SSH key (di VPS)
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions -N ""

# Tambahkan public key ke authorized_keys
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys

# Lihat private key (copy ini untuk GitHub Secret)
cat ~/.ssh/github_actions
```

### Step 3: Setup GitHub Repository Secrets

Di GitHub repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Secret Name | Value |
|---|---|
| `VPS_HOST` | IP address VPS (contoh: `103.xxx.xxx.xxx`) |
| `VPS_USERNAME` | `root` (atau user lain) |
| `VPS_SSH_KEY` | Isi dari `cat ~/.ssh/github_actions` (private key lengkap) |
| `VPS_PORT` | `22` (default SSH port) |

### Step 4: Buat GitHub Actions Workflow

Buat file `.github/workflows/deploy.yml` di repository:

```yaml
name: Deploy to Hostinger VPS

on:
  push:
    branches:
      - main
  workflow_dispatch: # Manual trigger

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy Aurora Sejahtera

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USERNAME }}
          key: ${{ secrets.VPS_SSH_KEY }}
          port: ${{ secrets.VPS_PORT }}
          script: |
            cd /var/www/aurora-sejahtera

            # Pull latest code
            git pull origin main

            # Install dependencies
            npm install --production

            # Build
            npm run build

            # Restart application
            pm2 restart aurora

            echo "Deploy completed at $(date)"
```

### Step 5: Test Auto-Deploy

```bash
# Di local machine, push perubahan ke GitHub
git add .
git commit -m "Test auto deploy"
git push origin main
```

Cek progress di: **GitHub Repository** → **Actions** tab

Setiap push ke branch `main`, GitHub Actions otomatis:
1. SSH ke VPS
2. Pull code terbaru
3. Install dependencies
4. Build project
5. Restart PM2

### Step 6: (Optional) Deploy Notification

Tambahkan notification di akhir workflow:

```yaml
      - name: Send notification
        if: success()
        run: |
          curl -s -X POST "https://api.telegram.org/bot${{ secrets.TELEGRAM_BOT_TOKEN }}/sendMessage" \
            -d "chat_id=${{ secrets.TELEGRAM_CHAT_ID }}" \
            -d "text=✅ Aurora Sejahtera deployed successfully! $(date)"
```

### Alternative: Hostinger API + Docker

Jika VPS pakai **Docker OS template**, bisa deploy via Hostinger API:

1. **Buat `Dockerfile`** di root project:
   ```dockerfile
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV=production
   COPY --from=builder /app/.next ./.next
   COPY --from=builder /app/node_modules ./node_modules
   COPY --from=builder /app/package.json ./
   COPY --from=builder /app/public ./public
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Buat `docker-compose.yaml`**:
   ```yaml
   services:
     aurora:
       build: .
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
         - MONGODB_URI=${MONGODB_URI}
         - NEXTAUTH_URL=${NEXTAUTH_URL}
         - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
       restart: always
   ```

3. **Deploy via Hostinger API**:
   ```bash
   curl -X POST "https://developers.hostinger.com/api/vps/v1/virtual-machines/{vmId}/docker" \
     -H "Authorization: Bearer YOUR_API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "project_name": "aurora-sejahtera",
       "content": "https://github.com/YOUR_USERNAME/aurora-sejahtera",
       "environment": "MONGODB_URI=mongodb+srv://...\nNEXTAUTH_URL=https://yourdomain.com\nNEXTAUTH_SECRET=your_secret"
     }'
   ```

4. **MCP Server** (untuk Claude/AI integration):
   - Install: https://github.com/hostinger/api-mcp-server
   - SDK tersedia: Node.js, Python, PHP, CLI, Terraform, Ansible

---

## 🌐 DNS Configuration

### For Vercel/Railway/DigitalOcean:

**At your domain registrar** (Namecheap, GoDaddy, Cloudflare, etc):

**Vercel**:
```
Type    Name    Value                   TTL
CNAME   @       cname.vercel-dns.com    Automatic
CNAME   www     cname.vercel-dns.com    Automatic
```

**Railway**:
```
Type    Name    Value                   TTL
CNAME   @       proxy.railway.app       Automatic
CNAME   www     proxy.railway.app       Automatic
```

### For VPS:

**Point to your VPS IP address**:

```
Type    Name    Value               TTL
A       @       123.456.789.10      Automatic
A       www     123.456.789.10      Automatic
```

**Find your VPS IP**: Check provider dashboard atau `curl ifconfig.me`

**DNS Propagation**: Wait 1-48 hours (usually 1-2 hours)

**Check DNS**: https://dnschecker.org

---

## ✅ Post-Deployment Checklist

### Frontend Testing:
- [ ] Homepage loads properly
- [ ] Hero slides visible & working
- [ ] Paket wisata listing works
- [ ] Paket detail pages load
- [ ] Filter & search paket berfungsi
- [ ] Artikel listing & detail works
- [ ] Galeri foto loads
- [ ] Testimonial section visible
- [ ] Contact page dengan Google Maps
- [ ] WhatsApp floating button works
- [ ] Footer data dari Settings
- [ ] Privacy Policy, Terms, FAQ accessible
- [ ] All images loading
- [ ] No console errors

### Admin Panel Testing:
- [ ] Can login with admin credentials
- [ ] Dashboard statistics showing
- [ ] CRUD Paket Wisata works
- [ ] CRUD Artikel works
- [ ] CRUD Testimonial (approve/unapprove)
- [ ] CRUD Galeri works
- [ ] CRUD Hero Slides works
- [ ] CRUD Team works
- [ ] CRUD Promo works (optional)
- [ ] CRUD Features works
- [ ] Image upload works (ImageUpload component)
- [ ] Settings update works (WhatsApp, Maps, logo)
- [ ] Can logout properly

### Security Testing:
- [ ] Admin routes protected (redirect to login if not authenticated)
- [ ] HTTPS enabled (padlock icon in browser)
- [ ] SSL certificate valid
- [ ] Rate limiting active (test with rapid requests)
- [ ] Input validation working (try submit invalid data)
- [ ] No sensitive data exposed in console logs
- [ ] CORS headers configured correctly
- [ ] No error stack traces shown to users

### SEO & Search Console Setup:
- [ ] **Access robots.txt**: `https://yourdomain.com/robots.txt`
- [ ] **Access sitemap.xml**: `https://yourdomain.com/sitemap.xml`
- [ ] **Login Admin** → Menu **SEO Settings**
- [ ] **Edit robots.txt** (optional, default sudah optimal)
- [ ] **Exclude halaman** yang tidak perlu di-index (contoh: `/admin`, `/login`)
- [ ] **Set default priority & changefreq** untuk sitemap
- [ ] **Google Search Console**:
  - Buka [search.google.com/search-console](https://search.google.com/search-console)
  - Add property → Domain atau URL prefix
  - Verify ownership (via DNS record atau HTML file)
  - Submit sitemap: `sitemap.xml`
- [ ] **Test Social Media Preview**:
  - Share link di WhatsApp (harus muncul logo + deskripsi)
  - Facebook Debugger: [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/)
  - Twitter Card Validator: [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)

### Performance Testing:
- [ ] Homepage load time < 3 seconds
- [ ] Admin dashboard load time < 2 seconds
- [ ] Images optimized & loading fast
- [ ] No memory leaks (monitor RAM usage)
- [ ] Database queries fast (< 500ms)
- [ ] API endpoints respond quickly (< 1s)

### Database Testing:
- [ ] Can connect to MongoDB Atlas
- [ ] Data persists after redeploy
- [ ] CRUD operations working
- [ ] Seed data populated correctly

---

## 📊 Monitoring & Maintenance

### A. Uptime Monitoring

**Setup uptime monitoring** untuk get notified jika website down:

**Recommended Services (Free)**:

1. **UptimeRobot** (Recommended)
   - https://uptimerobot.com
   - Free: 50 monitors
   - Check interval: 5 minutes
   - Alert via: Email, SMS, Slack, etc.

2. **Better Uptime**
   - https://betteruptime.com
   - Free: 10 monitors
   - Beautiful status pages

3. **Pingdom**
   - https://www.pingdom.com
   - Free trial: 14 days
   - Paid after trial

**URLs to Monitor**:
```
https://yourdomain.com (Homepage)
https://yourdomain.com/admin (Admin panel)
https://yourdomain.com/api/paket (API health)
```

### B. Error Tracking

**Install Sentry** untuk track errors automatically:

```bash
npm install @sentry/nextjs
```

**Setup**:
```bash
npx @sentry/wizard -i nextjs
```

Follow wizard prompts → Creates `sentry.client.config.js` & `sentry.server.config.js`

**Benefits**:
- Track JavaScript errors
- Track API errors
- Get email notifications
- See user actions before error
- Free tier: 5,000 events/month

### C. Analytics

**Google Analytics 4** (Free):

1. Create GA4 property: https://analytics.google.com
2. Get Measurement ID: `G-XXXXXXXXXX`
3. Add to `app/layout.tsx`:

```typescript
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**Alternative**: Plausible Analytics (privacy-friendly, paid)

### D. Backup Strategy

#### 1. Database Backup (MongoDB Atlas)

**Automated Backup** (Paid tiers M10+):
- Cluster → Backup → Enable Cloud Backup
- Retention: 7 days free

**Manual Backup** (All tiers):
```bash
# Export entire database
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/aurora-production" --out=/backup/$(date +%Y%m%d)

# Restore from backup
mongorestore --uri="mongodb+srv://..." /backup/20260125/
```

**Backup Schedule**: Weekly recommended

#### 2. Code Backup

✅ Already backed up via GitHub repository

**Setup automated backups** to external storage:
- GitHub Actions → Backup to AWS S3
- Cron job → Backup to DigitalOcean Spaces

#### 3. Uploaded Files Backup

**VPS Only**:
```bash
# Backup uploads directory
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz /var/www/aurora/public/images/uploads/

# Restore
tar -xzf uploads-backup-20260125.tar.gz -C /var/www/aurora/public/images/
```

**Vercel/Railway**: Use cloud storage (Cloudinary, S3) - they handle backups

---

## 🔧 Common Issues & Solutions

### Issue 1: "Cannot connect to MongoDB"

**Error**: `MongooseServerSelectionError: Could not connect to any servers`

**Solutions**:
1. ✅ Check `MONGODB_URI` di environment variables
   - Pastikan tidak ada typo
   - Pastikan password correct (tidak ada special characters yang di-encode salah)
2. ✅ Whitelist IP di MongoDB Atlas:
   - Network Access → Add IP: `0.0.0.0/0`
3. ✅ Test connection string locally first:
   - Update `.env.local` → Run `npm run dev`
   - Jika local works, production juga harus works

**How to encode password with special characters**:
```
Original password: p@ss#word
Encoded: p%40ss%23word

@ = %40
# = %23
$ = %24
% = %25
```

### Issue 2: "Uploaded images tidak muncul setelah deploy"

**Symptoms**:
- Upload sukses tapi image tidak muncul
- 404 error untuk `/images/uploads/...`
- Images hilang setelah redeploy

**Root Cause**: Serverless environment (Vercel) tidak persistent

**Solutions**:

**A. Migrate ke Cloudinary** (Recommended):
1. Sign up: https://cloudinary.com
2. Install: `npm install cloudinary next-cloudinary`
3. Add env vars: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
4. Update ImageUpload component (future enhancement needed)

**B. Use VPS** dengan persistent storage:
- Deploy ke DigitalOcean App Platform, Railway, atau VPS manual
- `/public/images/uploads/` akan persistent

### Issue 3: "Admin panel redirect loop"

**Symptoms**:
- Cannot login to admin
- Redirects to login page continuously
- Stuck in login loop

**Solutions**:
1. ✅ Check `NEXTAUTH_URL`:
   ```env
   # Wrong:
   NEXTAUTH_URL=http://yourdomain.com  # Missing https
   NEXTAUTH_URL=yourdomain.com         # Missing protocol

   # Correct:
   NEXTAUTH_URL=https://yourdomain.com
   ```
2. ✅ Check `NEXTAUTH_SECRET` is set
3. ✅ Clear browser cookies & cache
4. ✅ Try incognito/private mode
5. ✅ Check browser console for errors

### Issue 4: "Rate limiting too aggressive - Users blocked"

**Symptoms**:
- Users get 429 error
- "Too many requests, please try again later"

**Solution**: Adjust rate limits di `/src/lib/rate-limit.ts`:

```typescript
// Current limits:
const readLimiter = rateLimit({
  interval: 15 * 60 * 1000,  // 15 minutes
  uniqueTokenPerInterval: 500,
});

// Increase to:
const readLimiter = rateLimit({
  interval: 15 * 60 * 1000,  // 15 minutes
  uniqueTokenPerInterval: 1000,  // More users
});
```

### Issue 5: "Slow page load times"

**Symptoms**:
- Pages take > 5 seconds to load
- Images loading slowly
- High Time to First Byte (TTFB)

**Solutions**:
1. ✅ Enable Next.js Image Optimization:
   ```typescript
   // Already using next/image component
   import Image from 'next/image'
   ```

2. ✅ Add Database Indexes (MongoDB Atlas):
   ```javascript
   // In MongoDB Compass or mongosh
   db.paket.createIndex({ slug: 1 })
   db.paket.createIndex({ kategori: 1, tipe: 1 })
   db.artikel.createIndex({ slug: 1 })
   ```

3. ✅ Use CDN for images:
   - Cloudinary (auto CDN)
   - Cloudflare (free CDN)

4. ✅ Enable caching headers
5. ✅ Optimize images (compress, use WebP)
6. ✅ Upgrade MongoDB Atlas tier (M0 → M10)

### Issue 6: "Build fails on Vercel"

**Common Errors**:

**A. "Module not found"**:
```bash
# Solution: Check package.json dependencies
npm install
npm run build  # Test locally first
```

**B. "Type errors"**:
```bash
# Solution: Fix TypeScript errors
npm run build  # Shows all errors
# Fix each error
```

**C. "Out of memory"**:
```
# Solution: Reduce build memory usage or upgrade Vercel plan
# Vercel free tier: 1GB RAM limit
```

### Issue 7: "Environment variables not working"

**Symptoms**:
- Features work locally but not in production
- `undefined` values in production

**Solutions**:
1. ✅ Check env vars set in hosting dashboard
2. ✅ For client-side variables, use `NEXT_PUBLIC_` prefix:
   ```env
   # Server-side only (not accessible in browser):
   MONGODB_URI=...

   # Client-side accessible:
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```
3. ✅ Redeploy after adding env vars
4. ✅ Check for typos in variable names

---

## 📈 Scaling Considerations

Jika traffic meningkat:

### Database Scaling (MongoDB Atlas)

**Current**: M0 Free Tier
- Shared resources
- 512MB storage
- Limited connections

**Upgrade Path**:
1. **M10 (Recommended untuk production)**:
   - $0.08/hour (~$60/month)
   - Dedicated resources
   - 10GB storage
   - Automatic backups
   - 500 connections

2. **M20** (High traffic):
   - $0.20/hour (~$150/month)
   - 20GB storage
   - 1500 connections

**When to upgrade**:
- Website gets > 10,000 visits/day
- Database size > 400MB
- Slow query times
- Connection errors

### Hosting Scaling

**Vercel** (Auto-scales):
- Free tier: 100GB bandwidth/month
- Pro: $20/month - 1TB bandwidth
- Handles traffic spikes automatically

**Railway**:
- Upgrade plan untuk more resources
- Add more RAM/CPU as needed

**VPS**:
- **Vertical Scaling**: Increase droplet size (more RAM/CPU)
- **Horizontal Scaling**: Multiple servers + load balancer

### CDN (Content Delivery Network)

**Cloudflare** (Recommended - Free):
1. Sign up: https://cloudflare.com
2. Add domain
3. Update nameservers di registrar
4. Enable caching & optimization

**Benefits**:
- Faster page loads globally
- DDoS protection
- Free SSL certificate
- Caching static assets
- Reduce hosting bandwidth usage

### Caching Strategy

**Redis** (untuk API caching):
```bash
npm install redis
```

Cache expensive queries:
- Paket listing
- Artikel listing
- Settings (cache 1 hour)

**Next.js ISR** (Incremental Static Regeneration):
```typescript
export const revalidate = 3600 // Revalidate every 1 hour
```

---

## 🎯 Quick Reference Checklist

### Pre-Deploy:
- [ ] MongoDB Atlas cluster created
- [ ] Connection string obtained & tested
- [ ] NEXTAUTH_SECRET generated (new, secure)
- [ ] Admin password changed dari default
- [ ] Site settings updated (contact, maps, logo)
- [ ] Build succeeds locally (`npm run build`)
- [ ] Production build tested (`npm start`)
- [ ] Code pushed to GitHub

### Deploy:
- [ ] Choose hosting platform
- [ ] Create new project from GitHub
- [ ] Add all environment variables
- [ ] Deploy & wait for build complete
- [ ] Access deployment URL & check homepage
- [ ] Seed database (`curl yoursite.com/api/seed`)
- [ ] Login to admin panel & verify

### Post-Deploy:
- [ ] Test all pages & features
- [ ] Test admin CRUD operations
- [ ] Test image upload functionality
- [ ] Setup custom domain (if desired)
- [ ] SSL certificate enabled (HTTPS)
- [ ] Setup uptime monitoring (UptimeRobot)
- [ ] Setup error tracking (Sentry)
- [ ] Configure database backups
- [ ] Add to Google Search Console
- [ ] Add Google Analytics

### Ongoing:
- [ ] Monitor uptime & performance
- [ ] Check error reports weekly
- [ ] Backup database monthly
- [ ] Update dependencies quarterly
- [ ] Review & optimize database queries
- [ ] Monitor storage usage
- [ ] Review security best practices

---

## 🆘 Need Help?

### Documentation:
- Next.js: https://nextjs.org/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
- Vercel: https://vercel.com/docs
- NextAuth: https://next-auth.js.org/

### Community:
- Next.js Discord: https://nextjs.org/discord
- MongoDB Community: https://www.mongodb.com/community/forums/

### Professional Support:
- Hire developer untuk custom modifications
- Managed hosting dengan support

---

**Last Updated**: 2026-02-16
**Version**: 6.0
**Project**: Aurora Sejahtera Tour & Travel

---

🎉 **Congratulations!** Jika Anda mengikuti guide ini, website Aurora Sejahtera sudah live di production dan siap menerima visitors!
