import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showCookieAnimation, setShowCookieAnimation] = useState(false);

  useEffect(() => {
    console.log('useEffect running!');
    
    // For testing - always clear and show
    localStorage.removeItem('cookiesAccepted');
    console.log('localStorage cleared');
    
    // Set visible immediately for testing
    console.log('Setting visible to true');
    setIsVisible(true);
    
  }, []); // Empty dependency array

  const handleAccept = () => {
    console.log('Cookies accepted');
    setShowCookieAnimation(true);
    localStorage.setItem('cookiesAccepted', 'true');
    
    // Show cookie animation for 2 seconds, then close
    setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }, 2000);
  };

  const handleDecline = () => {
    console.log('Cookies declined');
    setIsClosing(true);
    localStorage.setItem('cookiesAccepted', 'false');
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  console.log('CookieConsent render - isVisible:', isVisible, 'isClosing:', isClosing);

  if (!isVisible) {
    console.log('Component not visible, returning null');
    return null;
  }

  console.log('Rendering cookie consent popup');

  return (
    <div className={`cookie-consent-container ${isClosing ? 'closing' : ''}`}>
      <div className="cookie-consent-popup">
        {showCookieAnimation && (
          <div className="cookie-animation-overlay">
            <div className="animated-cookie">🍪</div>
            <div className="thank-you-text">Thanks! Cookies accepted</div>
            <div className="cookie-crumbs crumb-1">🍪</div>
            <div className="cookie-crumbs crumb-2">🍪</div>
            <div className="cookie-crumbs crumb-3">🍪</div>
            <div className="cookie-crumbs crumb-4">🍪</div>
          </div>
        )}
        
        <button className="cookie-close" onClick={handleDecline}>
          ×
        </button>
        
        <div className="cookie-content">
          <div className="cookie-main-content">
            <div className="cookie-header">
              <div className="cookie-icon">
                🍪
              </div>
              <h3 className="cookie-title">
                We Use Biscuits (Cookies)
              </h3>
            </div>
            
            <p className="cookie-description">
              We use biscuits to enhance your browsing experience, analyse site traffic, and personalise content. 
              By clicking "Accept All Biscuits", you consent to our use of biscuits. 
              <a href="#" className="cookie-link"> Learn more</a>
            </p>
          </div>
          
          <div className="cookie-buttons">
            <button className="cookie-accept" onClick={handleAccept}>
              Accept All Biscuits
            </button>
            <button className="cookie-decline" onClick={handleDecline}>
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;