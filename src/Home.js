import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const Home = ({ qrSource = 'direct', setCurrentSection }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const isInView = useInView(containerRef, { once: true });
  
  // Subtle parallax for depth
  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  
  // Mouse tracking for subtle interactions
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100 
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Minimal geometric logo
  const GeometricLogo = () => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <motion.div 
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{ 
          position: 'relative', 
          cursor: 'pointer',
          marginBottom: '60px' // Reduced from 80px
        }}
      >
        <motion.div
          style={{
            width: '60px',
            height: '60px',
            background: '#000',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Inner geometric shape */}
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '30px',
              height: '30px',
              background: isHovered ? '#000' : '#fff',
              transform: 'translate(-50%, -50%) rotate(45deg)',
              transition: 'all 0.3s ease'
            }}
          />
          
          {/* Outer frame animation */}
          <motion.div
            style={{
              position: 'absolute',
              inset: '-2px',
              background: 'linear-gradient(45deg, transparent, #fff, transparent)',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 2, ease: "linear", repeat: isHovered ? Infinity : 0 }}
          />
        </motion.div>
        
        {/* Company name */}
        <motion.div
          style={{
            marginTop: '20px',
            fontSize: '0.8rem',
            fontWeight: '400',
            letterSpacing: '3px',
            color: '#000',
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          GLOBAL EXPEDYTE
        </motion.div>
      </motion.div>
    );
  };

  // 3D-style product showcase element
  const ProductShowcase = () => {
    return (
      <motion.div
        style={{
          position: 'relative',
          width: '300px',
          height: '200px',
          margin: '40px auto', // Reduced from 60px
          perspective: '1000px'
        }}
        initial={{ opacity: 0, rotateX: 30 }}
        animate={{ opacity: 1, rotateX: 0 }}
        transition={{ duration: 1.2, delay: 1.5 }}
      >
        {/* Main geometric shape */}
        <motion.div
          style={{
            width: '200px',
            height: '120px',
            background: 'linear-gradient(135deg, #f8f8f8, #e8e8e8)',
            borderRadius: '20px',
            margin: '0 auto',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}
          animate={{
            rotateY: [0, 5, -5, 0],
            y: [0, -5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Inner details */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            right: '20px',
            height: '2px',
            background: 'linear-gradient(90deg, #000, transparent)',
            opacity: 0.3
          }} />
          
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '20px',
            width: '40px',
            height: '40px',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '8px',
            background: '#fff'
          }} />
          
          <div style={{
            position: 'absolute',
            top: '50px',
            right: '20px',
            width: '80px',
            height: '2px',
            background: '#000',
            opacity: 0.8
          }} />
          
          <div style={{
            position: 'absolute',
            top: '65px',
            right: '20px',
            width: '60px',
            height: '1px',
            background: '#000',
            opacity: 0.4
          }} />
        </motion.div>
        
        {/* Floating elements */}
        <motion.div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '8px',
            height: '8px',
            background: '#000',
            borderRadius: '50%'
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0.5
          }}
        />
        
        <motion.div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '10px',
            width: '4px',
            height: '4px',
            background: '#000',
            borderRadius: '50%'
          }}
          animate={{
            y: [0, -8, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 1
          }}
        />
      </motion.div>
    );
  };

  // Floating text marquee
  const FloatingMarquee = ({ text, direction = 1 }) => {
    return (
      <motion.div
        style={{
          position: 'absolute',
          width: '200%',
          fontSize: '0.8rem',
          fontWeight: '300',
          color: 'rgba(0,0,0,0.1)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
        animate={{
          x: direction > 0 ? ['100%', '-100%'] : ['-100%', '100%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {Array.from({ length: 10 }, (_, i) => `${text} • `).join('')}
      </motion.div>
    );
  };

  return (
    <section 
      ref={containerRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: '#fefefe',
        overflow: 'hidden',
        padding: '60px 20px 20px' // Reduced top padding
      }}
    >
      {/* Subtle grid background */}
      <motion.div 
        style={{ 
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          y: yBg
        }}
      />
      
      {/* Floating marquees */}
      <div style={{ position: 'absolute', top: '20%', left: 0, right: 0, overflow: 'hidden' }}>
        <FloatingMarquee text="DIGITAL EXCELLENCE" direction={1} />
      </div>
      
      <div style={{ position: 'absolute', bottom: '20%', left: 0, right: 0, overflow: 'hidden' }}>
        <FloatingMarquee text="GLOBAL EXPEDYTE" direction={-1} />
      </div>

      {/* Left CTA */}
      <motion.div
        style={{
          position: 'absolute',
          left: '40px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <div style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          fontSize: '0.8rem',
          fontWeight: '300',
          letterSpacing: '2px',
          color: 'rgba(0,0,0,0.4)',
          textTransform: 'uppercase',
          marginBottom: '20px'
        }}>
          PORTFOLIO
        </div>
        
        <motion.button
          style={{
            background: '#000',
            border: 'none',
            color: '#fff',
            padding: '50px 20px',
            fontSize: '0.8rem',
            fontWeight: '400',
            cursor: 'pointer',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            position: 'relative',
            overflow: 'hidden'
          }}
          whileHover={{ 
            backgroundColor: '#333',
            scale: 1.05
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentSection('services')}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: '-100%',
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.2), transparent)'
            }}
            animate={{ top: ['100%', '-100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
          VIEW SERVICES
        </motion.button>
      </motion.div>

      {/* Right CTA */}
      <motion.div
        style={{
          position: 'absolute',
          right: '40px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.7, duration: 0.8 }}
      >
        <div style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          fontSize: '0.8rem',
          fontWeight: '300',
          letterSpacing: '2px',
          color: 'rgba(0,0,0,0.4)',
          textTransform: 'uppercase',
          marginBottom: '20px'
        }}>
          CONTACT
        </div>
        
        <motion.button
          style={{
            background: 'transparent',
            border: '1px solid rgba(0,0,0,0.2)',
            color: '#000',
            padding: '50px 20px',
            fontSize: '0.8rem',
            fontWeight: '400',
            cursor: 'pointer',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed'
          }}
          whileHover={{ 
            backgroundColor: '#000',
            color: '#fff',
            scale: 1.05
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentSection('contact')}
          transition={{ duration: 0.2 }}
        >
          START PROJECT
        </motion.button>
      </motion.div>
      
      <motion.div 
        style={{ 
          textAlign: 'center',
          zIndex: 10,
          maxWidth: '700px', // Reduced from 900px
          y: yContent 
        }}
      >
        <GeometricLogo />
        
        <motion.h1 
          style={{
            color: '#000',
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            fontWeight: '200',
            margin: '0 0 20px 0',
            letterSpacing: '-2px',
            lineHeight: '0.9',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          SIGNATURE
          <br />
          <span style={{ 
            fontSize: 'clamp(2rem, 5vw, 4rem)', 
            fontWeight: '400',
            opacity: 0.7
          }}>
            TOUCH
          </span>
        </motion.h1>

        <motion.div
          style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: 'rgba(0,0,0,0.6)',
            fontWeight: '300',
            letterSpacing: '1px',
            marginBottom: '30px', // Reduced from 40px
            lineHeight: '1.6',
            textTransform: 'uppercase',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          OF DIGITAL WORKS
        </motion.div>

        <ProductShowcase />

        {/* Condensed content based on source */}
        {qrSource !== 'direct' && (
          <motion.div
            style={{
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '0',
              padding: '30px 25px', // Reduced padding
              margin: '30px auto', // Reduced margin
              maxWidth: '450px', // Smaller width
              boxShadow: '0 40px 80px rgba(0,0,0,0.03)',
              position: 'relative'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            whileHover={{ y: -2 }}
          >
            {/* Accent line */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '25px',
              right: '25px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #000, transparent)'
            }} />
            
            <motion.div 
              style={{ 
                fontSize: '1.2rem', 
                marginBottom: '15px',
                opacity: 0.7
              }}
            >
              ▲
            </motion.div>
            
            <h2 style={{
              color: '#000',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', // Smaller font
              fontWeight: '300',
              margin: '0 0 15px 0',
              letterSpacing: '1px',
              lineHeight: '1.2',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              SCANNING FOR
              <br />
              BETTER AGENCIES?
            </h2>
            
            <div style={{
              width: '25px',
              height: '1px',
              background: '#000',
              margin: '15px auto',
              opacity: 0.3
            }} />
            
            <p style={{
              color: 'rgba(0,0,0,0.7)',
              fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)', // Smaller font
              margin: '0',
              lineHeight: '1.5',
              fontWeight: '300',
              textAlign: 'center'
            }}>
              Precision-crafted digital experiences
              <br />
              that set new industry standards.
            </p>
          </motion.div>
        )}

        {/* Minimal scroll indicator - moved up and smaller */}
        <motion.div
          style={{
            marginTop: '40px', // Reduced from 120px
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
          }}
          onClick={() => setCurrentSection('services')}
          whileHover={{ y: -2 }}
          whileTap={{ y: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.8 }}
        >
          <div style={{
            width: '1px',
            height: '25px', // Shorter line
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3), transparent)'
          }} />
          
          <motion.div
            style={{
              color: 'rgba(0,0,0,0.4)',
              fontSize: '0.7rem', // Smaller font
              fontWeight: '300',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}
            animate={{ 
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            EXPLORE
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;