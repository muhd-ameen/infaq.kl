// Import Tailwind CSS
import '/styles/tailwind.css';

// Import config and icons
import { getRazorpayUrl, calculateFidyahAmount, config } from './config.js';
import { injectIcons } from './icons/index.js';

// Global state management
interface AppState {
  currentLanguage: 'en' | 'ml';
  currentDonationType: string | null;
  donationAmount: number | null;
  isAnonymous: boolean;
  fidyahDays: number | null;
  mobileNumber: string | null;
}

const state: AppState = {
  currentLanguage: 'en',
  currentDonationType: null,
  donationAmount: null,
  isAnonymous: false,
  fidyahDays: null,
  mobileNumber: null
};

// Translation data
let translations: Record<string, any> = {};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

async function initializeApp() {
  // Check if language is set, redirect to index if not
  const savedLanguage = sessionStorage.getItem('lang') as 'en' | 'ml';
  if (!savedLanguage && getCurrentPage() !== 'index') {
    window.location.href = '/index.html';
    return;
  }
  
  if (savedLanguage) {
    state.currentLanguage = savedLanguage;
  }
  
  // Load translations
  await loadTranslations();
  
  // Apply current language
  applyLanguage(state.currentLanguage);
  
  // Set up event listeners
  setupEventListeners();
  
  // Handle page-specific initialization
  handlePageInitialization();
}

async function loadTranslations() {
  try {
    const enResponse = await fetch('/src/i18n/en.json');
    const mlResponse = await fetch('/src/i18n/ml.json');
    
    const enTranslations = await enResponse.json();
    const mlTranslations = await mlResponse.json();
    
    translations = {
      en: enTranslations,
      ml: mlTranslations
    };
  } catch (error) {
    console.error('Failed to load translations:', error);
  }
}

function applyLanguage(language: 'en' | 'ml') {
  state.currentLanguage = language;
  
  // Update document language
  document.documentElement.lang = language === 'ml' ? 'ml' : 'en';
  
  // Apply font family based on language
  if (language === 'ml') {
    document.body.classList.add('font-malayalam');
  } else {
    document.body.classList.remove('font-malayalam');
  }
  
  // Update all elements with data-i18n attributes
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (key && translations[language]) {
      const translation = getNestedTranslation(translations[language], key);
      if (translation) {
        element.textContent = translation;
      }
    }
  });
  
  // Update language button text
  const languageButtons = document.querySelectorAll('[data-i18n="nav.language"]');
  languageButtons.forEach(button => {
    button.textContent = language === 'ml' ? 'മല' : 'EN';
  });
}

function getNestedTranslation(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || '';
}

// Helper functions
function getLang(): 'en' | 'ml' {
  return state.currentLanguage;
}

function t(key: string): string {
  return getNestedTranslation(translations[state.currentLanguage], key);
}

function setText(element: HTMLElement, key: string): void {
  const translation = t(key);
  if (translation) {
    element.textContent = translation;
  }
}

// Simple validators
function validateAmount(amount: number): boolean {
  return Boolean(amount && amount >= 1);
}

function validateMobile(mobile: string): boolean {
  return /^\d{10}$/.test(mobile);
}

// Make functions available globally
(window as any).getLang = getLang;
(window as any).t = t;
(window as any).setText = setText;
(window as any).validateAmount = validateAmount;
(window as any).validateMobile = validateMobile;

function setupEventListeners() {
  // Amount input validation
  const amountInput = document.getElementById('amount-input') as HTMLInputElement;
  const continueButton = document.getElementById('continue-button') as HTMLButtonElement;
  
  if (amountInput && continueButton) {
    amountInput.addEventListener('input', () => {
      const amount = parseFloat(amountInput.value);
      state.donationAmount = amount;
      validateForm();
    });
  }
  
  // Fidyah days input
  const fidyahDaysInput = document.getElementById('fidyah-days-input') as HTMLInputElement;
  if (fidyahDaysInput) {
    fidyahDaysInput.addEventListener('input', () => {
      const days = parseInt(fidyahDaysInput.value);
      state.fidyahDays = days;
      
      if (days && days >= 1) {
        const calculatedAmount = calculateFidyahAmount(days);
        const calculatedElement = document.getElementById('fidyah-calculated-amount');
        if (calculatedElement) {
          calculatedElement.classList.remove('hidden');
          calculatedElement.textContent = `Calculated amount: ₹${calculatedAmount.toLocaleString()}`;
        }
        
        // Auto-fill amount input
        const amountInput = document.getElementById('amount-input') as HTMLInputElement;
        if (amountInput) {
          amountInput.value = calculatedAmount.toString();
          state.donationAmount = calculatedAmount;
          validateForm();
        }
      } else {
        const calculatedElement = document.getElementById('fidyah-calculated-amount');
        if (calculatedElement) {
          calculatedElement.classList.add('hidden');
        }
      }
    });
  }
  
  // Anonymous toggle
  const anonymousToggle = document.getElementById('anonymous-toggle') as HTMLInputElement;
  if (anonymousToggle) {
    anonymousToggle.addEventListener('change', () => {
      state.isAnonymous = anonymousToggle.checked;
      toggleMobileSection();
    });
  }
  
  // Mobile input
  const mobileInput = document.getElementById('mobile-input') as HTMLInputElement;
  if (mobileInput) {
    mobileInput.addEventListener('input', () => {
      state.mobileNumber = mobileInput.value;
    });
  }
}

function validateForm() {
  const continueButton = document.getElementById('continue-button') as HTMLButtonElement;
  if (!continueButton) return;
  
  const isValid = validateAmount(state.donationAmount || 0);
  
  if (isValid) {
    continueButton.disabled = false;
    continueButton.classList.remove('bg-gray-300', 'cursor-not-allowed');
    continueButton.classList.add('bg-primary-600', 'hover:bg-primary-700');
  } else {
    continueButton.disabled = true;
    continueButton.classList.add('bg-gray-300', 'cursor-not-allowed');
    continueButton.classList.remove('bg-primary-600', 'hover:bg-primary-700');
  }
}

function toggleMobileSection() {
  const mobileSection = document.getElementById('mobile-section');
  if (mobileSection) {
    if (state.isAnonymous) {
      mobileSection.style.display = 'none';
    } else {
      mobileSection.style.display = 'block';
    }
  }
}

function handlePageInitialization() {
  const currentPage = getCurrentPage();
  
  // Inject icons on all pages
  injectIcons();
  
  switch (currentPage) {
    case 'give':
      initializeGivePage();
      break;
    case 'info':
      initializeInfoPage();
      break;
    case 'success':
      initializeSuccessPage();
      break;
  }
}

function getCurrentPage(): string {
  const path = window.location.pathname;
  if (path.includes('home.html')) return 'home';
  if (path.includes('give.html')) return 'give';
  if (path.includes('info.html')) return 'info';
  if (path.includes('success.html')) return 'success';
  return 'index';
}

function initializeGivePage() {
  // Get donation type from URL params or session storage
  const urlParams = new URLSearchParams(window.location.search);
  const donationType = urlParams.get('type') || sessionStorage.getItem('donationType');
  
  if (donationType) {
    state.currentDonationType = donationType;
    updateDonationTypeDisplay(donationType);
    
    // Update category chip
    const categoryChip = document.getElementById('category-chip');
    if (categoryChip) {
      const categoryName = translations[state.currentLanguage]?.donation?.[donationType]?.title || donationType;
      categoryChip.textContent = categoryName;
    }
    
    // Show Fidyah calculator if it's Fidyah
    if (donationType === 'fidyah') {
      const fidyahCalculator = document.getElementById('fidyah-calculator');
      if (fidyahCalculator) {
        fidyahCalculator.classList.remove('hidden');
      }
    }
  }
  
  // Initialize mobile section visibility
  toggleMobileSection();
}

function updateDonationTypeDisplay(type: string) {
  const iconElement = document.getElementById('donation-icon');
  const titleElement = document.getElementById('donation-title');
  const descriptionElement = document.getElementById('donation-description');
  
  if (!iconElement || !titleElement || !descriptionElement) return;
  
  const typeConfig = {
    zakat: {
      icon: `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
      </svg>`,
      bgColor: 'bg-primary-600'
    },
    fidyah: {
      icon: `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </svg>`,
      bgColor: 'bg-green-600'
    },
    kaffarah: {
      icon: `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>`,
      bgColor: 'bg-gold-600'
    },
    sadaqah: {
      icon: `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </svg>`,
      bgColor: 'bg-purple-600'
    },
    masjid_fund: {
      icon: `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
      </svg>`,
      bgColor: 'bg-blue-600'
    }
  };
  
  const config = typeConfig[type as keyof typeof typeConfig];
  if (config) {
    iconElement.className = `w-16 h-16 ${config.bgColor} rounded-full mx-auto mb-4 flex items-center justify-center`;
    iconElement.innerHTML = config.icon;
    
    titleElement.textContent = translations[state.currentLanguage]?.donation?.[type]?.title || type;
    descriptionElement.textContent = translations[state.currentLanguage]?.donation?.[type]?.description || '';
  }
}

function initializeInfoPage() {
  // Get category from URL params or sessionStorage
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('c') || urlParams.get('category') || sessionStorage.getItem('donationType');
  
  if (category) {
    loadInfoContent(category);
  }
}

function loadInfoContent(category: string) {
  const iconElement = document.getElementById('info-icon');
  const titleElement = document.getElementById('info-title');
  const contentElement = document.getElementById('info-content');
  
  if (!iconElement || !titleElement || !contentElement) return;
  
  const categoryData = translations[state.currentLanguage]?.info?.[category];
  if (!categoryData) return;
  
  // Update icon based on category
  const iconConfig = {
    zakat: { bg: 'bg-primary-600', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' },
    fidyah: { bg: 'bg-green-600', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    kaffarah: { bg: 'bg-gold-600', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    sadaqah: { bg: 'bg-purple-600', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    masjid_fund: { bg: 'bg-blue-600', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' }
  };
  
  const config = iconConfig[category as keyof typeof iconConfig];
  if (config) {
    iconElement.className = `w-16 h-16 ${config.bg} rounded-full mx-auto mb-4 flex items-center justify-center`;
    iconElement.innerHTML = `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${config.icon}"></path></svg>`;
  }
  
  // Update title and content
  titleElement.textContent = categoryData.title;
  contentElement.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center space-x-4">
        <div class="w-12 h-12 ${config?.bg || 'bg-primary-600'} rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${config?.icon || 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'}"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900">${categoryData.title}</h3>
      </div>
      <p class="text-gray-600 text-sm leading-relaxed">${categoryData.body || categoryData.description}</p>
      <div class="text-xs text-primary-600 font-medium">${categoryData.rate}</div>
    </div>
  `;
}

function initializeSuccessPage() {
  // Get donation details from URL params or session storage
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type') || sessionStorage.getItem('donationType');
  const amount = urlParams.get('amount') || sessionStorage.getItem('donationAmount');
  const anonymous = urlParams.get('anonymous') || sessionStorage.getItem('isAnonymous');
  
  // Update display
  const typeElement = document.getElementById('donation-type');
  const amountElement = document.getElementById('donation-amount');
  const anonymousElement = document.getElementById('donation-anonymous');
  
  if (typeElement && type) {
    typeElement.textContent = translations[state.currentLanguage]?.donation?.[type]?.title || type;
  }
  
  if (amountElement && amount) {
    amountElement.textContent = `₹${parseInt(amount).toLocaleString()}`;
  }
  
  if (anonymousElement && anonymous) {
    anonymousElement.textContent = anonymous === 'true' ? 'Yes' : 'No';
  }
}

// Global functions for HTML onclick handlers
declare global {
  function selectLanguage(language: 'en' | 'ml'): void;
  function switchLanguage(): void;
  function goBack(): void;
  function selectDonationType(type: string): void;
  function goToInfo(category?: string): void;
  function goToHome(): void;
  function setAmount(amount: number): void;
  function continueToRazorpay(): void;
  function makeAnotherDonation(): void;
  function joinWhatsApp(): void;
  function shareWhatsApp(): void;
  function shareTelegram(): void;
}

// Language selection
window.selectLanguage = function(language: 'en' | 'ml') {
  state.currentLanguage = language;
  sessionStorage.setItem('lang', language);
  applyLanguage(language);
  
  // Navigate to home page
  window.location.href = '/home.html';
};

window.switchLanguage = function() {
  const newLanguage = state.currentLanguage === 'en' ? 'ml' : 'en';
  state.currentLanguage = newLanguage;
  sessionStorage.setItem('lang', newLanguage);
  applyLanguage(newLanguage);
};

// Navigation functions
window.goBack = function() {
  window.history.back();
};

window.selectDonationType = function(type: string) {
  state.currentDonationType = type;
  sessionStorage.setItem('donationType', type);
  window.location.href = `/give.html?type=${type}`;
};

window.goToInfo = function(category?: string) {
  if (category) {
    window.location.href = `/info.html?category=${category}`;
  } else {
    window.location.href = '/info.html';
  }
};

window.goToHome = function() {
  window.location.href = '/home.html';
};

// Amount functions
window.setAmount = function(amount: number) {
  const amountInput = document.getElementById('amount-input') as HTMLInputElement;
  if (amountInput) {
    amountInput.value = amount.toString();
    amountInput.dispatchEvent(new Event('input'));
  }
};

// Payment functions
window.continueToRazorpay = function() {
  const amount = state.donationAmount;
  if (!amount || amount < 1) return;
  
  // Store donation details
  sessionStorage.setItem('donationAmount', amount.toString());
  sessionStorage.setItem('isAnonymous', state.isAnonymous.toString());
  sessionStorage.setItem('donationType', state.currentDonationType || 'masjid_fund');
  if (state.fidyahDays) {
    sessionStorage.setItem('fidyahDays', state.fidyahDays.toString());
  }
  if (state.mobileNumber) {
    sessionStorage.setItem('mobileNumber', state.mobileNumber);
  }
  
  // Get Razorpay URL based on category and anonymity
  const razorpayUrl = getRazorpayUrl(state.currentDonationType || 'masjid_fund', state.isAnonymous);
  
  // Redirect to Razorpay Payment Page
  window.location.href = razorpayUrl;
};

// Success page functions
window.makeAnotherDonation = function() {
  // Clear previous donation data
  sessionStorage.removeItem('donationType');
  sessionStorage.removeItem('donationAmount');
  sessionStorage.removeItem('isAnonymous');
  sessionStorage.removeItem('fidyahDays');
  sessionStorage.removeItem('mobileNumber');
  
  window.location.href = '/home.html';
};

window.joinWhatsApp = function() {
  window.open(config.settings.whatsappLink, '_blank');
};

window.shareWhatsApp = function() {
  const text = encodeURIComponent('Check out this masjid donation app! Make your charitable contributions easily.');
  const url = encodeURIComponent(window.location.origin);
  window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
};

window.shareTelegram = function() {
  const text = encodeURIComponent('Check out this masjid donation app! Make your charitable contributions easily.');
  const url = encodeURIComponent(window.location.origin);
  window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
};

// Load saved language on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedLanguage = sessionStorage.getItem('lang') as 'en' | 'ml';
  if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ml')) {
    state.currentLanguage = savedLanguage;
  }
});
