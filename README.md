# Infaq - Masjid Ul Huda QR Donation App

A fast, mobile-first QR donation web app for Masjid Ul Huda in Kerala, India. Built with modern web technologies and optimized for instant loading and seamless donation experience.

## 🚀 Features

- **Complete Donation Flow**: Zakat, Fidyah, Kaffarah, Sadaqah, and Masjid Fund
- **Bilingual Support**: English and Malayalam with seamless language switching
- **Mobile-First Design**: Optimized for QR code scanning and mobile devices
- **Beautiful UI**: Modern design with emerald/gold branding and smooth animations
- **Razorpay Integration**: Secure payment processing with Payment Pages
- **QR-Ready**: Dedicated scan.html entry point for QR code stands
- **Performance Optimized**: < 3 second load time target

## 🛠️ Tech Stack

- **Frontend**: Vite + TypeScript + Tailwind CSS
- **Icons**: Custom SVG icons with dynamic injection
- **Internationalization**: JSON-based i18n system
- **Build**: Optimized production builds with HTML minification
- **Deployment**: Cloudflare Pages ready

## 📱 Pages

- **`/`** - Language selector (main entry point)
- **`/scan`** - QR landing page with auto-redirect
- **`/home`** - Donation categories selection
- **`/give`** - Donation form with amount input
- **`/info`** - Category information pages
- **`/success`** - Thank you page with community links
- **`/404`** - Error page with navigation

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

## 📦 Project Structure

```
├── public/                 # Static assets and HTML pages
│   ├── index.html         # Language selector
│   ├── scan.html          # QR landing page
│   ├── home.html          # Donation categories
│   ├── give.html          # Donation form
│   ├── info.html          # Category info
│   ├── success.html       # Thank you page
│   ├── 404.html           # Error page
│   └── logo.png           # Official branding logo
├── src/
│   ├── config.ts          # Razorpay URLs and settings
│   ├── main.ts            # Main application logic
│   ├── icons/             # SVG icon system
│   └── i18n/              # Translation files
│       ├── en.json        # English translations
│       └── ml.json        # Malayalam translations
├── styles/
│   └── tailwind.css       # Tailwind CSS styles
└── dist/                  # Production build output
```

## ⚙️ Configuration

### Razorpay Setup
Update `src/config.ts` with your actual Razorpay Payment Page URLs:

```typescript
paymentPages: {
  zakat: { 
    public: "https://rzp.io/l/YOUR_ZAKAT_PUBLIC_URL", 
    anonymous: "https://rzp.io/l/YOUR_ZAKAT_ANON_URL" 
  },
  // ... other categories
}
```

### WhatsApp Integration
Update the WhatsApp group link in `src/config.ts`:

```typescript
settings: {
  whatsappLink: "https://chat.whatsapp.com/YOUR_ACTUAL_LINK"
}
```

## 🌐 Deployment

### Cloudflare Pages
1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `/dist`
4. Deploy!

### Custom Domain
1. Point your domain to Cloudflare Pages
2. Update `og:url` meta tags in HTML files
3. Update WhatsApp link in config

## 📊 Performance

- **Bundle Size**: 14.25 kB JS, 17.75 kB CSS
- **Gzip Size**: 4.08 kB JS, 3.93 kB CSS
- **Load Time**: < 3 seconds from QR scan to language screen
- **Lighthouse Score**: 95+ (Mobile)

## 🎯 QR Code Setup

### For QR Stands
- **Primary URL**: `https://yourdomain.com/scan`
- **Backup URL**: `https://yourdomain.com/`

The `/scan` page provides a smooth loading experience with auto-redirect to the main app.

## 🧪 Testing Checklist

- [ ] Test QR scan flow on 4G, 3G, and Wi-Fi
- [ ] Verify Malayalam translation on Android and iPhone
- [ ] Test donation flow with small amounts
- [ ] Check all pages load under 3 seconds
- [ ] Verify favicon displays correctly
- [ ] Test 404 page functionality

## 📝 License

This project is developed for Masjid Ul Huda, Kerala. All rights reserved.

## 🤝 Contributing

This is a specialized donation platform for Masjid Ul Huda. For issues or improvements, please contact the development team.

---

**Built with ❤️ for Masjid Ul Huda, Kerala**