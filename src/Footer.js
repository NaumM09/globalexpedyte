import React from 'react';
import { motion } from 'framer-motion';

const Footer = ({ setCurrentSection }) => {
  return (
    <motion.footer
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        color: '#ffffff',
        padding: '4rem 2rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(255,255,255,0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 0%, transparent 50%)
        `
      }} />

      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        opacity: 0.3
      }} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Main footer content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          marginBottom: '4rem'
        }}>
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #ffffff 0%, #cccccc 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src="/logo.png"
                  alt="Global Expedyte"
                  style={{
                    width: '24px',
                    height: '24px',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <span style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                color: '#ffffff',
                letterSpacing: '-0.02em',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                Global Expedyte
              </span>
            </div>
            
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: '1.7',
              margin: '0 0 2rem 0',
              fontWeight: '400',
              maxWidth: '350px',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}>
              Creating unforgettable digital experiences that drive results and elevate brands to new heights.
            </p>

            {/* Social Links */}
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              {['LinkedIn', 'Twitter', 'Instagram'].map((social, index) => (
                <motion.button
                  key={social}
                  style={{
                    width: '44px',
                    height: '44px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{
                    background: 'rgba(255,255,255,0.2)',
                    borderColor: 'rgba(255,255,255,0.4)',
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.charAt(0)}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#ffffff',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '2rem',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}>
              Our Services
            </h4>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {[
                'Brand Strategy & Identity',
                'Web Development',
                'Mobile Applications',
                'Digital Marketing',
                'Custom Software'
              ].map((service, index) => (
                <motion.button
                  key={service}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '1rem',
                    fontWeight: '400',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    transition: 'all 0.3s ease',
                    padding: '0.5rem 0',
                    position: 'relative'
                  }}
                  whileHover={{
                    color: '#ffffff',
                    x: 8
                  }}
                  onClick={() => setCurrentSection('services')}
                >
                  <span style={{
                    position: 'absolute',
                    left: '-1rem',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}>
                    →
                  </span>
                  {service}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Contact & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#ffffff',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '2rem',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}>
              Start Your Project
            </h4>
            
            <div style={{
              marginBottom: '2rem'
            }}>
              <p style={{
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.8)',
                fontWeight: '400',
                lineHeight: '1.6',
                margin: '0 0 1.5rem 0',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                Ready to transform your brand?
              </p>
              
              <motion.button
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                  border: 'none',
                  color: '#0a0a0a',
                  padding: '1rem 2rem',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  borderRadius: '12px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '-0.01em',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(255,255,255,0.2)'
                }}
                whileHover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(255,255,255,0.3)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentSection('contact')}
              >
                Let's Talk →
              </motion.button>
            </div>

            {/* Contact Info */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                Direct Contact
              </div>
              <div style={{
                fontSize: '1.1rem',
                color: '#ffffff',
                fontWeight: '500',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                info@globalexpedyte.co.za
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div style={{
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            © 2025 Global Expedyte. Crafted with precision.
          </div>

          <div style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }}>
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <motion.button
                key={item}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.9rem',
                  fontWeight: '400',
                  cursor: 'pointer',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{
                  color: 'rgba(255,255,255,0.9)'
                }}
              >
                {item}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating accent elements */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '5%',
          width: '60px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        }}
        animate={{
          x: [0, 100, 0],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          top: '2rem',
          right: '5%',
          width: '40px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        }}
        animate={{
          x: [0, -80, 0],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </motion.footer>
  );
};

export default Footer;