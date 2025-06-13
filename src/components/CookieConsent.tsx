import { useEffect } from 'react';

declare global {
  interface Window {
    _hsp: any[];
  }
}

export const CookieConsent = () => {
  useEffect(() => {
    // This useEffect is mainly for initial setup/listeners if needed.
    // The main HubSpot script (loaded in index.html) will handle
    // showing the banner on page load based on portal settings.
    const _hsp = window._hsp = window._hsp || [];

    // Optional: Add listeners for debugging, if desired
    _hsp.push(['onBannerShown', () => {
      console.log('HubSpot banner was successfully shown!');
    }]);
    _hsp.push(['onBannerHidden', () => {
      console.log('HubSpot banner was hidden.');
    }]);
    _hsp.push(['onReady', () => {
        console.log('HubSpot core script is ready.');
    }]);

  }, []);

  const handleClick = () => {
    console.log('Cookie Settings button clicked. Attempting to show HubSpot banner...');
    const _hsp = window._hsp = window._hsp || [];
    _hsp.push(['showBanner']); // This command tells HubSpot to display the banner
  };

  return (
    <button
      type="button"
      id="hs_show_banner_button"
      style={{
        backgroundColor: '#f49040',
        border: '1px solid #f49040',
        borderRadius: '3px',
        padding: '10px 16px',
        textDecoration: 'none',
        color: '#fff',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'normal',
        lineHeight: 'inherit',
        textAlign: 'left',
        textShadow: 'none',
        cursor: 'pointer',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}
      onClick={handleClick}
    >
      Cookie Settings
    </button>
  );
};