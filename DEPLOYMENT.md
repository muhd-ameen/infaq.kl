# Infaq - Masjid Ul Huda Deployment Guide

## 🚀 Cloudflare Pages Deployment

### Build Configuration
- **Build Command**: `npm run build`
- **Build Output Directory**: `/dist`
- **Node.js Version**: 18.x or higher

### Environment Variables
No environment variables required for this static build.

### Custom Domain Setup
1. Point your domain to Cloudflare Pages
2. Update the `og:url` meta tags in all HTML files to match your domain
3. Update the `whatsappLink` in `src/config.ts` with your actual WhatsApp group link

## 📱 QR Code Setup

### For QR Stands
- **Primary QR URL**: `https://yourdomain.com/scan`
- **Backup URL**: `https://yourdomain.com/index.html`

The `/scan` page provides a smooth loading experience with auto-redirect to the main app.

## 🔧 Post-Deployment Checklist

### 1. Razorpay Configuration
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

### 2. WhatsApp Integration
Update the WhatsApp group link in `src/config.ts`:
```typescript
settings: {
  whatsappLink: "https://chat.whatsapp.com/YOUR_ACTUAL_LINK"
}
```

### 3. Testing Checklist
- [ ] Test QR scan flow on 4G, 3G, and Wi-Fi
- [ ] Verify Malayalam translation on Android and iPhone
- [ ] Test donation flow with small amounts
- [ ] Check all pages load under 3 seconds
- [ ] Verify favicon displays correctly
- [ ] Test 404 page functionality

### 4. Performance Verification
- [ ] Lighthouse Performance Score ≥ 95 (Mobile)
- [ ] All pages load under 3 seconds
- [ ] Fonts render properly on all devices
- [ ] Icons display correctly

## 📊 Performance Metrics
- **Bundle Size**: 14.25 kB JS, 17.75 kB CSS
- **Gzip Size**: 4.08 kB JS, 3.93 kB CSS
- **Load Time Target**: < 3 seconds from QR scan to language screen

## 🎯 Launch Strategy
1. Deploy to Cloudflare Pages
2. Test with 2-3 local community members
3. Print high-quality QR stands
4. Monitor donation flow and user feedback
5. Iterate based on real-world usage

## 📞 Support
For technical issues, check the browser console and network tab for errors.
All functionality is client-side, so no backend monitoring is required.
