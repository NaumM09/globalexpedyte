import React from 'react';
import { motion } from 'framer-motion';

const Footer = ({ setCurrentSection }) => {
  return (
    <motion.footer
      style={{
        background: '#fefefe',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        padding: 'clamp(30px, 6vh, 50px) clamp(20px, 5vw, 60px) clamp(20px, 4vh, 30px)',
        position: 'relative'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Subtle grid background */}
      <div style={{ 
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.01) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.01) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        opacity: 0.5
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Main footer content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'clamp(30px, 6vw, 60px)',
          marginBottom: 'clamp(30px, 5vh, 40px)'
        }}>
          
          {/* Company Info */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <img
                src="https://i.ibb.co/bjWCDQqs/logo5-1.png"
                alt="Global Expedyte"
                style={{
                  width: '32px',
                  height: '32px',
                  objectFit: 'contain'
                }}
              />
              <span style={{
                fontSize: '0.9rem',
                fontWeight: '400',
                color: '#000',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Global Expedyte
              </span>
            </div>
            
            <p style={{
              fontSize: '0.9rem',
              color: 'rgba(0,0,0,0.6)',
              lineHeight: '1.6',
              margin: '0 0 20px 0',
              fontWeight: '300',
              maxWidth: '280px'
            }}>
              Crafting digital solutions that set new industry standards.
            </p>

            <div style={{
              fontSize: '0.8rem',
              color: 'rgba(0,0,0,0.4)',
              fontWeight: '300'
            }}>
              © 2025 Global Expedyte
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{
              fontSize: '0.8rem',
              fontWeight: '400',
              color: '#000',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Services
            </h4>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {['Web Development', 'Mobile Apps', 'Branding', 'Custom Software'].map((service, index) => (
                <motion.button
                  key={service}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(0,0,0,0.6)',
                    fontSize: '0.9rem',
                    fontWeight: '300',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    transition: 'all 0.3s ease',
                    padding: '2px 0'
                  }}
                  whileHover={{ 
                    color: '#000',
                    x: 3
                  }}
                  onClick={() => setCurrentSection('services')}
                >
                  {service}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontSize: '0.8rem',
              fontWeight: '400',
              color: '#000',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Get in Touch
            </h4>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div style={{
                fontSize: '0.9rem',
                color: 'rgba(0,0,0,0.6)',
                fontWeight: '300'
              }}>
                Ready to start your project?
              </div>
              
              <motion.button
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(0,0,0,0.2)',
                  color: '#000',
                  padding: '12px 24px',
                  fontSize: '0.8rem',
                  fontWeight: '400',
                  cursor: 'pointer',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  alignSelf: 'flex-start',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{ 
                  backgroundColor: '#000',
                  color: '#fff'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentSection('contact')}
              >
                Contact Us
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '20px',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <div style={{
            fontSize: '0.8rem',
            color: 'rgba(0,0,0,0.4)',
            fontWeight: '300'
          }}>
            Designed & developed with precision
          </div>

          <div style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center'
          }}>
            {['Privacy', 'Terms'].map((item) => (
              <button
                key={item}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(0,0,0,0.4)',
                  fontSize: '0.8rem',
                  fontWeight: '300',
                  cursor: 'pointer',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'rgba(0,0,0,0.7)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(0,0,0,0.4)';
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle accent line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '20%',
        right: '20%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
        opacity: 0.6
      }} />
    </motion.footer>
  );
};

export default Footer;