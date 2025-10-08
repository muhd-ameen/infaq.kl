// Infaq - Masjid Ul Huda Icons
// Beautiful, lightweight SVG icons for donation categories

export const IconZakat = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
</svg>`;

export const IconFidyah = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  <path d="M8 12h8M8 16h8"/>
</svg>`;

export const IconKaffarah = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 3v18h18"/>
  <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
  <circle cx="12" cy="12" r="3"/>
</svg>`;

export const IconSadaqah = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/>
  <path d="M12 5l3 3-3 3-3-3z"/>
</svg>`;

export const IconInterest = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"/>
</svg>`;

export const IconMasjid = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 21h18"/>
  <path d="M5 21V7l8-4v18"/>
  <path d="M19 21V11l-6-4"/>
  <path d="M9 9v.01"/>
  <path d="M9 12v.01"/>
  <path d="M9 15v.01"/>
  <path d="M9 18v.01"/>
</svg>`;

// Icon mapping for dynamic injection
export const iconMap = {
  zakat: IconZakat,
  fidyah: IconFidyah,
  kaffarah: IconKaffarah,
  sadaqah: IconSadaqah,
  interest: IconInterest,
  masjid: IconMasjid,
  masjid_fund: IconMasjid
} as const;

// Function to inject icons into elements with data-icon attribute
export function injectIcons() {
  const iconElements = document.querySelectorAll('[data-icon]');
  iconElements.forEach(element => {
    const iconName = element.getAttribute('data-icon');
    if (iconName && iconMap[iconName as keyof typeof iconMap]) {
      element.innerHTML = iconMap[iconName as keyof typeof iconMap];
    }
  });
}
