
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"; // Assuming you have this Button component

declare global {
  interface Window {
    _hsp: any[];
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsentAccepted');

    if (hasConsented === 'true') {
      // User previously accepted, enable analytics
      if (window.gtag) {
        window.gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
        console.log('Google Analytics: Consent restored from localStorage');
      }
    } else if (hasConsented === 'false') {
      // User previously declined, keep analytics disabled
      if (window.gtag) {
        window.gtag('consent', 'update', {
          'analytics_storage': 'denied',
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        });
        console.log('Google Analytics: Consent denied from localStorage');
      }
    } else {
      // First time visitor, show banner
      setShowBanner(true);
    }

    // Initialize HubSpot's _hsp array if it doesn't exist
    window._hsp = window._hsp || [];

    // Optional: Add listeners for debugging, if desired
    window._hsp.push(['onReady', () => {
      console.log('HubSpot core script is ready for consent communication.');
    }]);

  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsentAccepted', 'true');
    setShowBanner(false);

    // Enable Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
      console.log('Google Analytics: Consent granted');
    }

    // Communicate consent to HubSpot
    if (window._hsp) {
      window._hsp.push(['setPrivacyConsent', {
        necessary: true,
        marketing: true, // Assuming you want to enable marketing cookies on "Accept All"
        preferences: true,
        statistics: true
      }]);
      console.log('HubSpot: Consent accepted and communicated.');
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsentAccepted', 'false');
    setShowBanner(false);

    // Disable Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
      console.log('Google Analytics: Consent denied');
    }

    // Communicate declined consent to HubSpot
    if (window._hsp) {
      window._hsp.push(['setPrivacyConsent', {
        necessary: true, // Necessary cookies are often still allowed
        marketing: false,
        preferences: false,
        statistics: false
      }]);
      console.log('HubSpot: Consent declined and communicated.');
    }
  };

  const handleCookieSettings = () => {
    // For now, this will trigger the HubSpot banner if it ever works,
    // or you can add a modal here for granular settings later.
    if (window._hsp) {
      window._hsp.push(['showBanner']);
      console.log('HubSpot: Attempting to show native settings banner.');
    }
    // Alternatively, you could open a custom modal for settings here
    // alert('Custom cookie settings would open here.');
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cookie Consent</h3>
            <p className="text-gray-600">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="border-gray-300 hover:bg-gray-100"
            >
              Decline
            </Button>
            
            <Button
              onClick={handleAcceptAll}
              className="bg-[#EA3E3A] hover:bg-[#F4A42C] text-white"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
