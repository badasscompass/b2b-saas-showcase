// ... existing imports ...

export const CookieConsent = () => {
    // ... existing useState and useEffect ...
  
    const handleAcceptAll = () => {
      localStorage.setItem('cookieConsentAccepted', 'true');
      setShowBanner(false);
  
      // Communicate consent to HubSpot
      if (window._hsp) {
        window._hsp.push(['setPrivacyConsent', {
          necessary: true,
          marketing: true,
          preferences: true,
          statistics: true
        }]);
        console.log('HubSpot: Consent accepted and communicated.');
      }
    };
  
    const handleDecline = () => {
      localStorage.setItem('cookieConsentAccepted', 'false');
      setShowBanner(false);
  
      // Communicate declined consent to HubSpot
      if (window._hsp) {
        window._hsp.push(['setPrivacyConsent', {
          necessary: true,
          marketing: false,
          preferences: false,
          statistics: false
        }]);
        console.log('HubSpot: Consent declined and communicated.');
      }
    };
  
    // Removed handleCookieSettings as the button will be removed
  
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
              {/* Removed the Cookie Settings Button */}
              {/* 
              <Button
                variant="outline"
                onClick={handleCookieSettings} // This function is also no longer needed
                className="border-gray-300 hover:bg-gray-100"
              >
                Cookie Settings
              </Button>
              */}
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