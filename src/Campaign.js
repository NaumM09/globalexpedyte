import React, { useState } from 'react';
import "./campaign.css";

const GlobalExpedyte = ({ onNavigate }) => {
  const [currentEffect] = useState('carved'); // Fixed to carved effect

  // All URLs centralized in JavaScript
  const assets = {
    logoImage: 'https://i.ibb.co/20hhhH7w/GE.png',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'
  };

  // Handle navigation to designs page
  const handleNavigation = () => {
    console.log('Navigating to designs page');
    if (onNavigate) {
      onNavigate();
    }
  };

  // Load Google Fonts
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = assets.googleFontsUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [assets.googleFontsUrl]);

  const styles = {
    container: {
      fontFamily: "'Inter', sans-serif",
      background: '#ffffff',
      width: '100vw',
      height: '100vh',
      padding: 0,
      margin: 0,
      color: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    },
    
    imageContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
      margin: 0,
      borderRadius: 0,
      overflow: 'hidden',
      background: `
        radial-gradient(circle at 20% 30%, #f5f5f5 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, #e8e8e8 0%, transparent 50%),
        linear-gradient(135deg, #ffffff 0%, #f8f8f8 50%, #f0f0f0 100%)
      `,
      boxShadow: 'none'
    },
    
    // Scattered keyboard keys - adapted for white background
    keyboardKey: {
      position: 'absolute',
      width: '60px',
      height: '60px',
      background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#888',
      fontSize: '20px',
      fontWeight: '600',
      boxShadow: `
        0 4px 8px rgba(0,0,0,0.3),
        inset 0 1px 0 rgba(255,255,255,0.1),
        inset 0 -1px 0 rgba(0,0,0,0.2)
      `,
      transform: 'perspective(100px) rotateX(15deg)',
      zIndex: 5
    },
    
    // Main text container
    textContainer: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      width: '90%',
      maxWidth: '1200px',
      zIndex: 10
    },
    
    // Brand name styles
    brandName: {
      marginBottom: '1rem',
      textTransform: 'lowercase'
    },
    
    brandGlobal: {
      fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
      fontWeight: '400',
      color: '#666',
      letterSpacing: '0.1em',
      display: 'block'
    },
    
    brandExpedyte: {
      fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)',
      fontWeight: '600',
      color: '#333',
      letterSpacing: '0.05em',
      display: 'block',
      marginTop: '-0.2em'
    },
    
    // Different text effects
    mainText: {
      fontSize: 'clamp(3rem, 8vw, 8rem)',
      fontWeight: '900',
      lineHeight: '0.85',
      marginBottom: '2rem',
      letterSpacing: '-0.04em'
    },
    
    subText: {
      fontSize: 'clamp(1.2rem, 3vw, 2.5rem)',
      fontWeight: '700',
      lineHeight: '1.2',
      marginBottom: '0.5rem'
    },
    
    // Carved effect - adapted for white background
    carvedText: {
      color: '#333333',
      textShadow: `
        inset 0 3px 6px rgba(0,0,0,0.4),
        0 2px 0 rgba(255,255,255,0.9),
        0 4px 4px rgba(0,0,0,0.3),
        0 0 0 2px rgba(0,0,0,0.1)
      `,
      filter: 'brightness(0.8) contrast(1.2)'
    },
    
    // Navigation button styles
    navButtonContainer: {
      position: 'absolute',
      bottom: '40px',
      right: '40px',
      zIndex: 20
    },
    
    navButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '16px',
      color: '#1a1a1a',
      fontSize: '18px',
      fontWeight: 600,
      cursor: 'pointer',
      padding: '16px 24px',
      borderRadius: '16px',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(0, 0, 0, 0.1)',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
    },
    
    navLogo: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'rgba(0, 0, 0, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#666',
      transition: 'all 0.3s ease'
    },
    
    navText: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em'
    },
    
    navArrow: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'transform 0.3s ease'
    },
    
    navLine: {
      width: '24px',
      height: '3px',
      background: 'linear-gradient(90deg, #333 0%, #666 100%)',
      borderRadius: '2px'
    },
    
    arrowIcon: {
      fontSize: '20px',
      fontWeight: 'bold',
      transition: 'transform 0.3s ease'
    }
  };

  // State for hover effects
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const getTextStyle = (effect) => {
    const baseStyle = { ...styles.mainText };
    switch(effect) {
      case 'carved': return { ...baseStyle, ...styles.carvedText };
      default: return baseStyle;
    }
  };
// eslint-disable-next-line
  const getSubTextStyle = (effect) => {
    const baseStyle = { ...styles.subText };
    switch(effect) {
      case 'carved': return { ...baseStyle, ...styles.carvedText, fontSize: 'clamp(1.2rem, 3vw, 2.5rem)' };
      default: return baseStyle;
    }
  };

  // Keyboard key positions - adjusted for full screen
  const keyPositions = [
    { char: '*', top: '8%', left: '12%', rotation: '-15deg' },
    { char: 'J', top: '12%', right: '15%', rotation: '10deg' },
    { char: 'G', top: '20%', right: '8%', rotation: '-5deg' },
    { char: 'S', bottom: '25%', left: '8%', rotation: '20deg' },
    { char: 'Q', bottom: '15%', right: '12%', rotation: '-10deg' },
    { char: '9', top: '25%', left: '5%', rotation: '15deg' },
    { char: '→', bottom: '30%', left: '6%', rotation: '5deg' },
    { char: 'F9', bottom: '8%', right: '5%', rotation: '-20deg' }
  ];

  return (
    <div style={styles.container}>
      {/* Main Image Container */}
      <div style={styles.imageContainer}>
        {/* Scattered Keyboard Keys */}
        {keyPositions.map((key, index) => (
          <div
            key={index}
            style={{
              ...styles.keyboardKey,
              top: key.top,
              left: key.left,
              right: key.right,
              bottom: key.bottom,
              transform: `${styles.keyboardKey.transform} rotate(${key.rotation})`
            }}
          >
            {key.char}
          </div>
        ))}

        {/* Main Text Content */}
        <div style={styles.textContainer}>
          <div style={styles.brandName}>
            <span style={styles.brandGlobal}>global</span>
            <span style={styles.brandExpedyte}>expedyte.</span>
          </div>
          
          <h1 style={getTextStyle(currentEffect)}>
            For Brands That<br />
            Want to<br />
            Be Stalked -<br />
            Not Skipped.
          </h1>
        
        </div>

        {/* Surface texture overlay for realism */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 30% 40%, rgba(0,0,0,0.02) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(0,0,0,0.03) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          mixBlendMode: 'overlay'
        }} />

        {/* Navigation Button */}
        <div style={styles.navButtonContainer}>
          <div 
            style={{
              ...styles.navButton,
              ...(isButtonHovered ? {
                transform: 'translateY(-3px)',
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)'
              } : {})
            }}
            onClick={handleNavigation}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <div 
              style={{
                ...styles.navLogo,
                ...(isButtonHovered ? {
                  transform: 'scale(1.1)',
                  background: 'rgba(0, 0, 0, 0.12)'
                } : {})
              }}
            >
              <img 
                src={assets.logoImage}
                alt="Global Expedyte Logo" 
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <span style={styles.navText}>View Designs</span>
            <div 
              style={{
                ...styles.navArrow,
                ...(isButtonHovered ? { transform: 'translateX(6px)' } : {})
              }}
            >
              <div style={styles.navLine}></div>
              <span 
                style={{
                  ...styles.arrowIcon,
                  ...(isButtonHovered ? { transform: 'translateX(3px) scale(1.1)' } : {})
                }}
              >
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalExpedyte;