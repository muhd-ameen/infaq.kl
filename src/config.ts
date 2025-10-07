// Configuration for Infaq - Masjid Ul Huda Donation App

export const config = {
  paymentPages: {
    zakat:      { public: "https://rzp.io/rzp/qdVdj6G",      anonymous: "https://rzp.io/rzp/qdVdj6G" },
    fidyah:     { public: "https://rzp.io/rzp/qdVdj6G",      anonymous: "https://rzp.io/rzp/qdVdj6G" },
    kaffarah:   { public: "https://rzp.io/rzp/qdVdj6G",      anonymous: "https://rzp.io/rzp/qdVdj6G" },
    sadaqah:    { public: "https://rzp.io/rzp/qdVdj6G",      anonymous: "https://rzp.io/rzp/qdVdj6G" },
    masjidFund: { public: "https://rzp.io/rzp/qdVdj6G",      anonymous: "https://rzp.io/rzp/qdVdj6G" }
  },
  quickPay: {
    link: "https://rzp.io/rzp/qdVdj6G" // Zakat payment page URL
  },
  settings: {
    fidyahRate: 120, // INR per day (editable)
    whatsappLink: "https://chat.whatsapp.com/PASTE_LINK"
  }
} as const;

// Utility function to get Razorpay URL based on category and anonymity
export function getRazorpayUrl(category: string, isAnonymous: boolean): string {
  const categoryKey = category as keyof typeof config.paymentPages;
  const categoryUrls = config.paymentPages[categoryKey];
  
  if (!categoryUrls) {
    console.error(`Unknown category: ${category}`);
    return config.paymentPages.masjidFund.public; // Fallback
  }
  
  return isAnonymous ? categoryUrls.anonymous : categoryUrls.public;
}

// Utility function to calculate Fidyah amount
export function calculateFidyahAmount(days: number): number {
  return days * config.settings.fidyahRate;
}
