# ZYNK Digital Agency Website

A modern, multilingual (Arabic/English) digital marketing agency website built with Next.js 14, featuring dark/light mode support and a stunning neon purple theme with primary color #f2ff58.

## 🎨 Features

- ✅ **Next.js 14 App Router** with TypeScript
- ✅ **Multilingual Support** (Arabic & English) using next-intl
- ✅ **Dark & Light Mode** with system preference detection
- ✅ **Custom Color Scheme**:
  - Primary: #f2ff58 (Neon Yellow)
  - Secondary: Neon Purple Gradient (#a020f0 → #6d14ff → #9b1bff)
  - Dark Background: #0b0b0e
- ✅ **Responsive Design** - Mobile, Tablet, Desktop
- ✅ **Framer Motion Animations** - Smooth scroll animations
- ✅ **TailwindCSS** with custom theme
- ✅ **shadcn/ui Components** - Modern UI components
- ✅ **RTL/LTR Support** - Automatic direction switching
- ✅ **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- ✅ **Static JSON Data** - No backend required

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Internationalization**: next-intl
- **Theme**: next-themes

## 🚀 Getting Started

### Installation

1. **Install Dependencies**:
```bash
npm install
```

2. **Run Development Server**:
```bash
npm run dev
```

3. **Open Browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
zynk-digital-agency/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Root layout with theme & i18n
│   │   ├── page.tsx             # Homepage
│   │   ├── services/            # Services pages
│   │   ├── projects/            # Portfolio pages
│   │   ├── about/               # About page
│   │   ├── blog/                # Blog pages
│   │   └── contact/             # Contact page
│   └── globals.css              # Global styles
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── navbar.tsx               # Navigation bar
│   ├── footer.tsx               # Footer
│   ├── theme-provider.tsx       # Theme context
│   ├── theme-toggle.tsx         # Dark/Light toggle
│   └── language-switcher.tsx    # Language switcher
├── locales/
│   ├── en/
│   │   └── common.json          # English translations
│   └── ar/
│       └── common.json          # Arabic translations
├── lib/
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
├── data/                        # JSON data files
├── i18n.ts                      # i18n configuration
├── middleware.ts                # Next.js middleware for i18n
├── tailwind.config.ts           # Tailwind configuration
└── next.config.js               # Next.js configuration
```

## 🌍 Localization

The website supports both English and Arabic with automatic RTL/LTR switching.

- **English**: `/en/*`
- **Arabic**: `/ar/*`

Translation files are located in `/locales/{locale}/common.json`.

## 🎨 Color System

### Primary Color
- **#f2ff58** - Used for buttons, accents, icons highlights

### Secondary Neon Gradient
- **#a020f0** → **#6d14ff** → **#9b1bff**

### Dark Mode
- Background: **#0b0b0e**
- Card Background: **#15151a**
- Lighter: **#1a1a1f**

### Light Mode
- Clean white background
- Primary color stays: **#f2ff58**
- Soft purple shadows

## 📄 Pages

1. **Homepage** (`/`)
   - Hero section with animated headline
   - Services preview
   - Portfolio preview
   - Stats section
   - CTA section

2. **Services** (`/services`)
   - Service grid
   - Dynamic service pages (`/services/[slug]`)

3. **Portfolio** (`/projects`)
   - Project grid with filters
   - Dynamic project pages (`/projects/[slug]`)

4. **About** (`/about`)
   - Mission & Vision
   - Team section
   - Timeline
   - Stats

5. **Blog** (`/blog`)
   - Blog list with pagination
   - Dynamic blog posts (`/blog/[slug]`)

6. **Contact** (`/contact`)
   - Contact form
   - Map
   - Contact information

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Netlify
```bash
npm run build
# Deploy the .next folder
```

### cPanel / VPS
```bash
npm run build
npm run start
```

## 🔧 Configuration

### Theme Customization
Edit `tailwind.config.ts` to customize colors, spacing, and other design tokens.

### Adding Translations
Add new translation keys to `/locales/{locale}/common.json`.

### Adding Pages
Create new pages in `/app/[locale]/your-page/page.tsx`.

## 📝 License

This project is proprietary and confidential.

## 🤝 Support

For support, email info@zynk.agency or visit our website.

---

Built with ❤️ by ZYNK Digital Agency
