// Analytics tracking utility
// Google Analytics 4 integration

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 Measurement ID

// Initialize Google Analytics
export function initAnalytics() {
  if (typeof window === 'undefined') return;
  
  // Create dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer?.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);
}

// Track custom events
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', eventName, params);
  
  // Also log to console in development
  if (import.meta.env.DEV) {
    console.log('📊 Analytics Event:', eventName, params);
  }
}

// Predefined tracking functions for common actions
export const analytics = {
  // CTA clicks
  clickCTA: (location: string, buttonText: string) => {
    trackEvent('cta_click', {
      location,
      button_text: buttonText,
    });
  },

  // Navigation
  navigateSection: (sectionName: string) => {
    trackEvent('section_navigation', {
      section: sectionName,
    });
  },

  // Demo interactions
  openDemo: (source: string) => {
    trackEvent('demo_opened', {
      source,
    });
  },

  // Form interactions
  startTour: () => {
    trackEvent('tour_started');
  },

  completeTour: () => {
    trackEvent('tour_completed');
  },

  // External links
  clickWhatsApp: () => {
    trackEvent('whatsapp_click');
  },

  clickSocial: (platform: string) => {
    trackEvent('social_click', {
      platform,
    });
  },

  // Engagement
  viewTestimonials: () => {
    trackEvent('testimonials_viewed');
  },

  expandFAQ: (question: string) => {
    trackEvent('faq_expanded', {
      question,
    });
  },
};
