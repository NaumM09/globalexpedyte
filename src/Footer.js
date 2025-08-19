import React, { useState } from 'react';
import './Footer.css';

const Footer = ({ onNavigateToContact, onNavigateToDesigns }) => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const currentYear = new Date().getFullYear();

  const services = [
    'Logo Design',
    'Web Magic', 
    'Brand Strategy',
    'Digital Marketing'
  ];

  const companyLinks = [
    { name: 'About Us', action: () => {} },
    { name: 'Contact', action: onNavigateToContact },
    { name: 'Our Work', action: onNavigateToDesigns },
    { name: 'Services', action: () => {} }
  ];

  const legalLinks = [
    { name: 'Terms of Service', action: () => {} },
    { name: 'Privacy Policy', action: () => {} },
    { name: 'Cookie Policy', action: () => {} }
  ];

  const handleBookConsult = () => {
    window.open('https://calendly.com/globalexpedyte/30min', '_blank');
  };

  const handleLinkedInClick = () => {
    window.open('https://linkedin.com/company/globalexpedyte', '_blank');
  };

  return (
    <footer className="ge-footer">
      <div className="ge-footer-content">
        <div className="ge-footer-main">
          {/* Brand Section */}
          <div className="ge-footer-brand">
            <div className="ge-footer-logo-container">
              <img 
                src="https://i.ibb.co/20hhhH7w/GE.png"
                alt="Global Expedyte Logo" 
                className="ge-footer-logo"
              />
              <span className="ge-footer-brand-text">global expedyte.</span>
            </div>
            <div className="ge-footer-brand-desc">
        Creative Digital Studio
            </div>
            
            {/* Contact Info */}
            <div style={{ marginTop: '24px' }}>
              <div style={{ color: '#b0b0b0', fontSize: '14px', marginBottom: '8px' }}>
          info@globalexpedyte.co.za
              </div>
              <div style={{ color: '#808080', fontSize: '12px' }}>
                GLOBAL EXPEDYTE PTY LTD
              </div>
            </div>

            {/* LinkedIn */}
            <div className="ge-footer-social">
              <div
                className="ge-footer-social-link"
                onClick={handleLinkedInClick}
                title="Follow us on LinkedIn"
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Company Section */}
          <div className="ge-footer-section">
            <h3 className="ge-footer-section-title">Company</h3>
            <div className="ge-footer-links">
              {companyLinks.map((link, index) => (
                <div
                  key={index}
                  className="ge-footer-link"
                  onClick={link.action}
                  onMouseEnter={() => setHoveredLink(`company-${index}`)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.name}
                </div>
              ))}
            </div>
          </div>

          {/* Services & Legal Combined */}
          <div className="ge-footer-section">
            <h3 className="ge-footer-section-title">Services</h3>
            <div className="ge-footer-links">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="ge-footer-link"
                  onMouseEnter={() => setHoveredLink(`service-${index}`)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {service}
                </div>
              ))}
            </div>

            {/* Book Consultation Button */}
            <div
              className="ge-footer-link ge-footer-consult-link"
              onClick={handleBookConsult}
              onMouseEnter={() => setHoveredLink('consult')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Book Consultation
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="ge-footer-bottom">
          <div className="ge-footer-copyright">
            © {currentYear} Global Expedyte. All rights reserved.
          </div>
          
          <div className="ge-footer-made-with">
            Made with <span className="ge-footer-heart">♥</span> in South Africa
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;