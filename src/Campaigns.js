import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation, useMotionValue, useSpring } from 'framer-motion';
import "./GlobalExpedyte.css";

// Your actual Global Expedyte logo - fixed URL
const logo = "https://i.ibb.co/Y4R1wPY/global-expedyte-logo.png";

const GlobalExpedyte = () => {
  const [currentSection, setCurrentSection] = useState('landing');
  const [isLoading, setIsLoading] = useState(true);
  const [logoClicks, setLogoClicks] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [qrSource, setQrSource] = useState('');
  const [showCaughtModal, setShowCaughtModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const logoControls = useAnimation();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 30 });

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

  // Mouse tracking
  useEffect(() => {
    let rafId;
    const updateCursor = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        rafId = null;
      });
    };
    
    window.addEventListener('mousemove', updateCursor, { passive: true });
    return () => {
      window.removeEventListener('mousemove', updateCursor);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [cursorX, cursorY]);

  // Loading sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    let emailBody = `Name: ${formData.name}\n`;
    emailBody += `Email: ${formData.email}\n`;
    if (formData.company) emailBody += `Company: ${formData.company}\n`;
    if (selectedService) emailBody += `Service Interest: ${selectedService}\n`;
    if (qrSource !== 'direct') emailBody += `QR Campaign Source: ${qrSource}\n`;
    emailBody += `\nMessage:\n${formData.message}`;
    
    const subject = selectedService ? `QR Lead: ${selectedService}` : 'QR Campaign Inquiry - Ready to Stop Cheating!';
    const mailtoLink = `mailto:info@globalexpedyte.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailtoLink;
    
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
      setSelectedService('');
    }, 3000);
  };

  // Witty services data with enhanced hover images
  const servicesData = useMemo(() => [
    {
      icon: "🔥",
      title: "Web Design",
      wittySubtitle: "Designs so hot, your homepage will ghost your ex-agency.",
      description: "We build bold, modern, high-converting websites that don't just look good—they work. No more boring templates or cookie-cutter designs.",
      service: "web-design",
      gradient: "linear-gradient(135deg, rgba(255,71,87,0.3), rgba(0,255,136,0.1))",
      features: ["Mobile-First", "Lightning Fast", "Conversion Focused", "SEO Optimized"],
      hoverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      hoverTitle: "Web Analytics Dashboard",
      hoverDescription: "Real-time performance tracking with beautiful data visualization",
      projects: [
        {
          title: "Trader Stream Platform",
          image: "https://i.ibb.co/hRB3TgxN/logo2.png",
          description: "Trading platform that converts like crazy"
        },
        {
          title: "Creative Portfolio",
          image: "https://i.ibb.co/HfYVVX99/portfolio.png",
          description: "Portfolio that lands clients on autopilot"
        },
        {
          title: "Corporate Beast",
          image: "https://i.ibb.co/4gmSdkBw/logo4-1.png",
          description: "Enterprise site that means business"
        }
      ]
    },
    {
      icon: "💻",
      title: "Software Engineering", 
      wittySubtitle: "Code that commits harder than your last developer.",
      description: "Scalable, fast, and reliable. Whether it's an app or system, we bring your tech dreams to life without the drama.",
      service: "software-engineering",
      gradient: "linear-gradient(135deg, rgba(0,255,136,0.3), rgba(93,173,226,0.1))",
      features: ["Rock Solid", "Scalable AF", "Zero Drama", "Future Proof"],
      hoverImage: "https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-desk-wt586UQXwL8",
      hoverTitle: "Development Environment",
      hoverDescription: "Clean, efficient code that scales with your business",
      projects: [
        {
          title: "Task Management Beast",
          image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
          description: "Productivity app that actually works"
        },
        {
          title: "Analytics Dashboard",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
          description: "Data visualization that tells stories"
        },
        {
          title: "FinTech Platform",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
          description: "Financial platform built different"
        }
      ]
    },
    {
      icon: "✨",
      title: "Branding",
      wittySubtitle: "Because your brand deserves main character energy.",
      description: "From logos to identity systems, we craft magnetic brands people remember. No more blending into the background.",
      service: "branding", 
      gradient: "linear-gradient(135deg, rgba(93,173,226,0.3), rgba(255,71,87,0.1))",
      features: ["Memorable AF", "Main Character Energy", "Stand Out", "Magnetic Appeal"],
      hoverImage: "https://i.ibb.co/kgqtxBYt/Moss-Lekota-Finance-Logos.png",
      hoverTitle: "Brand Identity System",
      hoverDescription: "Cohesive visual identity that tells your story",
      projects: [
        {
          title: "Moss Lekota Finance",
          image: "https://i.ibb.co/kgqtxBYt/Moss-Lekota-Finance-Logos.png",
          description: "Finance brand that builds trust instantly"
        },
        {
          title: "FinTech Rebrand",
          image: "https://i.ibb.co/C351Mdk0/logo-1.png",
          description: "Tech startup that screams innovation"
        },
        {
          title: "Complete Identity",
          image: "https://i.ibb.co/hFFCnw3h/logo3.png",
          description: "Brand system that works everywhere"
        }
      ]
    },
    {
      icon: "🎨",
      title: "Custom Design",
      wittySubtitle: "For when templates just won't cut it.",
      description: "Need something out-of-the-box? We design one-of-one visuals made just for your brand. Because basic is not in our vocabulary.",
      service: "custom-design",
      gradient: "linear-gradient(135deg, rgba(255,71,87,0.2), rgba(0,255,136,0.2))",
      features: ["One-of-One", "Zero Templates", "Bespoke AF", "Uniquely You"],
      hoverImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      hoverTitle: "Design Analytics",
      hoverDescription: "Track design performance across all channels",
      projects: [
        {
          title: "Custom Illustrations",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
          description: "Artwork that tells your story"
        },
        {
          title: "Packaging Design",
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
          description: "Packaging that demands attention"
        },
        {
          title: "Print Collateral",
          image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
          description: "Print designs that convert offline"
        }
      ]
    }
  ], []);

  // Logo click handler
  const handleLogoClick = useCallback(async () => {
    const newClickCount = logoClicks + 1;
    setLogoClicks(newClickCount);

    if (newClickCount === 1) {
      await logoControls.start({
        scale: [1, 1.4, 1.1],
        rotate: [0, 360, 0],
        background: [
          'linear-gradient(45deg, #ff4757, #00ff88, #5dade2)',
          'linear-gradient(45deg, #5dade2, #ff4757, #00ff88)',
          'linear-gradient(45deg, #00ff88, #5dade2, #ff4757)',
          'linear-gradient(45deg, #ff4757, #00ff88, #5dade2)'
        ],
        transition: { duration: 1, ease: "easeInOut" }
      });
    } else if (newClickCount >= 2) {
      await logoControls.start({
        scale: [1, 0.7, 1.6, 1],
        rotate: [0, -180, 180, 0],
        borderRadius: ['30px', '50%', '15px', '30px'],
        transition: { duration: 1.4, ease: "backInOut" }
      });
      setLogoClicks(0);
    }
    
    setTimeout(() => setLogoClicks(0), 600);
  }, [logoClicks, logoControls]);

  // "Caught Ya" Modal
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
            background: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(10px)',
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
              background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
              border: '3px solid #ff4757',
              borderRadius: '25px',
              padding: '50px',
              textAlign: 'center',
              maxWidth: '600px',
              position: 'relative'
            }}
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -180 }}
            transition={{ type: "spring", duration: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              style={{ fontSize: '4rem', marginBottom: '20px' }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
            >
              👀
            </motion.div>
            
            <h2 style={{
              color: '#ff4757',
              fontSize: '3rem',
              fontWeight: '900',
              margin: '0 0 20px 0',
              textTransform: 'uppercase'
            }}>
              Caught Ya!
            </h2>
            
            <p style={{
              color: 'white',
              fontSize: '1.5rem',
              margin: '0 0 15px 0',
              fontWeight: '300'
            }}>
              Looks like you've been browsing other agencies... 👀
            </p>
            
            <p style={{
              color: '#00ff88',
              fontSize: '1.3rem',
              margin: '0 0 30px 0',
              fontStyle: 'italic'
            }}>
              But we're not mad... just disappointed. 😏
            </p>
            
            <motion.button
              style={{
                background: 'linear-gradient(45deg, #ff4757, #00ff88)',
                border: 'none',
                color: 'white',
                padding: '18px 40px',
                borderRadius: '50px',
                fontSize: '1.2rem',
                fontWeight: '700',
                cursor: 'pointer',
                textTransform: 'uppercase',
                marginBottom: '20px'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowCaughtModal(false);
                setCurrentSection('services');
              }}
            >
              Show Me How Loyalty Pays Off
            </motion.button>
            
            <motion.button
              style={{
                position: 'absolute',
                top: '20px',
                right: '25px',
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '2rem',
                cursor: 'pointer'
              }}
              whileHover={{ color: '#ff4757', scale: 1.2 }}
              onClick={() => setShowCaughtModal(false)}
            >
              ×
            </motion.button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Interactive Logo Component
  const InteractiveLogo = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div 
        className="logo-container"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{ position: 'relative', cursor: 'pointer', zIndex: 10 }}
      >
        {/* Floating particles */}
        <AnimatePresence>
          {isHovered && (
            <>
              {Array.from({ length: 12 }, (_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${
                      ['#ff4757', '#00ff88', '#5dade2'][i % 3]
                    }, transparent)`
                  }}
                  initial={{ scale: 0, x: 70, y: 70, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1.2, 0],
                    x: 70 + Math.cos(i * 30 * Math.PI / 180) * 100,
                    y: 70 + Math.sin(i * 30 * Math.PI / 180) * 100,
                    opacity: [0, 1, 0],
                    rotate: 360
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ 
                    duration: 2.5,
                    delay: i * 0.08,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Main logo */}
        <motion.div
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '35px',
            background: 'linear-gradient(45deg, #ff4757, #00ff88, #5dade2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            boxShadow: '0 15px 40px rgba(0, 255, 136, 0.4)'
          }}
          animate={logoControls}
          whileHover={{ 
            scale: 1.15, 
            rotate: 8,
            boxShadow: '0 25px 50px rgba(0, 255, 136, 0.5)'
          }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLogoClick}
          initial={{ scale: 0.3, rotate: 270, opacity: 0 }}
          transition={{ duration: 1.8, ease: "backOut", delay: 0.8 }}
        >
          {/* Shine effect */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
              transform: 'skewX(-20deg)'
            }}
            animate={{ x: ['0%', '350%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
          />
          
          <img 
            src={logo} 
            alt="Global Expedyte Logo"
            style={{
              width: '90px',
              height: '90px',
              objectFit: 'contain',
              objectPosition: 'center',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
              display: 'block'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML = '<div style="font-size: 2.5rem; font-weight: 700; color: white; text-align: center; line-height: 1; letter-spacing: 2px;">GE<br><span style="font-size: 0.8rem; opacity: 0.8;">EXPEDYTE</span></div>';
            }}
          />
        </motion.div>
      </motion.div>
    );
  };

  // Service Tile with enhanced hover effect
// Enhanced Service Tile with Multiple Mobile Preview Options
const ServiceTile = ({ icon, title, wittySubtitle, description, service, delay, gradient, features, projects, hoverImage, hoverTitle, hoverDescription, previewMode = 'tap' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-cycle preview on mobile (Option 1: Automatic preview)
  useEffect(() => {
    if (isMobile && previewMode === 'auto') {
      const interval = setInterval(() => {
        setShowPreview(prev => !prev);
      }, 4000); // Show preview every 4 seconds
      
      return () => clearInterval(interval);
    }
  }, [isMobile, previewMode]);

  useEffect(() => {
    if (!showPreview || !projects) return;
    
    const interval = setInterval(() => {
      setCurrentProject(prev => (prev + 1) % projects.length);
    }, 2500);
    
    return () => clearInterval(interval);
  }, [showPreview, projects]);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Option 1: Tap to preview (tap anywhere on card)
  const handleTapPreview = (e) => {
    if (isMobile && previewMode === 'tap') {
      e.preventDefault();
      setShowPreview(!showPreview);
      setIsHovered(!showPreview);
      if (!showPreview) {
        setCurrentProject(0);
      }
    }
  };

  // Option 2: Preview button (dedicated preview button)
  const handlePreviewButton = (e) => {
    e.stopPropagation(); // Prevent card click
    setShowPreview(!showPreview);
    setIsHovered(!showPreview);
    if (!showPreview) {
      setCurrentProject(0);
    }
  };

  // Option 3: Double tap to preview
  const [tapCount, setTapCount] = useState(0);
  const handleDoubleTap = () => {
    if (isMobile && previewMode === 'doubletap') {
      setTapCount(prev => prev + 1);
      
      setTimeout(() => {
        if (tapCount === 1) { // Double tap detected
          setShowPreview(!showPreview);
          setIsHovered(!showPreview);
          if (!showPreview) {
            setCurrentProject(0);
          }
        }
        setTapCount(0);
      }, 300);
    }
  };

  const handleCardClick = () => {
    if (!showPreview) {
      setSelectedService(service);
      setCurrentSection('contact');
    }
  };

  const isPreviewVisible = isMobile ? showPreview : isHovered;
  
  return (
    <motion.div
      style={{ 
        position: 'relative', 
        cursor: 'pointer',
        width: '100%',
        maxWidth: '100%',
        overflow: 'visible'
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={!isMobile ? { y: -15 } : {}}
      whileTap={{ scale: 0.98 }}
      onClick={previewMode === 'tap' ? handleTapPreview : handleCardClick}
      onDoubleClick={handleDoubleTap}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Preview Overlay */}
      <AnimatePresence>
        {isPreviewVisible && (
          <motion.div
            style={{
              position: 'absolute',
              top: isMobile ? '-10px' : '-20px',
              left: isMobile ? '-10px' : '-20px',
              right: isMobile ? '-10px' : '-20px',
              bottom: isMobile ? '-10px' : '-20px',
              zIndex: 20,
              borderRadius: isMobile ? '20px' : '30px',
              overflow: 'hidden',
              boxShadow: isMobile 
                ? '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 255, 136, 0.3)'
                : '0 30px 80px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 255, 136, 0.3)',
              border: '2px solid rgba(0, 255, 136, 0.4)',
              pointerEvents: 'none'
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.8,
              rotateY: isMobile ? 0 : -15,
              rotateX: isMobile ? 0 : 5
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateY: 0,
              rotateX: 0
            }}
            exit={{ 
              opacity: 0, 
              scale: 1.1,
              rotateY: isMobile ? 0 : 15,
              rotateX: isMobile ? 0 : -5
            }}
            transition={{ 
              duration: isMobile ? 0.4 : 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
          >
            {/* Background Image */}
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${hoverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}
              animate={!isMobile ? { scale: 1.1 } : {}}
              transition={{ duration: 8, ease: "easeInOut" }}
            >
              {/* Gradient Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3), rgba(0,0,0,0.8))'
              }} />

              {/* Animated Grid Overlay */}
              {!isMobile && (
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,255,136,0.3) 1px, transparent 0)`,
                    backgroundSize: '30px 30px',
                    opacity: 0.6
                  }}
                  animate={{
                    backgroundPosition: ['0px 0px', '30px 30px'],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              )}
            </motion.div>

            {/* Close button for mobile */}
            {isMobile && (
              <motion.button
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.7)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  zIndex: 30
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPreview(false);
                  setIsHovered(false);
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                ×
              </motion.button>
            )}

            {/* Content Overlay */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: isMobile ? '20px' : '40px',
                color: 'white',
                zIndex: 10
              }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.div
                style={{
                  display: 'inline-block',
                  background: 'rgba(0, 255, 136, 0.2)',
                  border: '1px solid rgba(0, 255, 136, 0.4)',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  fontWeight: '600',
                  color: '#00ff88',
                  marginBottom: '15px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                {projects && projects.length > 1 ? (
                  `Project ${currentProject + 1}/${projects.length}`
                ) : (
                  'Live Preview'
                )}
              </motion.div>

              <h3 style={{
                fontSize: isMobile ? '1.8rem' : '2.5rem',
                fontWeight: '200',
                margin: '0 0 15px 0',
                lineHeight: '1.1',
                color: 'white'
              }}>
                {projects && projects[currentProject] ? projects[currentProject].title : hoverTitle}
              </h3>
              
              <p style={{
                fontSize: isMobile ? '1rem' : '1.2rem',
                color: 'rgba(255,255,255,0.9)',
                margin: 0,
                maxWidth: '400px',
                lineHeight: '1.5'
              }}>
                {projects && projects[currentProject] ? projects[currentProject].description : hoverDescription}
              </p>

              {/* Interactive Elements */}
              <motion.div
                style={{
                  display: 'flex',
                  gap: isMobile ? '10px' : '15px',
                  marginTop: '25px',
                  flexWrap: 'wrap'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {['View Details', 'Start Project'].map((text, idx) => (
                  <motion.button
                    key={text}
                    style={{
                      background: idx === 0 
                        ? 'linear-gradient(45deg, #00ff88, #5dade2)' 
                        : 'rgba(255,255,255,0.1)',
                      border: idx === 0 
                        ? 'none' 
                        : '2px solid rgba(255,255,255,0.3)',
                      color: 'white',
                      padding: isMobile ? '10px 20px' : '12px 25px',
                      borderRadius: '25px',
                      fontSize: isMobile ? '0.8rem' : '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      pointerEvents: 'auto'
                    }}
                    whileHover={!isMobile ? { scale: 1.05 } : {}}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (idx === 1) { // Start Project
                        setSelectedService(service);
                        setCurrentSection('contact');
                      }
                    }}
                  >
                    {text}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            {/* Mouse Follow Glow Effect - Desktop only */}
            {!isMobile && (
              <motion.div
                style={{
                  position: 'absolute',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0,255,136,0.4), transparent)',
                  pointerEvents: 'none',
                  zIndex: 5,
                  filter: 'blur(20px)'
                }}
                animate={{
                  x: mousePosition.x - 50,
                  y: mousePosition.y - 50,
                }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <motion.div
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '25px',
          padding: isMobile ? '30px 25px' : '40px 30px',
          height: 'auto', // Changed from fixed height to auto
          minHeight: isMobile ? '350px' : '450px', // Increased min-height for desktop
          position: 'relative',
          overflow: 'hidden',
          backdropFilter: 'blur(25px)',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column'
        }}
        whileHover={!isMobile ? { 
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderColor: 'rgba(0, 255, 136, 0.4)'
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: gradient,
          opacity: 0.12
        }} />

        <motion.div
          style={{
            fontSize: isMobile ? '3rem' : '3.5rem',
            marginBottom: isMobile ? '20px' : '25px',
            padding: isMobile ? '15px' : '18px',
            background: 'rgba(255,255,255,0.12)',
            borderRadius: '18px',
            display: 'inline-block'
          }}
          whileHover={!isMobile ? { 
            scale: 1.15, 
            rotate: 15,
            backgroundColor: 'rgba(0, 255, 136, 0.25)'
          } : {}}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {icon}
        </motion.div>

        <div>
          <h3 style={{
            color: 'white',
            fontSize: isMobile ? '1.5rem' : '1.7rem',
            fontWeight: '600',
            marginBottom: '8px'
          }}>
            {title}
          </h3>

          <p style={{
            color: '#ff4757',
            fontSize: isMobile ? '0.9rem' : '1rem',
            fontStyle: 'italic',
            marginBottom: '18px',
            fontWeight: '500'
          }}>
            {wittySubtitle}
          </p>
          
          <p style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: isMobile ? '0.9rem' : '0.95rem',
            lineHeight: '1.6',
            marginBottom: '25px'
          }}>
            {description}
          </p>

          {/* Features */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '25px'
          }}>
            {features.map((feature, idx) => (
              <span
                key={idx}
                style={{
                  background: 'rgba(0,255,136,0.15)',
                  color: '#00ff88',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: isMobile ? '0.75rem' : '0.8rem',
                  fontWeight: '500'
                }}
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Mobile Preview Button (Option 2) */}
          {isMobile && previewMode === 'button' && (
            <motion.button
              style={{
                background: 'linear-gradient(45deg, #ff4757, #00ff88)',
                border: 'none',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onClick={handlePreviewButton}
              whileTap={{ scale: 0.95 }}
            >
              👁️ {showPreview ? 'Hide Preview' : 'See Live Preview'}
            </motion.button>
          )}

          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#00ff88',
              fontSize: isMobile ? '0.95rem' : '1rem',
              fontWeight: '600'
            }}
            initial={{ x: 0 }}
            whileHover={!isMobile ? { x: 8 } : {}}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span>
              {isMobile ? (
                previewMode === 'tap' ? 'Tap to Preview' :
                previewMode === 'button' ? 'Get This Service' :
                previewMode === 'doubletap' ? 'Double-tap to Preview' :
                'Get This Service'
              ) : (
                isHovered ? 'See Live Preview' : 'Get This Service'
              )}
            </span>
            <motion.span
              style={{ marginLeft: '10px' }}
              animate={{ x: isPreviewVisible ? 8 : 0 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              →
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

  // Custom Cursor
  const CustomCursor = () => (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,136,0.9), rgba(93,173,226,0.4), transparent)',
        pointerEvents: 'none',
        zIndex: 9999,
        x: springX,
        y: springY,
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'screen'
      }}
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  );

  // Background Elements
  const BackgroundElements = ({ count = 25 }) => {
    return useMemo(() => 
      Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() > 0.7 ? '3px' : '2px',
            height: Math.random() > 0.7 ? '3px' : '2px',
            borderRadius: '50%',
            background: i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#5dade2' : '#ff4757',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      )), [count]
    );
  };

  // Main sections
  const sections = {
    landing: (
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'linear-gradient(135deg, #0a0a0a, #1a1a2e, #16213e)',
        overflow: 'hidden',
        paddingTop: '100px'
      }}>
        {/* Enhanced Background with moving elements */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          {/* Animated grid */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,255,136,0.15) 1px, transparent 0)`,
              backgroundSize: '50px 50px',
            }}
            animate={{
              backgroundPosition: ['0px 0px', '50px 50px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Floating orbs */}
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${
                  ['rgba(255,71,87,0.1)', 'rgba(0,255,136,0.1)', 'rgba(93,173,226,0.1)'][i % 3]
                }, transparent)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(40px)',
              }}
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <BackgroundElements count={30} />
        
        <div style={{ textAlign: 'center', zIndex: 10, maxWidth: '900px', padding: '0 20px' }}>
          <InteractiveLogo />
          
          <motion.h1 
            style={{
              color: 'white',
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              fontWeight: '100',
              margin: '40px 0 25px 0',
              letterSpacing: '6px',
              textShadow: '0 0 50px rgba(0,255,136,0.4)',
              lineHeight: '1.1'
            }}
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, delay: 2, ease: [0.23, 1, 0.32, 1] }}
          >
            GLOBAL EXPEDYTE
          </motion.h1>
          
          <motion.div
            style={{ marginBottom: '40px' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.5 }}
          >
            {qrSource !== 'direct' ? (
              <motion.p 
                style={{
                  color: '#ff4757',
                  fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                  fontWeight: '600',
                  margin: '0 0 20px 0',
                  textShadow: '0 0 30px rgba(255,71,87,0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px'
                }}
                animate={{ 
                  textShadow: [
                    '0 0 30px rgba(255,71,87,0.5)',
                    '0 0 50px rgba(255,71,87,0.8)',
                    '0 0 30px rgba(255,71,87,0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚨 BUSTED! 🚨
              </motion.p>
            ) : (
              <motion.p 
                style={{
                  color: '#00ff88',
                  fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                  fontWeight: '300',
                  margin: '0 0 20px 0',
                  textShadow: '0 0 30px rgba(0,255,136,0.4)'
                }}
              >
                Digital Agency That Actually Delivers
              </motion.p>
            )}
          </motion.div>

          {/* QR-specific explosive content */}
          {qrSource !== 'direct' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1, delay: 3.2, type: "spring", stiffness: 100 }}
            >
              {/* Main accusation card */}
              <motion.div
                style={{
                  background: 'linear-gradient(135deg, rgba(255,71,87,0.2), rgba(0,0,0,0.8))',
                  border: '3px solid #ff4757',
                  borderRadius: '25px',
                  padding: '40px',
                  margin: '30px auto',
                  maxWidth: '700px',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 60px rgba(255,71,87,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Animated border */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: '-2px',
                    background: 'linear-gradient(45deg, #ff4757, #00ff88, #5dade2, #ff4757)',
                    borderRadius: '25px',
                    zIndex: -1
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                
                <motion.div
                  style={{ fontSize: '4rem', marginBottom: '20px' }}
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  🕵️‍♂️
                </motion.div>
                
                <motion.h2
                  style={{
                    color: '#ff4757',
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    fontWeight: '800',
                    margin: '0 0 20px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                  animate={{ 
                    textShadow: [
                      '0 0 20px rgba(255,71,87,0.5)',
                      '0 0 40px rgba(255,71,87,0.8)',
                      '0 0 20px rgba(255,71,87,0.5)'
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  "Caught Red-Handed Shopping Around!"
                </motion.h2>
                
                <motion.p style={{
                  color: 'rgba(255,255,255,0.95)',
                  fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                  margin: '0 0 25px 0',
                  lineHeight: '1.6',
                  fontWeight: '400'
                }}>
              “This is what you get for cheating…”  
With that guy who promised you a *logo in 24 hours* 😬  
Or that ‘agency’ that vanished after the deposit cleared.  
<span style={{color: '#00ff88', fontWeight: '600'}}>Nah. We’re not that.</span>  
We build real brands. Smart websites. And campaigns that hit.  
<strong style={{color: '#ff4757'}}>For big corps, bold hustlers, and anyone tired of mid.</strong>
 
                </motion.p>
                
                <motion.div
                  style={{
                    background: 'rgba(0,255,136,0.1)',
                    border: '1px solid rgba(0,255,136,0.3)',
                    borderRadius: '15px',
                    padding: '20px',
                    margin: '25px 0'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 4, duration: 0.8 }}
                >
                  <p style={{
                    color: '#00ff88',
                    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                    margin: '0',
                    fontWeight: '500',
                    textAlign: 'center'
                  }}>
                    💡 <strong>Plot Twist:</strong> You just found the agency that makes your competitors 
                    cry themselves to sleep every night.
                  </p>
                </motion.div>
              </motion.div>

              {/* Action buttons with more personality */}
              <motion.div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '25px',
                  flexWrap: 'wrap',
                  marginTop: '40px'
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.5, duration: 0.8 }}
              >
                <motion.button
                  style={{
                    background: 'linear-gradient(45deg, #ff4757, #ff6b7a)',
                    border: 'none',
                    color: 'white',
                    padding: '18px 35px',
                    borderRadius: '50px',
                    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                    fontWeight: '700',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    boxShadow: '0 10px 30px rgba(255,71,87,0.4)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  whileHover={{ 
                    scale: 1.08,
                    boxShadow: '0 15px 40px rgba(255,71,87,0.6)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSection('services')}
                  animate={{
                    boxShadow: [
                      '0 10px 30px rgba(255,71,87,0.4)',
                      '0 15px 35px rgba(255,71,87,0.6)',
                      '0 10px 30px rgba(255,71,87,0.4)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.span
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                      transform: 'translateX(-100%)'
                    }}
                    animate={{ transform: 'translateX(100%)' }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  🔥 SHOW ME THE MAGIC
                </motion.button>
                
                <motion.button
                  style={{
                    background: 'rgba(0,255,136,0.1)',
                    border: '2px solid #00ff88',
                    color: '#00ff88',
                    padding: '16px 35px',
                    borderRadius: '50px',
                    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)'
                  }}
                  whileHover={{ 
                    backgroundColor: 'rgba(0,255,136,0.2)',
                    scale: 1.05,
                    borderColor: '#4affb8'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSection('contact')}
                >
                  💔 I'M READY TO STOP CHEATING
                </motion.button>
              </motion.div>

              {/* Campaign stats with flair */}
              <motion.div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '30px',
                  marginTop: '40px',
                  flexWrap: 'wrap'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5, duration: 1 }}
              >
                <motion.div
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '15px',
                    padding: '15px 25px',
                    backdropFilter: 'blur(10px)'
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <p style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.9rem',
                    margin: 0,
                    textAlign: 'center'
                  }}>
                    <span style={{color: '#00ff88', fontWeight: '600'}}>SOURCE:</span> {qrSource.toUpperCase()}
                  </p>
                </motion.div>
                
                <motion.div
                  style={{
                    background: 'rgba(255,71,87,0.1)',
                    border: '1px solid rgba(255,71,87,0.3)',
                    borderRadius: '15px',
                    padding: '15px 25px',
                    backdropFilter: 'blur(10px)'
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  <p style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.9rem',
                    margin: 0,
                    textAlign: 'center'
                  }}>
                    🎯 <span style={{color: '#ff4757', fontWeight: '600'}}>SCANNER #{Math.floor(Math.random() * 1000) + 500}</span> TODAY
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            // Enhanced normal visitor experience
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3 }}
            >
              <motion.div
                style={{
                  background: 'linear-gradient(135deg, rgba(0,255,136,0.15), rgba(93,173,226,0.1))',
                  border: '2px solid rgba(0,255,136,0.2)',
                  borderRadius: '20px',
                  padding: '35px',
                  margin: '30px auto',
                  maxWidth: '600px',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 60px rgba(0,255,136,0.2)'
                }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.p style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                  margin: '0 0 25px 0',
                  lineHeight: '1.6',
                  textAlign: 'center'
                }}>
        This is what you get for cheating…
With that guy who promised you a logo in 24 hours 😬
Or that ‘agency’ that ghosted after the deposit.
We build brands, websites and content that actually work.
                </motion.p>
                
                <motion.button
                  style={{
                    background: 'linear-gradient(45deg, #00ff88, #5dade2)',
                    border: 'none',
                    color: 'white',
                    padding: '18px 40px',
                    borderRadius: '50px',
                    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    boxShadow: '0 10px 30px rgba(0,255,136,0.3)'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 15px 40px rgba(0,255,136,0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSection('services')}
                >
                   SEE THE EMPIRE WE'LL BUILD
                </motion.button>
              </motion.div>
            </motion.div>
          )}
          
          {/* Enhanced scroll indicator */}
          <motion.div
            style={{
              color: 'white',
              fontSize: '3rem',
              cursor: 'pointer',
              padding: '30px',
              marginTop: '50px'
            }}
            onClick={() => setCurrentSection('services')}
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            whileHover={{ 
              scale: 1.4, 
              color: '#00ff88',
              textShadow: '0 0 20px rgba(0,255,136,0.8)'
            }}
            whileTap={{ scale: 0.8 }}
          >
            ↓
          </motion.div>
        </div>
      </section>
    ),

    services: (
      <section style={{
        minHeight: '100vh',
        padding: '120px 60px',
        background: 'linear-gradient(135deg, #0a0a0a, #1a1a2e)',
        position: 'relative'
      }}>
        <motion.div 
          style={{
            textAlign: 'center',
            marginBottom: '100px'
          }}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div
            style={{
              fontSize: '3rem',
              marginBottom: '20px'
            }}
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💎
          </motion.div>
          
          <h2 style={{
            color: 'white',
            fontSize: '3.5rem',
            fontWeight: '200',
            margin: '0 0 20px 0'
          }}>
            Our Four Irresistible Services
          </h2>

          <p style={{
            color: '#ff4757',
            fontSize: '1.3rem',
            fontStyle: 'italic',
            margin: '0 0 40px 0'
          }}>
            Hover to see the magic in action
          </p>
          
          <motion.div
            style={{
              width: '120px',
              height: '3px',
              background: 'linear-gradient(90deg, #00ff88, #5dade2, #ff4757)',
              margin: '0 auto 40px'
            }}
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          
          <p style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '1.2rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Four services. Zero BS. Maximum impact.
          </p>
        </motion.div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {servicesData.map((service, index) => (
            <ServiceTile
              key={service.service}
              icon={service.icon}
              title={service.title}
              wittySubtitle={service.wittySubtitle}
              description={service.description}
              service={service.service}
              delay={0.15 * (index + 1)}
              gradient={service.gradient}
              features={service.features}
              projects={service.projects}
              hoverImage={service.hoverImage}
              hoverTitle={service.hoverTitle}
              hoverDescription={service.hoverDescription}
            />
          ))}
        </div>

        <motion.div
          style={{
            textAlign: 'center',
            marginTop: '100px'
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h3 style={{
            color: 'white',
            fontSize: '2.5rem',
            fontWeight: '300',
            margin: '0 0 30px 0'
          }}>
            Ready to stop cheating?
          </h3>
          
          <p style={{
            color: '#00ff88',
            fontSize: '1.3rem',
            fontStyle: 'italic',
            margin: '0 0 40px 0'
          }}>
            Let's make it official.
          </p>

          <div style={{
            display: 'flex',
            gap: '30px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <motion.button
              style={{
                background: 'linear-gradient(45deg, #00ff88, #5dade2)',
                border: 'none',
                color: 'white',
                padding: '20px 40px',
                borderRadius: '60px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: '0 10px 30px rgba(0,255,136,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 15px 40px rgba(0,255,136,0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSection('contact')}
            >
              📞 Book a 10-min Call
            </motion.button>

            <motion.button
              style={{
                background: 'transparent',
                border: '2px solid rgba(255,71,87,0.6)',
                color: '#ff4757',
                padding: '20px 40px',
                borderRadius: '60px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255,71,87,0.1)',
                borderColor: 'rgba(255,71,87,0.8)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSection('contact')}
            >
              📨 Get a Custom Quote
            </motion.button>
          </div>
        </motion.div>
      </section>
    ),

    contact: (
      <section style={{
        minHeight: '100vh',
        padding: '120px 60px',
        background: 'linear-gradient(135deg, #0a0a0a, #1a1a2e, #16213e)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <motion.div
          style={{
            fontSize: '3rem',
            marginBottom: '20px'
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💕
        </motion.div>

        <motion.h2 
          style={{
            color: 'white',
            fontSize: '3.5rem',
            fontWeight: '200',
            textAlign: 'center',
            marginBottom: '20px'
          }}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Ready to Stop Cheating?
        </motion.h2>

        <motion.p
          style={{
            color: '#ff4757',
            fontSize: '1.5rem',
            textAlign: 'center',
            marginBottom: '15px',
            fontStyle: 'italic'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Let's make it official.
        </motion.p>

        <motion.p
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1.2rem',
            textAlign: 'center',
            marginBottom: '60px',
            maxWidth: '600px'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Time to commit to a digital agency that actually delivers. No more browsing around—let's build something amazing together.
        </motion.p>
        
        <motion.form 
          style={{
            maxWidth: '700px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, staggerChildren: 0.1 }}
          onSubmit={handleFormSubmit}
        >
          {/* Name and Email Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <label style={{
                display: 'block',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Name *
              </label>
              <motion.input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                style={{
                  width: '100%',
                  padding: '18px 25px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '2px solid rgba(255,255,255,0.1)',
                  borderRadius: '15px',
                  color: 'white',
                  fontSize: '1.1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                placeholder="Your name"
                whileFocus={{ 
                  scale: 1.02,
                  borderColor: 'rgba(0,255,136,0.6)',
                  boxShadow: '0 0 25px rgba(0,255,136,0.15)'
                }}
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <label style={{
                display: 'block',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Email *
              </label>
              <motion.input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{
                  width: '100%',
                  padding: '18px 25px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '2px solid rgba(255,255,255,0.1)',
                  borderRadius: '15px',
                  color: 'white',
                  fontSize: '1.1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                placeholder="your@email.com"
                whileFocus={{ 
                  scale: 1.02,
                  borderColor: 'rgba(0,255,136,0.6)',
                  boxShadow: '0 0 25px rgba(0,255,136,0.15)'
                }}
                required
              />
            </motion.div>
          </div>

          {/* Company and Service Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <label style={{
                display: 'block',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Company
              </label>
              <motion.input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                style={{
                  width: '100%',
                  padding: '18px 25px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '2px solid rgba(255,255,255,0.1)',
                  borderRadius: '15px',
                  color: 'white',
                  fontSize: '1.1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                placeholder="Your company"
                whileFocus={{ 
                  scale: 1.02,
                  borderColor: 'rgba(0,255,136,0.6)',
                  boxShadow: '0 0 25px rgba(0,255,136,0.15)'
                }}
              />
            </motion.div>
            
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <label style={{
                display: 'block',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                What caught your eye?
              </label>
              <motion.select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                style={{
                  width: '100%',
                  padding: '18px 25px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '2px solid rgba(255,255,255,0.1)',
                  borderRadius: '15px',
                  color: 'white',
                  fontSize: '1.1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                whileFocus={{ 
                  scale: 1.02,
                  borderColor: 'rgba(0,255,136,0.6)',
                  boxShadow: '0 0 25px rgba(0,255,136,0.15)'
                }}
              >
                <option value="" style={{ background: '#1a1a2e', color: 'white' }}>Pick your poison</option>
                {servicesData.map(service => (
                  <option 
                    key={service.service} 
                    value={service.service}
                    style={{ background: '#1a1a2e', color: 'white' }}
                  >
                    {service.title}
                  </option>
                ))}
              </motion.select>
            </motion.div>
          </div>
          
          {/* Message Field */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Tell us your vision *
            </label>
            <motion.textarea
              rows={6}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              style={{
                width: '100%',
                padding: '18px 25px',
                background: 'rgba(255,255,255,0.06)',
                border: '2px solid rgba(255,255,255,0.1)',
                borderRadius: '15px',
                color: 'white',
                fontSize: '1.1rem',
                outline: 'none',
                resize: 'vertical',
                minHeight: '150px',
                fontFamily: 'inherit',
                transition: 'all 0.3s ease'
              }}
              placeholder="What's your dream project? Don't hold back—we love ambitious ideas..."
              whileFocus={{ 
                scale: 1.02,
                borderColor: 'rgba(0,255,136,0.6)',
                boxShadow: '0 0 25px rgba(0,255,136,0.15)'
              }}
              required
            />
          </motion.div>
          
          {/* Submit Button */}
          <motion.button
            type="submit"
            style={{
              padding: '22px 50px',
              background: 'linear-gradient(45deg, #ff4757, #00ff88)',
              border: 'none',
              borderRadius: '60px',
              color: 'white',
              fontSize: '1.3rem',
              fontWeight: '700',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginTop: '30px',
              boxShadow: '0 15px 40px rgba(255,71,87,0.3)'
            }}
            whileHover={{ 
              scale: 1.05, 
              y: -3,
              boxShadow: '0 20px 50px rgba(255,71,87,0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Let's Make It Official 💍
          </motion.button>
        </motion.form>
        
        {/* Contact Info */}
        <motion.div
          style={{
            marginTop: '60px',
            padding: '30px 40px',
            background: 'linear-gradient(45deg, rgba(255,71,87,0.12), rgba(0,255,136,0.12))',
            border: '2px solid rgba(255,71,87,0.25)',
            borderRadius: '20px',
            textAlign: 'center'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <h3 style={{
            color: '#ff4757',
            fontSize: '1.4rem',
            margin: '0 0 15px 0',
            fontWeight: '600'
          }}>
            Too shy to fill out forms?
          </h3>
          <p style={{
            color: 'white',
            fontSize: '1.2rem',
            margin: 0,
            fontWeight: '400'
          }}>
            Hit us up directly: info@globalexpedyte.co.za
          </p>
        </motion.div>
        
        {/* Success Overlay */}
        <AnimatePresence>
          {formSubmitted && (
            <motion.div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(5px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                  border: '3px solid #00ff88',
                  borderRadius: '25px',
                  padding: '60px',
                  textAlign: 'center',
                  maxWidth: '500px'
                }}
                initial={{ scale: 0, rotate: 270 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -270 }}
                transition={{ type: "spring", duration: 0.8 }}
              >
                <motion.div
                  style={{
                    fontSize: '5rem',
                    marginBottom: '30px'
                  }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.6, repeat: 3 }}
                >
                  💕
                </motion.div>
                <h3 style={{
                  color: '#00ff88',
                  fontSize: '2.2rem',
                  margin: '0 0 20px 0',
                  fontWeight: '700'
                }}>
                  Welcome to the Family!
                </h3>
                <p style={{
                  color: 'white',
                  fontSize: '1.3rem',
                  margin: 0,
                  opacity: 0.9
                }}>
                  We knew you'd come around. Expect a reply within 24 hours—loyalty pays off! 😉
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    )
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a, #1a1a2e)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Loading Animation */}
        <motion.div
          style={{
            fontSize: '4rem',
            marginBottom: '30px'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          👀
        </motion.div>
        
        <motion.div
          style={{
            width: '80px',
            height: '80px',
            border: '4px solid rgba(255,71,87,0.2)',
            borderTop: '4px solid #ff4757',
            borderRadius: '50%'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.h3
          style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: '300',
            marginTop: '30px',
            letterSpacing: '2px'
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {qrSource !== 'direct' ? 'Preparing your surprise...' : 'Loading Experience...'}
        </motion.h3>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a, #1a1a2e)',
      color: 'white',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <CustomCursor />
      <CaughtYaModal />
      
      {/* Enhanced Navigation */}
      <motion.nav 
        style={{
          position: 'fixed',
          top: '30px',
          right: '30px',
          zIndex: 1500
        }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.button
          style={{
            background: 'rgba(255,255,255,0.12)',
            border: '2px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            color: 'white',
            fontSize: '1.4rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(25px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}
          whileHover={{ 
            scale: 1.15, 
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderColor: 'rgba(255,71,87,0.4)'
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setNavOpen(!navOpen)}
        >
          ☰
        </motion.button>
        
        <AnimatePresence>
          {navOpen && (
            <motion.div
              style={{
                position: 'absolute',
                top: '70px',
                right: '0',
                background: 'rgba(0,0,0,0.92)',
                backdropFilter: 'blur(25px)',
                border: '2px solid rgba(255,255,255,0.15)',
                borderRadius: '20px',
                padding: '25px',
                minWidth: '180px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
              }}
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.8 }}
              transition={{ type: "spring", duration: 0.4 }}
            >
              {['landing', 'services', 'contact'].map((section, index) => (
                <motion.button
                  key={section}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '15px 25px',
                    background: 'transparent',
                    border: 'none',
                    color: currentSection === section ? '#ff4757' : 'white',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    borderRadius: '12px',
                    marginBottom: '8px',
                    textTransform: 'capitalize',
                    fontWeight: '500'
                  }}
                  onClick={() => {
                    setCurrentSection(section);
                    setNavOpen(false);
                  }}
                 initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    backgroundColor: 'rgba(255,71,87,0.15)',
                    color: '#ff4757',
                    x: 5
                  }}
                >
                  {section === 'landing' ? 'Home' : section}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {sections[currentSection]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GlobalExpedyte;