# Masjid Donation App

A fast, mobile-first QR donation web app for a local masjid in Kerala. Users can choose between English and Malayalam, learn about different types of Islamic donations (Zakat, Fidyah, Kaffarah), and make donations via Razorpay Payment Pages.

## Features

- 🌐 **Bilingual Support**: English and Malayalam (മലയാളം)
- 📱 **Mobile-First Design**: Optimized for mobile devices with responsive design
- 🕌 **Islamic Donation Types**: Support for Zakat, Fidyah, Kaffarah, and General donations
- 💳 **Razorpay Integration**: Secure payment processing (ready for integration)
- 🎨 **Modern UI**: Built with Tailwind CSS for a beautiful, accessible interface
- ⚡ **Fast Performance**: Built with Vite for optimal loading speeds
- 🔒 **No Backend Required**: Static site deployable on Cloudflare Pages

## Tech Stack

- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Project Structure

```
/public
  ├─ index.html          # Language selection page
  ├─ home.html           # Donation categories
  ├─ give.html           # Amount entry + payment
  ├─ info.html           # Educational content
  ├─ success.html        # Thank you page
  └─ favicon.ico         # App icon

/src
  ├─ main.ts             # Navigation + language switching
  └─ i18n/
     ├─ en.json          # English translations
     └─ ml.json          # Malayalam translations

/styles
  └─ tailwind.css        # Tailwind CSS with custom styles
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Infaq.masjid
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to Cloudflare Pages or any static hosting service.

## Deployment

### Cloudflare Pages

1. Build the project: `npm run build`
2. Upload the `dist` folder to Cloudflare Pages
3. Configure custom domain if needed

### Other Static Hosts

The built `dist` folder can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## Razorpay Integration

To integrate with Razorpay Payment Pages:

1. Sign up for a Razorpay account
2. Get your Payment Page URL
3. Update the `initiatePayment()` function in `src/main.ts`
4. Replace the simulated payment with actual Razorpay integration

Example integration:
```typescript
window.initiatePayment = function() {
  const amount = state.donationAmount;
  if (!amount || amount < 1) return;
  
  // Redirect to Razorpay Payment Page
  const razorpayUrl = `https://rzp.io/l/your-payment-page?amount=${amount * 100}`;
  window.location.href = razorpayUrl;
};
```

## Customization

### Adding New Languages

1. Create a new JSON file in `src/i18n/` (e.g., `ar.json` for Arabic)
2. Add translations following the same structure as existing files
3. Update the language selection logic in `src/main.ts`

### Styling

- Modify `styles/tailwind.css` for custom styles
- Update `tailwind.config.js` for theme customization
- Use Tailwind utility classes in HTML files

### Adding New Donation Types

1. Add the new type to both translation files (`en.json` and `ml.json`)
2. Update the donation type configuration in `src/main.ts`
3. Add the new option to `home.html`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please contact the development team or create an issue in the repository.
