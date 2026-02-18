
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    _hsp: any[];
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const grantConsent = () => {
  if (window.gtag) {
    window.gtag('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted'
    });
  }
  // Enable HubSpot tracking
  if (window._hsp) {
    window._hsp.push(['setPrivacyConsent', {
      necessary: true,
      marketing: true,
      preferences: true,
      statistics: true
    }]);
  }
};

const denyConsent = () => {
  if (window.gtag) {
    window.gtag('consent', 'update', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied'
    });
  }
  if (window._hsp) {
    window._hsp.push(['setPrivacyConsent', {
      necessary: true,
      marketing: false,
      preferences: false,
      statistics: false
    }]);
  }
};

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Initialize HubSpot _hsp queue
    window._hsp = window._hsp || [];

    const hasConsented = localStorage.getItem('cookieConsentAccepted');

    if (hasConsented === 'true') {
      grantConsent();
    } else if (hasConsented === 'false') {
      denyConsent();
    } else {
      // First-time visitor: show banner
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsentAccepted', 'true');
    setShowBanner(false);
    grantConsent();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsentAccepted', 'false');
    setShowBanner(false);
    denyConsent();
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-manrope">Cookie Consent</h3>
            <p className="text-gray-600 font-manrope text-sm">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
              By clicking "Accept All", you consent to our use of cookies.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="border-gray-300 hover:bg-gray-100 font-manrope"
            >
              Decline
            </Button>
            <Button
              onClick={handleAcceptAll}
              className="bg-[#EA3E3A] hover:bg-[#F4A42C] text-white font-manrope"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
