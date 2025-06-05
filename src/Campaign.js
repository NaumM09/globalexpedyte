import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Home from './Home';
import Services from './Service';
import Contact from './Contact';
import "./GlobalExpedyte.css";

const GlobalExpedyte = () => {
  const [currentSection, setCurrentSection] = useState('landing');
  const [isLoading, setIsLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [qrSource, setQrSource] = useState('');
  const [showCaughtModal, setShowCaughtModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const logoControls = useAnimation();

  // QR Source Detection & "Caught Ya" Modal
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source') || urlParams.get('campaign') || 'direct';
    setQrSource(source);
    
    // Show "caught ya" modal after loading if from QR
    if (source !== 'direct') {
      setTimeout(() => setShowCaughtModal(true), 3500);
    }
  }, []);

  // Loading sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  // "Caught Ya" Modal - Updated to match minimal theme
  const CaughtYaModal = () => {
    if (qrSource === 'direct' || !showCaughtModal) return null;
    
    return (
      <AnimatePresence>
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(254,254,254,0.95)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
            padding: '20px'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowCaughtModal(false)}
        >
          <motion.div
            style={{
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '0',
              padding: '80px 60px',
              textAlign: 'center',
              maxWidth: '600px',
              position: 'relative',
              boxShadow: '0 40px 80px rgba(0,0,0,0.1)'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Minimal accent line */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '60px',
              right: '60px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #000, transparent)'
            }} />
            
            <motion.div
              style={{ 
                fontSize: '2rem', 
                marginBottom: '30px',
                opacity: 0.7
              }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ▲
            </motion.div>
            
            <h2 style={{
              color: '#000',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '200',
              margin: '0 0 30px 0',
              letterSpacing: '-1px',
              textTransform: 'uppercase',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              SCANNING FOR
              <br />
              <span style={{ fontWeight: '400', opacity: 0.7 }}>
                BETTER AGENCIES?
              </span>
            </h2>
            
            <div style={{
              width: '40px',
              height: '1px',
              background: '#000',
              margin: '30px auto',
              opacity: 0.3
            }} />
            
            <p style={{
              color: 'rgba(0,0,0,0.7)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              margin: '0 0 20px 0',
              lineHeight: '1.8',
              fontWeight: '300'
            }}>
              Looks like you've been exploring other options...
            </p>
            
            <p style={{
              color: '#000',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              margin: '0 0 50px 0',
              fontWeight: '400'
            }}>
              But we're not concerned. Quality speaks for itself.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <motion.button
                style={{
                  background: '#000',
                  border: 'none',
                  color: '#fff',
                  padding: '18px 40px',
                  borderRadius: '0',
                  fontSize: '0.9rem',
                  fontWeight: '400',
                  cursor: 'pointer',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
                whileHover={{ backgroundColor: '#333' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowCaughtModal(false);
                  setCurrentSection('services');
                }}
              >
                SEE THE DIFFERENCE
              </motion.button>
              
              <motion.button
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(0,0,0,0.2)',
                  color: '#000',
                  padding: '18px 40px',
                  borderRadius: '0',
                  fontSize: '0.9rem',
                  fontWeight: '400',
                  cursor: 'pointer',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
                whileHover={{ 
                  backgroundColor: '#000',
                  color: '#fff'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCaughtModal(false)}
              >
                CONTINUE BROWSING
              </motion.button>
            </div>
            
            <motion.button
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                color: 'rgba(0,0,0,0.4)',
                fontSize: '1.5rem',
                cursor: 'pointer',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              whileHover={{ color: '#000', scale: 1.1 }}
              onClick={() => setShowCaughtModal(false)}
            >
              ×
            </motion.button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Minimal Loading Screen
  const LoadingScreen = () => (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#fefefe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5000,
        pointerEvents: isLoading ? 'all' : 'none'
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        style={{
          textAlign: 'center'
        }}
      >
        {/* Minimal geometric loader */}
        <motion.div
          style={{
            width: '40px',
            height: '40px',
            background: '#000',
            margin: '0 auto 30px',
            position: 'relative'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '20px',
              height: '20px',
              background: '#fff',
              transform: 'translate(-50%, -50%) rotate(45deg)'
            }}
          />
        </motion.div>
        
        <motion.div
          style={{
            color: '#000',
            fontSize: '0.8rem',
            fontWeight: '400',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          GLOBAL EXPEDYTE
        </motion.div>
      </motion.div>
    </motion.div>
  );

  // Main render
  return (
    <div style={{
      minHeight: '100vh',
      background: '#fefefe',
      color: '#000',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {isLoading && <LoadingScreen />}
      <CaughtYaModal />
      
      {/* Minimal Navigation */}
      <motion.nav 
        style={{
          position: 'fixed',
          top: '30px',
          right: '30px',
          zIndex: 1500
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.button
          style={{
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '0',
            width: '50px',
            height: '50px',
            color: '#000',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
          whileHover={{ 
            boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
            y: -2
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? '×' : '☰'}
        </motion.button>
        
        <AnimatePresence>
          {navOpen && (
            <motion.div
              style={{
                position: 'absolute',
                top: '60px',
                right: '0',
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '0',
                padding: '20px',
                minWidth: '160px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
              }}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              {['landing', 'services', 'contact'].map((section, index) => (
                <motion.button
                  key={section}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '12px 20px',
                    background: 'transparent',
                    border: 'none',
                    color: currentSection === section ? '#000' : 'rgba(0,0,0,0.6)',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    borderRadius: '0',
                    marginBottom: '5px',
                    textTransform: 'uppercase',
                    fontWeight: currentSection === section ? '400' : '300',
                    letterSpacing: '1px',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}
                  onClick={() => {
                    setCurrentSection(section);
                    setNavOpen(false);
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ 
                    color: '#000',
                    x: 5
                  }}
                >
                  {section === 'landing' ? 'Home' : section}
                </motion.button>
              ))}
              
              {/* Minimal accent line */}
              <div style={{
                width: '30px',
                height: '1px',
                background: 'rgba(0,0,0,0.2)',
                marginTop: '15px'
              }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          {currentSection === 'landing' && (
            <Home 
              qrSource={qrSource} 
              setCurrentSection={setCurrentSection} 
            />
          )}
          {currentSection === 'services' && (
            <Services 
              setSelectedService={setSelectedService} 
              setCurrentSection={setCurrentSection} 
            />
          )}
          {currentSection === 'contact' && (
            <Contact 
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              formData={formData}
              setFormData={setFormData}
              qrSource={qrSource}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GlobalExpedyte;