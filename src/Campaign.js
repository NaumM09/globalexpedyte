import React, { useState } from 'react';
import Footer from './Footer';

const GlobalExpedyte = ({ onNavigate, onNavigateToContact }) => {
  // All URLs centralized in JavaScript
  const assets = {
    logoImage: 'https://i.ibb.co/20hhhH7w/GE.png',
    heroImage: 'https://i.ibb.co/tMv7ypHZ/hero-Img-2.png'
  };

  // Handle navigation to designs page
  const handleNavigation = () => {
    console.log('Navigating to designs page');
    if (onNavigate) {
      onNavigate();
    }
  };

  // Handle contact navigation
  const handleContactNavigation = () => {
    console.log('Navigating to contact page');
    if (onNavigateToContact) {
      onNavigateToContact();
    }
  };

  // Load Google Fonts
  React.useEffect(() => {
    const links = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
      'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap',
      'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap'
    ];
    
    links.forEach(href => {
      const link = document.createElement('link');
      link.href = href;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    });

    return () => {
      links.forEach(href => {
        const existingLink = document.querySelector(`link[href="${href}"]`);
        if (existingLink && document.head.contains(existingLink)) {
          document.head.removeChild(existingLink);
        }
      });
    };
  }, []);

  // State for hover effects
  const [hoveredService, setHoveredService] = useState(null);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isPrimaryCTAHovered, setIsPrimaryCTAHovered] = useState(false);
  const [isSecondaryCTAHovered, setIsSecondaryCTAHovered] = useState(false);

  const services = [
    { 
      name: 'Logo Design', 
      desc: 'Memorable marks',
      tag: 'design',
      color: '#ff3333',
    },
    { 
      name: 'Web Magic', 
      desc: 'Digital experiences',
      tag: 'dev',
      color: '#33ccff',
    },
    { 
      name: 'Brand Strategy', 
      desc: 'Strategic thinking',
      tag: 'strategy',
      color: '#00ff88',
    },
    { 
      name: 'Digital Marketing', 
      desc: 'Growth focused',
      tag: 'marketing',
      color: '#ff3333',
    }
  ];

  // Subtle geometric accents
  const geometricAccents = [
    { size: '120px', top: '15%', left: '8%', color: '#ff3333', shape: 'circle' },
    { size: '80px', bottom: '20%', left: '12%', color: '#33ccff', shape: 'square' }
  ];

  return (
    <>
      <style>{`
/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  overflow-x: hidden;
  font-size: 16px;
}

body {
  font-family: 'Inter', sans-serif;
  background: #ffffff;
  color: #000;
}

/* Component-specific styles */
.global-expedyte {
  font-family: 'Inter', sans-serif;
  background: #ffffff;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  color: #000;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
}

/* Header Section */
.ge-header {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 20;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.ge-logo-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ge-logo {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.ge-brand-text {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.02em;
  font-family: 'Space Grotesk', sans-serif;
}

/* Hero Section */
.ge-hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
  min-height: 80vh;
}

/* Left Content */
.ge-left-content {
  position: relative;
  z-index: 15;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  background: linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 70%, rgba(255,255,255,0.85) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  order: 1;
  flex-shrink: 0;
  min-height: 60vh;
}

/* Right Image */
.ge-right-image {
  position: relative;
  width: 100%;
  height: 300px;
  z-index: 5;
  order: 2;
  flex-shrink: 0;
}

.ge-hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
  filter: brightness(0.9) contrast(1.1);
  border-radius: 12px 12px 0 0;
}

.ge-hero-image.hovered {
  transform: scale(1.02);
}

.ge-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.15) 100%);
  z-index: 6;
  border-radius: 12px 12px 0 0;
}

/* Typography */
.ge-eyebrow {
  font-size: 10px;
  font-weight: 600;
  color: #6b7280;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  margin-bottom: 12px;
}

.ge-main-heading {
  font-size: clamp(1.8rem, 8vw, 2.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 16px;
  color: #111827;
  letter-spacing: -0.04em;
  font-family: 'Space Grotesk', sans-serif;
}

.ge-wild-text {
  font-family: 'Crimson Text', serif;
  font-style: italic;
  font-weight: 600;
  position: relative;
}

.ge-masterpieces-text {
  font-weight: 900;
  letter-spacing: -0.06em;
}

.ge-sub-heading {
  font-size: clamp(0.9rem, 4vw, 1rem);
  font-weight: 500;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 24px;
  max-width: 100%;
  font-family: 'Inter', sans-serif;
}

/* Services Container */
.ge-services {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 32px;
  max-width: 100%;
}

.ge-service-card {
  padding: 16px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.ge-service-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.ge-service-icon {
  font-size: 9px;
  font-weight: 600;
  margin-bottom: 6px;
  display: block;
  padding: 3px 6px;
  background: #f3f4f6;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'JetBrains Mono', monospace;
  width: fit-content;
  color: #6b7280;
}

.ge-service-name {
  font-size: 13px;
  font-weight: 700;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.01em;
  color: #111827;
  margin-bottom: 3px;
}

.ge-service-desc {
  font-size: 10px;
  color: #6b7280;
  font-weight: 500;
  line-height: 1.3;
}

/* CTA Container */
.ge-cta-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: stretch;
}

.ge-primary-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  padding: 14px 24px;
  border-radius: 12px;
  background: linear-gradient(135deg, #111827 0%, #374151 100%);
  border: none;
  text-decoration: none;
  transition: all 0.4s ease;
  box-shadow: 0 4px 16px rgba(17, 24, 39, 0.2);
  font-family: 'Space Grotesk', sans-serif;
  position: relative;
  overflow: hidden;
  text-align: center;
  min-height: 44px;
}

.ge-primary-cta:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 24px rgba(17, 24, 39, 0.3);
  background: linear-gradient(135deg, #000000 0%, #1f2937 100%);
}

.ge-secondary-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 12px 20px;
  background: transparent;
  border: none;
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: 'Space Grotesk', sans-serif;
  text-align: center;
  min-height: 44px;
}

.ge-secondary-cta:hover {
  color: #111827;
  transform: translateY(-1px);
}

/* Geometric Accents */
.ge-geometric-accent {
  position: absolute;
  z-index: 8;
  opacity: 0.1;
}

/* Arrow Animation */
.ge-arrow {
  transition: transform 0.3s ease;
}

.ge-arrow.moved {
  transform: translateX(4px);
}

/* Tablet Styles */
@media (min-width: 768px) {
  .ge-header {
    padding: 20px 32px;
  }
  
  .ge-logo {
    width: 36px;
    height: 36px;
  }
  
  .ge-brand-text {
    font-size: 18px;
  }
  
  .ge-hero {
    flex-direction: row;
    min-height: 100vh;
  }
  
  .ge-left-content {
    width: 60%;
    padding: 32px;
    order: 1;
    min-height: auto;
    flex-shrink: 0;
  }
  
  .ge-right-image {
    position: absolute;
    right: 0;
    top: 0;
    width: 50%;
    height: 100%;
    order: 2;
    margin-top: 0;
  }
  
  .ge-hero-image {
    border-radius: 0;
  }
  
  .ge-image-overlay {
    border-radius: 0;
  }
  
  .ge-main-heading {
    font-size: clamp(2.2rem, 5vw, 3.2rem);
    margin-bottom: 20px;
  }
  
  .ge-sub-heading {
    font-size: clamp(1rem, 2vw, 1.1rem);
    margin-bottom: 32px;
  }
  
  .ge-services {
    gap: 14px;
    margin-bottom: 40px;
    max-width: 420px;
  }
  
  .ge-service-card {
    padding: 18px 14px;
  }
  
  .ge-cta-container {
    flex-direction: row;
    gap: 16px;
    align-items: center;
  }
  
  .ge-primary-cta {
    font-size: 15px;
    padding: 15px 28px;
  }
  
  .ge-secondary-cta {
    font-size: 14px;
    padding: 15px 22px;
  }
}

/* Desktop Styles */
@media (min-width: 1024px) {
  .ge-header {
    padding: 24px 48px;
  }
  
  .ge-logo {
    width: 40px;
    height: 40px;
  }
  
  .ge-brand-text {
    font-size: 20px;
  }
  
  .ge-left-content {
    width: 55%;
    padding: 48px;
  }
  
  .ge-right-image {
    width: 60%;
  }
  
  .ge-main-heading {
    font-size: clamp(2.5rem, 5vw, 4rem);
    margin-bottom: 24px;
  }
  
  .ge-sub-heading {
    font-size: clamp(1rem, 2vw, 1.2rem);
    margin-bottom: 40px;
    max-width: 420px;
  }
  
  .ge-services {
    gap: 16px;
    margin-bottom: 48px;
    max-width: 450px;
  }
  
  .ge-service-card {
    padding: 20px 16px;
  }
  
  .ge-service-icon {
    font-size: 10px;
    padding: 4px 8px;
    margin-bottom: 8px;
  }
  
  .ge-service-name {
    font-size: 14px;
    margin-bottom: 4px;
  }
  
  .ge-service-desc {
    font-size: 11px;
  }
  
  .ge-primary-cta {
    font-size: 16px;
    padding: 16px 32px;
    gap: 12px;
  }
  
  .ge-secondary-cta {
    font-size: 15px;
    padding: 16px 24px;
    gap: 8px;
  }
}

/* Extra Small Mobile */
@media (max-width: 375px) {
  .ge-header {
    padding: 12px 16px;
  }
  
  .ge-logo {
    width: 28px;
    height: 28px;
  }
  
  .ge-brand-text {
    font-size: 14px;
  }
  
  .ge-left-content {
    padding: 16px;
  }
  
  .ge-main-heading {
    font-size: clamp(1.6rem, 9vw, 2.2rem);
  }
  
  .ge-sub-heading {
    font-size: clamp(0.85rem, 4.5vw, 0.95rem);
    margin-bottom: 20px;
  }
  
  .ge-services {
    gap: 10px;
    margin-bottom: 28px;
  }
  
  .ge-service-card {
    padding: 14px 10px;
  }
  
  .ge-service-name {
    font-size: 12px;
  }
  
  .ge-service-desc {
    font-size: 9px;
  }
  
  .ge-primary-cta {
    font-size: 13px;
    padding: 12px 20px;
  }
  
  .ge-secondary-cta {
    font-size: 12px;
    padding: 10px 16px;
  }
}
      `}</style>
      
      <div className="global-expedyte">
        {/* Geometric accents */}
        {geometricAccents.map((accent, index) => (
          <div
            key={`accent-${index}`}
            className="ge-geometric-accent"
            style={{
              width: accent.size,
              height: accent.size,
              top: accent.top,
              left: accent.left,
              bottom: accent.bottom,
              right: accent.right,
              background: accent.color,
              borderRadius: accent.shape === 'circle' ? '50%' : '12px'
            }}
          />
        ))}

        {/* Header */}
        <div className="ge-header">
          <div className="ge-logo-container">
            <img 
              src={assets.logoImage}
              alt="Global Expedyte Logo" 
              className="ge-logo"
            />
            <span className="ge-brand-text">global expedyte.</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="ge-hero">
          {/* Right Image - Full Column */}
          <div className="ge-right-image">
            <img 
              src={assets.heroImage}
              alt="Global Expedyte Hero" 
              className={`ge-hero-image ${isImageHovered ? 'hovered' : ''}`}
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
            />
            <div className="ge-image-overlay"></div>
          </div>

          {/* Left Content - Overlapping */}
          <div className="ge-left-content">
            <div className="ge-eyebrow">
              Creative Digital Studio
            </div>

            <h1 className="ge-main-heading">
              We Turn Your <span className="ge-wild-text">Wild Ideas</span><br />
              Into Digital <span className="ge-masterpieces-text">Masterpieces</span>
            </h1>

            <p className="ge-sub-heading">
              Your brand deserves more than templates. We build digital experiences that reflect who you really are and where you're headed.
            </p>

            {/* Services Grid */}
            <div className="ge-services">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="ge-service-card"
                  style={{
                    ...(hoveredService === index ? {
                      background: `linear-gradient(135deg, ${service.color}20, ${service.color}08)`,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 12px 24px ${service.color}15`,
                      borderColor: `${service.color}30`
                    } : {})
                  }}
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <span 
                    className="ge-service-icon"
                    style={{
                      color: hoveredService === index ? service.color : '#6b7280'
                    }}
                  >
                    {service.tag}
                  </span>
                  <div 
                    className="ge-service-name"
                    style={{
                      color: hoveredService === index ? service.color : '#111827'
                    }}
                  >
                    {service.name}
                  </div>
                  <div className="ge-service-desc">
                    {service.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="ge-cta-container">
              <div 
                className="ge-primary-cta"
                onClick={handleNavigation}
                onMouseEnter={() => setIsPrimaryCTAHovered(true)}
                onMouseLeave={() => setIsPrimaryCTAHovered(false)}
              >
                <span>View Our Work</span>
                <span className={`ge-arrow ${isPrimaryCTAHovered ? 'moved' : ''}`}>
                  →
                </span>
              </div>
              
              <div 
                className="ge-secondary-cta"
                onClick={handleContactNavigation}
                onMouseEnter={() => setIsSecondaryCTAHovered(true)}
                onMouseLeave={() => setIsSecondaryCTAHovered(false)}
              >
                <span>Let's Create Magic</span>
                <span className={`ge-arrow ${isSecondaryCTAHovered ? 'moved' : ''}`}>
                  →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </>
  );
};

export default GlobalExpedyte;