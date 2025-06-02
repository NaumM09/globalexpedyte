import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation, useMotionValue, useSpring } from 'framer-motion';

// Mock logo - replace with actual import
const logo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-family='Arial,sans-serif' font-size='36' font-weight='bold' text-anchor='middle' dy='0.35em' fill='white'%3EGE%3C/svg%3E";

const GlobalExpedyte = () => {
  const [currentSection, setCurrentSection] = useState('landing');
  const [isLoading, setIsLoading] = useState(true);
  const [logoClicks, setLogoClicks] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const logoControls = useAnimation();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 30 });

  // Enhanced mouse tracking with throttling
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
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Handle form data changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Email submission handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Build email content
    let emailBody = `Name: ${formData.name}\n`;
    emailBody += `Email: ${formData.email}\n`;
    if (selectedService) emailBody += `Service Interest: ${selectedService}\n`;
    emailBody += `\nMessage:\n${formData.message}`;
    
    // Create mailto link
    const subject = selectedService ? `Service Inquiry: ${selectedService}` : 'General Inquiry';
    const mailtoLink = `mailto:info@globalexpedyte.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setSelectedService('');
    }, 3000);
  };

  // Memoized service data with project examples
  const servicesData = useMemo(() => [
    {
      icon: "🎨",
      title: "Web Design",
      description: "Beautiful, responsive websites that captivate and convert your audience with cutting-edge design and seamless user experience that drives results.",
      service: "web-design",
      gradient: "linear-gradient(135deg, rgba(255,71,87,0.3), rgba(0,255,136,0.1))",
      projects: [
        {
          title: "Trader Stream",
          image: "https://i.ibb.co/hRB3TgxN/logo2.png",
          description: "Trading Streaming Platfrom"
        },
        {
          title: "Portfolio Website",
          image: "https://i.ibb.co/HfYVVX99/portfolio.png",
          description: "Creative showcase design"
        },
        {
          title: "Corporate Landing",
          image: "https://i.ibb.co/4gmSdkBw/logo4-1.png",
          description: "Professional business site"
        }
      ]
    },
    {
      icon: "⚡",
      title: "Software Engineering", 
      description: "Robust, scalable applications built with modern technologies, best practices, and enterprise-grade architecture for lasting performance.",
      service: "software-engineering",
      gradient: "linear-gradient(135deg, rgba(0,255,136,0.3), rgba(93,173,226,0.1))",
      projects: [
        {
          title: "Task Management App",
          image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
          description: "Team productivity solution"
        },
        {
          title: "Analytics Dashboard",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
          description: "Real-time data visualization"
        },
        {
          title: "Mobile Banking App",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
          description: "Secure financial platform"
        }
      ]
    },
    {
      icon: "✨",
      title: "Branding",
      description: "Complete brand identity solutions that make your business stand out in the market with memorable visual storytelling and strategic positioning.",
      service: "branding", 
      gradient: "linear-gradient(135deg, rgba(93,173,226,0.3), rgba(255,71,87,0.1))",
      projects: [
        {
          image: "https://i.ibb.co/kgqtxBYt/Moss-Lekota-Finance-Logos.png",
          description: "Purchase Order Funding & Personal Loans"
        },
        {
          image: "https://i.ibb.co/C351Mdk0/logo-1.png",
          description: "Fintech Social Media Campaigns"
        },
        {
          image: "https://i.ibb.co/hFFCnw3h/logo3.png",
          description: "Web Development"
        }
      ]
    },
    {
      icon: "🚀",
      title: "Custom Solutions",
      description: "Tailored digital solutions designed specifically for your unique business needs, innovative requirements, and future growth strategies.",
      service: "custom",
      gradient: "linear-gradient(135deg, rgba(255,71,87,0.2), rgba(0,255,136,0.2))",
      projects: [
        {
          title: "IoT Control System",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
          description: "Smart device management"
        },
        {
          title: "AI Content Generator",
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
          description: "Machine learning platform"
        },
        {
          title: "Blockchain Solution",
          image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
          description: "Decentralized application"
        }
      ]
    }
  ], []);



  // Advanced logo animations with improved performance 
  const handleLogoClick = useCallback(async () => {
    const newClickCount = logoClicks + 1;
    setLogoClicks(newClickCount);

    if (newClickCount === 1) {
      await logoControls.start({
        scale: [1, 1.3, 1.1],
        rotate: [0, 360, 0],
        background: [
          'linear-gradient(45deg, #ff4757, #00ff88, #5dade2)',
          'linear-gradient(45deg, #5dade2, #ff4757, #00ff88)',
          'linear-gradient(45deg, #00ff88, #5dade2, #ff4757)',
          'linear-gradient(45deg, #ff4757, #00ff88, #5dade2)'
        ],
        transition: { duration: 0.8, ease: "easeInOut" }
      });
    } else if (newClickCount >= 2) {
      await logoControls.start({
        scale: [1, 0.8, 1.5, 1],
        rotate: [0, -180, 180, 0],
        borderRadius: ['30px', '50%', '20px', '30px'],
        transition: { duration: 1.2, ease: "backInOut" }
      });
      setLogoClicks(0);
    }
    
    const resetTimer = setTimeout(() => setLogoClicks(0), 500);
    return () => clearTimeout(resetTimer);
  }, [logoClicks, logoControls]);

  const InteractiveLogo = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div 
        className="logo-container"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          position: 'relative',
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        {/* Floating particles */}
        <AnimatePresence>
          {isHovered && (
            <>
              {Array.from({ length: 8 }, (_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: `linear-gradient(45deg, ${
                      ['#ff4757', '#00ff88', '#5dade2'][i % 3]
                    }, ${['#5dade2', '#ff4757', '#00ff88'][i % 3]})`
                  }}
                  initial={{ 
                    scale: 0, 
                    x: 60, 
                    y: 60,
                    opacity: 0 
                  }}
                  animate={{ 
                    scale: [0, 1, 0],
                    x: 60 + Math.cos(i * 45 * Math.PI / 180) * 80,
                    y: 60 + Math.sin(i * 45 * Math.PI / 180) * 80,
                    opacity: [0, 1, 0],
                    rotate: 360
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.1,
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
            width: '120px',
            height: '120px',
            borderRadius: '30px',
            background: 'linear-gradient(45deg, #ff4757, #00ff88, #5dade2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0, 255, 136, 0.3)'
          }}
          animate={logoControls}
          whileHover={{ 
            scale: 1.1, 
            rotate: 5,
            boxShadow: '0 20px 40px rgba(0, 255, 136, 0.4)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogoClick}
          initial={{ scale: 0.5, rotate: 180, opacity: 0 }}
          transition={{ duration: 1.5, ease: "backOut", delay: 0.5 }}
        >
          {/* Shine effect */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              transform: 'skewX(-25deg)'
            }}
            animate={{
              x: ['0%', '300%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 3
            }}
          />
          
          {/* Ripple on click */}
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.5)',
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={logoClicks > 0 ? { scale: 2, opacity: 0 } : { scale: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Logo Image */}
          <img 
            src={logo} 
            alt="GE logo"
            style={{
              width: '80px',
              height: '80px',
              maxWidth: '80px',
              maxHeight: '80px',
              objectFit: 'contain',
              objectPosition: 'center',
              filter: 'brightness(0) invert(1)',
              display: 'block'
            }}
          />
        </motion.div>
      </motion.div>
    );
  };

  const ServiceTile = ({ icon, title, description, service, delay, gradient, index, projects }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentProject, setCurrentProject] = useState(0);
    
    // Cycle through projects when hovered
    useEffect(() => {
      if (!isHovered || !projects) return;
      
      const interval = setInterval(() => {
        setCurrentProject(prev => (prev + 1) % projects.length);
      }, 2000);
      
      return () => clearInterval(interval);
    }, [isHovered, projects]);
    
    return (
      <motion.div
        style={{
          position: 'relative',
          cursor: 'pointer'
        }}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{ y: -10 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          setSelectedService(service);
          setCurrentSection('contact');
        }}
        onHoverStart={() => {
          setIsHovered(true);
          setCurrentProject(0);
        }}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Project Preview Overlay */}
        <AnimatePresence>
          {isHovered && projects && (
            <motion.div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 100,
                pointerEvents: 'none',
                background: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(2px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                key={currentProject}
                style={{
                  width: '70vw',
                  maxWidth: '800px',
                  height: '50vh',
                  maxHeight: '500px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 255, 136, 0.2)',
                  border: '2px solid rgba(0, 255, 136, 0.3)'
                }}
                initial={{ 
                  opacity: 0, 
                  scale: 0.7,
                  rotateY: -15
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotateY: 0
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 1.1,
                  rotateY: 15
                }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {/* Project Image */}
                <motion.div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${projects[currentProject].image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}
                  animate={{
                    scale: 1.05
                  }}
                  transition={{ duration: 8, ease: "easeInOut" }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(45deg, rgba(0,255,136,0.1), transparent, rgba(255,71,87,0.1))',
                    mixBlendMode: 'overlay'
                  }} />
                  
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))'
                  }} />
                </motion.div>

                {/* Project Info */}
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '40px',
                    color: 'white',
                    zIndex: 10
                  }}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <h3 style={{
                    fontSize: '2.5rem',
                    fontWeight: '300',
                    margin: '0 0 12px 0',
                    lineHeight: '1.2'
                  }}>
                    {projects[currentProject].title}
                  </h3>
                  
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#d1d5db',
                    margin: 0,
                    maxWidth: '400px',
                    lineHeight: '1.5'
                  }}>
                    {projects[currentProject].description}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Card */}
        <motion.div
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '40px 30px',
            height: '300px',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)'
          }}
          whileHover={{ 
            backgroundColor: 'rgba(255,255,255,0.08)',
            borderColor: 'rgba(0, 255, 136, 0.3)'
          }}
          transition={{ duration: 0.4 }}
        >
          {/* Background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: gradient,
            opacity: 0.1
          }} />

          {/* Icon */}
          <motion.div
            style={{
              fontSize: '3rem',
              marginBottom: '20px',
              padding: '15px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              display: 'inline-block'
            }}
            whileHover={{ 
              scale: 1.1, 
              rotate: 12,
              backgroundColor: 'rgba(0, 255, 136, 0.2)'
            }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {icon}
          </motion.div>

          {/* Content */}
          <div>
            <h3 style={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '15px'
            }}>
              {title}
            </h3>
            
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              {description}
            </p>

            {/* Action */}
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#00ff88',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span>{isHovered && projects ? 'View Examples' : 'Explore'}</span>
              <motion.span
                style={{ marginLeft: '8px' }}
                animate={{ x: isHovered ? 5 : 0 }}
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

  const CustomCursor = () => {
    return (
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,136,0.8), transparent)',
          pointerEvents: 'none',
          zIndex: 9999,
          x: springX,
          y: springY,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    );
  };

  const BackgroundElements = ({ count = 20 }) => {
    return useMemo(() => 
      Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            background: '#00ff88',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      )), [count]
    );
  };

  const sections = {
    landing: (
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'linear-gradient(135deg, #0a0a0a, #1a1a2e, #16213e)',
        overflow: 'hidden'
      }}>
        <BackgroundElements />
        
        <div style={{
          textAlign: 'center',
          zIndex: 10
        }}>
          <InteractiveLogo />
          
          <motion.h1 
            style={{
              color: 'white',
              fontSize: '4rem',
              fontWeight: '300',
              margin: '30px 0 20px 0',
              letterSpacing: '3px'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            GLOBAL EXPEDYTE
          </motion.h1>
          
          <motion.p 
            style={{
              color: '#00ff88',
              fontSize: '1.5rem',
              fontWeight: '300',
              margin: '0 0 50px 0'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            Crafting Digital Excellence
          </motion.p>
          
          <motion.div
            style={{
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer',
              padding: '20px'
            }}
            onClick={() => setCurrentSection('services')}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            ↓
          </motion.div>
        </div>
      </section>
    ),

    services: (
      <section style={{
        minHeight: '100vh',
        padding: '100px 50px',
        background: 'linear-gradient(135deg, #0a0a0a, #1a1a2e)',
        position: 'relative'
      }}>
        <motion.div 
          style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{
            color: 'white',
            fontSize: '3rem',
            fontWeight: '300',
            margin: '0 0 30px 0'
          }}>
            Our Services
          </h2>
          
          <motion.div
            style={{
              width: '96px',
              height: '2px',
              background: 'linear-gradient(90deg, #00ff88, #5dade2)',
              margin: '0 auto 30px'
            }}
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1.2rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Transforming ideas into digital experiences with precision, creativity, and innovation
          </p>
        </motion.div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {servicesData.map((service, index) => (
            <ServiceTile
              key={service.service}
              icon={service.icon}
              title={service.title}
              description={service.description}
              service={service.service}
              delay={0.1 * (index + 1)}
              gradient={service.gradient}
              index={index}
              projects={service.projects}
            />
          ))}
        </div>

        <motion.div
          style={{
            textAlign: 'center',
            marginTop: '80px'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            style={{
              background: 'transparent',
              border: '2px solid rgba(0,255,136,0.3)',
              color: 'white',
              padding: '15px 40px',
              borderRadius: '50px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              fontWeight: '500'
            }}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: 'rgba(0,255,136,0.1)',
              borderColor: 'rgba(0,255,136,0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentSection('contact')}
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </section>
    ),

    contact: (
      <section style={{
        minHeight: '100vh',
        padding: '100px 50px',
        background: 'linear-gradient(135deg, #0a0a0a, #1a1a2e, #16213e)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <motion.h2 
          style={{
            color: 'white',
            fontSize: '3rem',
            fontWeight: '300',
            textAlign: 'center',
            marginBottom: '50px'
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Let's Create Something Amazing
        </motion.h2>
        
        <motion.form 
          style={{
            maxWidth: '600px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '25px'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
          onSubmit={handleFormSubmit}
        >
          {/* Name Field */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
          >
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '500',
              marginBottom: '8px',
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
                padding: '15px 20px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              placeholder="Enter your name"
              whileFocus={{ 
                scale: 1.02,
                borderColor: 'rgba(0,255,136,0.5)',
                boxShadow: '0 0 20px rgba(0,255,136,0.1)'
              }}
              required
            />
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '500',
              marginBottom: '8px',
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
                padding: '15px 20px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              placeholder="Enter your email"
              whileFocus={{ 
                scale: 1.02,
                borderColor: 'rgba(0,255,136,0.5)',
                boxShadow: '0 0 20px rgba(0,255,136,0.1)'
              }}
              required
            />
          </motion.div>
          
          {/* Service Selection */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '500',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Service Interest
            </label>
            <motion.select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              style={{
                width: '100%',
                padding: '15px 20px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              whileFocus={{ 
                scale: 1.02,
                borderColor: 'rgba(0,255,136,0.5)',
                boxShadow: '0 0 20px rgba(0,255,136,0.1)'
              }}
            >
              <option value="" style={{ background: '#1a1a2e', color: 'white' }}>Select a service</option>
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
          
          {/* Message Field */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '500',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Message *
            </label>
            <motion.textarea
              rows={5}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              style={{
                width: '100%',
                padding: '15px 20px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                resize: 'vertical',
                minHeight: '120px',
                fontFamily: 'inherit',
                transition: 'all 0.3s ease'
              }}
              placeholder="Tell us about your project..."
              whileFocus={{ 
                scale: 1.02,
                borderColor: 'rgba(0,255,136,0.5)',
                boxShadow: '0 0 20px rgba(0,255,136,0.1)'
              }}
              required
            />
          </motion.div>
          
          {/* Submit Button */}
          <motion.button
            type="submit"
            style={{
              padding: '18px 40px',
              background: 'linear-gradient(45deg, #00ff88, #5dade2)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginTop: '20px'
            }}
            whileHover={{ 
              scale: 1.02, 
              y: -2,
              boxShadow: '0 10px 30px rgba(0,255,136,0.3)'
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Send Message
          </motion.button>
        </motion.form>
        
        {/* Email Info */}
        <motion.div
          style={{
            marginTop: '40px',
            padding: '20px 30px',
            background: 'linear-gradient(45deg, rgba(0,255,136,0.1), rgba(93,173,226,0.1))',
            border: '1px solid rgba(0,255,136,0.2)',
            borderRadius: '15px',
            textAlign: 'center'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <h3 style={{
            color: '#00ff88',
            fontSize: '1.2rem',
            margin: '0 0 10px 0',
            fontWeight: '500'
          }}>
            Email will be sent to:
          </h3>
          <p style={{
            color: 'white',
            fontSize: '1.1rem',
            margin: 0,
            fontWeight: '300'
          }}>
            info@globalexpedyte.co.za
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
                background: 'rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                  border: '2px solid #00ff88',
                  borderRadius: '20px',
                  padding: '40px',
                  textAlign: 'center',
                  maxWidth: '400px'
                }}
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -180 }}
                transition={{ type: "spring", duration: 0.6 }}
              >
                <motion.div
                  style={{
                    fontSize: '4rem',
                    marginBottom: '20px'
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                >
                  🚀
                </motion.div>
                <h3 style={{
                  color: '#00ff88',
                  fontSize: '1.8rem',
                  margin: '0 0 15px 0',
                  fontWeight: '600'
                }}>
                  Message Sent!
                </h3>
                <p style={{
                  color: 'white',
                  fontSize: '1.1rem',
                  margin: 0,
                  opacity: 0.9
                }}>
                  We'll get back to you within 24 hours.
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
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <motion.div
          style={{
            width: '60px',
            height: '60px',
            border: '3px solid rgba(0,255,136,0.3)',
            borderTop: '3px solid #00ff88',
            borderRadius: '50%'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a, #1a1a2e)',
      color: 'white',
      overflow: 'hidden'
    }}>
      <CustomCursor />
      
      {/* Navigation */}
      <motion.nav 
        style={{
          position: 'fixed',
          top: '30px',
          right: '30px',
          zIndex: 1000
        }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            color: 'white',
            fontSize: '1.2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(20px)'
          }}
          whileHover={{ 
            scale: 1.1, 
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderColor: 'rgba(0,255,136,0.3)'
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
                top: '60px',
                right: '0',
                background: 'rgba(0,0,0,0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px',
                minWidth: '150px'
              }}
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
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
                    color: currentSection === section ? '#00ff88' : 'white',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    borderRadius: '8px',
                    marginBottom: '5px',
                    textTransform: 'capitalize'
                  }}
                  onClick={() => {
                    setCurrentSection(section);
                    setNavOpen(false);
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    backgroundColor: 'rgba(0,255,136,0.1)',
                    color: '#00ff88'
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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          {sections[currentSection]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GlobalExpedyte;

  