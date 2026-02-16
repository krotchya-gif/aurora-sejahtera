# 🌟 Aurora Sejahtera Tour & Travel

Modern, full-featured tour & travel website dengan admin panel lengkap. Dibangun dengan Next.js 16, MongoDB, NextAuth, TypeScript, dan Tailwind CSS.

![Version](https://img.shields.io/badge/version-5.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black)
![MongoDB](https://img.shields.io/badge/MongoDB-8.2.4-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### 🎨 Frontend (Public Website)
- ✅ **Homepage dinamis** dengan hero slides (editable dari admin)
- ✅ **Paket Wisata** dengan filter kategori, tipe, search, dan sorting
- ✅ **Destinasi Populer** dengan aggregation by package count
- ✅ **Promo Section** dengan countdown timer & flash sale
- ✅ **Artikel/Blog** dengan kategori & tags
- ✅ **Galeri Foto** dengan kategori & lightbox
- ✅ **Testimonial** dengan rating & approve/unapprove system
- ✅ **Tim Kami** dengan foto & bio
- ✅ **Features Section** (Why Choose Us) dengan icon customizable
- ✅ **Contact Form** dengan Google Maps integration
- ✅ **WhatsApp Floating Button** dengan dynamic phone number
- ✅ **Legal Pages**: Privacy Policy, Terms & Conditions, FAQ
- ✅ **Responsive Design** - Mobile, Tablet, Desktop
- ✅ **SEO Optimized** dengan meta tags & sitemap

### 🎛️ Admin Panel (Dashboard)
- ✅ **Authentication** dengan NextAuth (email/password)
- ✅ **Dashboard** dengan statistics (total paket, artikel, testimonial)
- ✅ **CRUD Paket Wisata** - Create, Read, Update, Delete dengan validation
- ✅ **CRUD Artikel** - Full blog management dengan kategori & tags
- ✅ **CRUD Testimonial** - Approve/unapprove user testimonials
- ✅ **CRUD Galeri** - Photo gallery management
- ✅ **CRUD Hero Slides** - Homepage slider management
- ✅ **CRUD Team** - Team members management
- ✅ **CRUD Promo** - Promo banner management (optional)
- ✅ **CRUD Features** - Why Choose Us section management
- ✅ **Settings** - Site configuration (contact, WhatsApp, logo, maps)
- ✅ **File Upload System** - Drag & drop image upload dengan preview
- ✅ **Sidebar Navigation** dengan toggle minimize
- ✅ **Session Management** dengan auto logout

### 🔒 Security & Performance
- ✅ **Input Validation** dengan Zod schemas
- ✅ **Rate Limiting** - 3 tiers (Read, Write, Form submissions)
- ✅ **Type Safety** - Full TypeScript dengan proper interfaces
- ✅ **Unique Slug Generation** - Auto-generate unique slugs untuk SEO
- ✅ **Error Handling** - Comprehensive error handling & logging
- ✅ **Secure Authentication** - NextAuth dengan bcrypt password hashing
- ✅ **CORS Configuration** - Proper CORS headers
- ✅ **Strong Secret Key** - Production-ready NEXTAUTH_SECRET

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ dan npm
- MongoDB (local installation) atau MongoDB Atlas account
- Git

### Installation

```bash
# 1. Clone repository
git clone https://github.com/yourusername/aurora-sejahtera.git
cd aurora-sejahtera

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.local.example .env.local
# Edit .env.local dengan MongoDB URI & NextAuth secret

# 4. Run development server
npm run dev

# 5. Seed database (optional)
curl http://localhost:3000/api/seed

# 6. Open browser
# Website: http://localhost:3000
# Admin Panel: http://localhost:3000/admin
# Login: admin@aurorasejahtera.com / admin123
```

---

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/aurora-sejahtera
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/aurora-production

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl

# Site Configuration (Optional)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Generate NEXTAUTH_SECRET**:
```bash
openssl rand -base64 32
```

### Default Admin Credentials

**⚠️ CHANGE IN PRODUCTION!**
- Email: `admin@aurorasejahtera.com`
- Password: `admin123`

---

## 🛠️ Tech Stack

### Core
- **Framework**: Next.js 16.1.3 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB 8.2.4 (via Mongoose 9.1.4)
- **Authentication**: NextAuth 4.24.13

### Libraries
- **Validation**: Zod (latest)
- **Rate Limiting**: next-rate-limit (latest)
- **Password Hashing**: bcryptjs
- **Icons**: Heroicons (via inline SVG)

### Development Tools
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Package Manager**: npm

---

## 📚 Documentation

- **[CLAUDE.md](CLAUDE.md)** - Complete bug tracking, development log, dan changelog
  - 28 bugs fixed & documented
  - 6 enhancements implemented
  - Development statistics
  - Version history

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide
  - MongoDB Atlas setup
  - Environment variables
  - Deployment options (Vercel, Railway, DigitalOcean, VPS)
  - DNS & SSL configuration
  - Post-deployment checklist
  - Troubleshooting guide

---

## 🚀 Deployment

### Recommended: Vercel (Easiest)

1. Push code to GitHub
2. Import repository to Vercel
3. Add environment variables
4. Deploy!

**Full deployment guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)

### Other Options
- Railway (persistent storage)
- DigitalOcean App Platform (scalable)
- VPS Manual Setup (full control)

---

## 📊 Database Models

### Core Models
- **User** - Admin users dengan authentication
- **Settings** - Site-wide settings (contact, WhatsApp, logo)
- **Paket** - Tour packages dengan categories & types
- **Artikel** - Blog posts dengan kategori & tags
- **Testimonial** - User testimonials dengan approval system
- **Galeri** - Photo gallery dengan categories
- **HeroSlide** - Homepage slider images
- **Team** - Team members dengan photos & bios
- **Feature** - Features/Why Choose Us section
- **Promo** - Promotional banners (optional)

---

## 🔒 Security Features

- ✅ **Secure Authentication** - NextAuth dengan bcrypt
- ✅ **Input Validation** - Zod schemas untuk all forms
- ✅ **Rate Limiting** - Prevent API abuse
- ✅ **Protected Routes** - Admin routes require authentication
- ✅ **Type Safety** - Full TypeScript coverage
- ✅ **CORS Configuration** - Proper CORS headers
- ✅ **Environment Variables** - Sensitive data not committed
- ✅ **Unique Slug Generation** - Prevent duplicate slugs

---

## 🧪 Testing

### Manual Testing Checklist

**Frontend**:
```bash
# Start dev server
npm run dev

# Test pages:
# - Homepage: http://localhost:3000
# - Paket: http://localhost:3000/paket
# - Artikel: http://localhost:3000/artikel
# - Galeri: http://localhost:3000/galeri
# - Contact: http://localhost:3000/kontak
# - Tentang: http://localhost:3000/tentang
```

**Admin Panel**:
```bash
# Admin login
# URL: http://localhost:3000/admin
# Email: admin@aurorasejahtera.com
# Password: admin123

# Test CRUD operations:
# - Create new paket
# - Edit artikel
# - Approve testimonial
# - Upload image
# - Update settings
```

**Build Test**:
```bash
# Production build
npm run build

# Start production server
npm start

# Check: http://localhost:3000
```

---

## 📈 Performance

### Optimizations Implemented
- ✅ Next.js App Router dengan Server Components
- ✅ Image optimization dengan Next.js Image component
- ✅ Database indexing untuk fast queries
- ✅ Rate limiting untuk prevent abuse
- ✅ Lazy loading untuk images & components
- ✅ Efficient data fetching dengan server-side rendering

### Recommendations for Production
- Enable MongoDB Atlas auto-scaling
- Use CDN (Cloudflare) untuk static assets
- Implement Redis caching untuk API responses
- Enable Next.js ISR (Incremental Static Regeneration)
- Monitor with Sentry for error tracking
- Setup uptime monitoring (UptimeRobot)

---

## 📝 Development Log

### Version 5.0 (2026-01-25) - Production Ready Enhanced
- ✅ Fixed testimonial 500 error (email → WhatsApp field)
- ✅ Fixed admin testimonial Next.js Image error
- ✅ Added artikel image upload feature
- ✅ Fixed artikel validation for relative paths
- ✅ Fixed paket filter URL params sync
- ✅ Documented ImageUpload standardized pattern
- ✅ All 28 bugs resolved!

### Version 4.0 (2026-01-24) - Production Ready
- ✅ Added slug uniqueness validation
- ✅ Fixed ESLint no-explicit-any warnings
- ✅ Implemented input validation with Zod
- ✅ Added rate limiting system
- ✅ 100% type-safe codebase
- ✅ All critical bugs fixed

### Version 3.0 (2026-01-24) - Dynamic Content Complete
- ✅ Homepage 100% dynamic (fetch dari database)
- ✅ File upload system dengan drag & drop
- ✅ Hero slides CMS
- ✅ Team management CMS
- ✅ Promo & Features CMS
- ✅ Code refactoring dengan utility functions

### Version 2.0 (2026-01-24) - Foundation Complete
- ✅ Basic CRUD operations
- ✅ Admin authentication
- ✅ Public pages
- ✅ Settings management

**Complete changelog**: See [CLAUDE.md](CLAUDE.md)

---

## 🎯 Roadmap

### Future Enhancements (Optional)
- [ ] Multi-language support (ID/EN)
- [ ] Payment gateway integration (Midtrans/Xendit)
- [ ] Email notifications (SendGrid/Resend)
- [ ] Advanced search dengan Algolia/Meilisearch
- [ ] User accounts untuk booking history
- [ ] Review & rating system untuk paket
- [ ] Real-time chat (Socket.io)
- [ ] Push notifications (OneSignal)
- [ ] Analytics dashboard (Plausible/GA4)
- [ ] SEO tools (sitemap generator, robots.txt)

---

## ⭐ Features Highlights

### For Visitors
- 🎯 Easy navigation & modern UI
- 📱 Fully responsive design
- 🔍 Advanced search & filters
- 💬 WhatsApp quick contact
- ⭐ User testimonials
- 📰 Blog with travel tips
- 🖼️ Beautiful photo gallery

### For Admin
- 📊 Comprehensive dashboard
- ✏️ Easy content management
- 🖼️ Drag & drop image upload
- 📝 Rich text support
- 👥 Testimonial moderation
- ⚙️ Flexible settings
- 🔐 Secure authentication

---

## 📞 Support

- **Documentation**: See [CLAUDE.md](CLAUDE.md) and [DEPLOYMENT.md](DEPLOYMENT.md)
- **Issues**: Open issue on GitHub
- **Email**: support@aurorasejahtera.com (update with real email)

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Aurora Sejahtera Development Team**

Built with ❤️ using Next.js, MongoDB, and TypeScript

---

**Last Updated**: 2026-01-25
**Status**: ✅ Production Ready
**Version**: 5.0

🎉 **Ready for deployment!** Follow [DEPLOYMENT.md](DEPLOYMENT.md) untuk launch ke production.
