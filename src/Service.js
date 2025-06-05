import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Services = ({ setSelectedService, setCurrentSection }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [portfolioService, setPortfolioService] = useState(null);

  // Refined services data with minimal approach
  const servicesData = useMemo(() => [
    {
      number: "01",
      title: "Digital Architecture",
      subtitle: "WEB DESIGN & DEVELOPMENT",
      description: "Precision-engineered digital experiences that perform as beautifully as they appear. Every interaction serves a purpose.",
      technicalSpecs: [
        "Mobile-First Engineering",
        "Performance Optimization", 
        "Conversion Architecture",
        "SEO Foundation"
      ],
      service: "web-design",
      showcase: {
        title: "Trading Platform Interface",
        description: "Real-time data visualization with microsecond precision",
        metrics: ["99.9% Uptime", "< 100ms Load", "45% Conversion Lift"]
      },
      portfolio: [
        {
          title: "FinTech Dashboard",
          type: "Web Application",
          description: "Real-time trading interface with advanced analytics",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format",
          metrics: ["10K+ Users", "Real-time Data", "Zero Downtime"]
        },
        {
          title: "E-Commerce Platform",
          type: "Retail Solution",
          description: "Conversion-optimized shopping experience",
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format",
          metrics: ["300% ROI", "Mobile First", "Global Scale"]
        },
        {
          title: "Healthcare Portal",
          type: "Digital Health",
          description: "Patient management system with HIPAA compliance",
          image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop&auto=format",
          metrics: ["HIPAA Compliant", "24/7 Uptime", "Secure Access"]
        }
      ]
    },
    {
      number: "02", 
      title: "System Engineering",
      subtitle: "SOFTWARE DEVELOPMENT",
      description: "Scalable architectures built to withstand growth. Clean code that commits to excellence, not technical debt.",
      technicalSpecs: [
        "Scalable Infrastructure",
        "Clean Architecture",
        "Future-Proof Design",
        "Zero-Downtime Deployment"
      ],
      service: "software-engineering",
      showcase: {
        title: "Financial Analytics Engine",
        description: "Processing millions of transactions with mathematical precision",
        metrics: ["10M+ Records/Hour", "Real-time Processing", "Enterprise Grade"]
      },
      portfolio: [
        {
          title: "Payment Processing System",
          type: "Financial Technology",
          description: "High-frequency transaction processing engine",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&auto=format",
          metrics: ["1M+ TPS", "99.99% Uptime", "Global Reach"]
        },
        {
          title: "Data Analytics Platform",
          type: "Business Intelligence",
          description: "Machine learning driven insights engine",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format",
          metrics: ["Predictive AI", "Real-time", "Custom Models"]
        },
        {
          title: "IoT Management System",
          type: "Internet of Things",
          description: "Device management and monitoring platform",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&auto=format",
          metrics: ["10K+ Devices", "Edge Computing", "Secure Protocol"]
        }
      ]
    },
    {
      number: "03",
      title: "Brand Systems",
      subtitle: "IDENTITY & STRATEGY", 
      description: "Cohesive visual languages that speak before words. Brand systems engineered for recognition and recall.",
      technicalSpecs: [
        "Visual Identity Systems",
        "Brand Architecture",
        "Recognition Engineering",
        "Cross-Platform Consistency"
      ],
      service: "branding",
      showcase: {
        title: "Corporate Identity System",
        description: "Complete brand ecosystem designed for global deployment",
        metrics: ["15+ Touchpoints", "Brand Recognition +80%", "Market Presence"]
      },
      portfolio: [
        {
          title: "Tech Startup Rebrand",
          type: "Complete Identity",
          description: "Full brand transformation for Series A company",
          image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&auto=format",
          metrics: ["Brand Value +200%", "Market Recognition", "Global Launch"]
        },
        {
          title: "Financial Services Identity",
          type: "Corporate Branding",
          description: "Trust-focused brand system for wealth management",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop&auto=format",
          metrics: ["Client Trust +150%", "Premium Positioning", "Regulatory Compliant"]
        },
        {
          title: "Consumer Product Launch",
          type: "Product Branding",
          description: "Market entry strategy and visual identity",
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&auto=format",
          metrics: ["Market Entry", "Shelf Presence", "Consumer Recall"]
        }
      ]
    },
    {
      number: "04",
      title: "Custom Solutions",
      subtitle: "BESPOKE DESIGN",
      description: "One-of-one solutions for unique challenges. Where templates end, our engineering begins.",
      technicalSpecs: [
        "Bespoke Engineering",
        "Custom Methodologies",
        "Unique Problem Solving",
        "Proprietary Solutions"
      ],
      service: "custom-design",
      showcase: {
        title: "Interactive Design System",
        description: "Custom visualization engine for complex data storytelling",
        metrics: ["Custom Built", "Interactive Elements", "Data Driven"]
      },
      portfolio: [
        {
          title: "Interactive Installation",
          type: "Digital Art",
          description: "Museum-grade interactive experience design",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
          metrics: ["Visitor Engagement", "Award Winning", "Cultural Impact"]
        },
        {
          title: "AR Training Platform",
          type: "Augmented Reality",
          description: "Immersive training solution for complex procedures",
          image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=600&h=400&fit=crop&auto=format",
          metrics: ["Learning +300%", "Cost Reduction", "Safety Improved"]
        },
        {
          title: "Data Visualization Tool",
          type: "Custom Software",
          description: "Proprietary analytics interface for research team",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format",
          metrics: ["Research Velocity", "Data Insights", "Publication Ready"]
        }
      ]
    }
  ], []);

  // Auto-advance services every 6 seconds
  useEffect(() => {
    if (!showPortfolio) {
      const interval = setInterval(() => {
        setSelectedIndex(prev => (prev + 1) % servicesData.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [showPortfolio, servicesData.length]); // Fixed: Added servicesData.length to dependencies

  // Helper function to get brand color by index
  const getBrandColor = useCallback((index) => {
    const colors = ['#ff3131', '#5ce1e6', '#43f8ac'];
    return colors[index % colors.length];
  }, []);

  // Floating text marquee
  const FloatingMarquee = ({ text, direction = 1 }) => {
    return (
      <motion.div
        style={{
          position: 'absolute',
          width: '200%',
          fontSize: '0.8rem',
          fontWeight: '300',
          color: 'rgba(0,0,0,0.08)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
        animate={{
          x: direction > 0 ? ['100%', '-100%'] : ['-100%', '100%']
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {Array.from({ length: 10 }, (_, i) => `${text} • `).join('')}
      </motion.div>
    );
  };

  // Portfolio showcase modal
  const PortfolioShowcase = () => {
    if (!portfolioService) return null;

    return (
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(20px, 5vw, 40px)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          setShowPortfolio(false);
          setPortfolioService(null);
        }}
      >
        <motion.div
          style={{
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.1)',
            maxWidth: '1200px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            boxShadow: '0 60px 120px rgba(0,0,0,0.1)',
            margin: '0 auto'
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{
            padding: 'clamp(30px, 5vw, 60px) clamp(20px, 5vw, 60px) clamp(20px, 3vw, 40px)',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            position: 'relative'
          }}>
            {/* Top accent line */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 'clamp(20px, 5vw, 60px)',
              right: 'clamp(20px, 5vw, 60px)',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #5ce1e6, transparent)',
              opacity: 0.6
            }} />
            
            <motion.button
              style={{
                position: 'absolute',
                top: 'clamp(15px, 3vw, 30px)',
                right: 'clamp(15px, 3vw, 30px)',
                background: 'transparent',
                border: 'none',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                cursor: 'pointer',
                color: '#000',
                width: 'clamp(30px, 5vw, 40px)',
                height: 'clamp(30px, 5vw, 40px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.05)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowPortfolio(false);
                setPortfolioService(null);
              }}
            >
              ×
            </motion.button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(10px, 3vw, 20px)',
              marginBottom: 'clamp(15px, 3vw, 30px)'
            }}>
              <span style={{
                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                fontWeight: '300',
                color: '#5ce1e6',
                letterSpacing: '3px',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                {portfolioService.number}
              </span>
              <div style={{
                width: 'clamp(20px, 5vw, 40px)',
                height: '2px',
                background: 'linear-gradient(90deg, #ff3131, #43f8ac)',
                opacity: 0.6
              }} />
            </div>

            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              fontWeight: '200',
              color: '#000',
              margin: '0 0 15px 0',
              letterSpacing: '-1px',
              lineHeight: '0.9',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              {portfolioService.title}
              <br />
              <span style={{
                fontSize: 'clamp(0.8rem, 2vw, 1.5rem)',
                opacity: 0.6,
                fontWeight: '300',
                color: '#ff3131'
              }}>
                PORTFOLIO
              </span>
            </h2>

            <p style={{
              color: 'rgba(0,0,0,0.6)',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              margin: 0,
              lineHeight: '1.6',
              maxWidth: '600px',
              fontWeight: '300'
            }}>
              Selected projects showcasing our {portfolioService.subtitle.toLowerCase()} expertise
            </p>
          </div>

          {/* Portfolio Grid */}
          <div style={{
            padding: 'clamp(30px, 5vw, 60px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: 'clamp(20px, 4vw, 40px)'
          }}>
            {portfolioService.portfolio.map((project, index) => (
              <motion.div
                key={index}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  padding: 'clamp(20px, 4vw, 40px)',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                {/* Project Image */}
                <div style={{
                  width: '100%',
                  height: 'clamp(150px, 20vw, 200px)',
                  marginBottom: 'clamp(15px, 3vw, 25px)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img 
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                    }}
                  />
                  {/* Overlay gradient */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.1))',
                    pointerEvents: 'none'
                  }} />
                </div>

                <div style={{
                  fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                  color: getBrandColor(index),
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: 'clamp(10px, 2vw, 15px)',
                  fontWeight: '400'
                }}>
                  {project.type}
                </div>

                <h3 style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                  fontWeight: '300',
                  color: '#000',
                  margin: '0 0 clamp(10px, 2vw, 15px) 0',
                  lineHeight: '1.2',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  {project.title}
                </h3>

                <p style={{
                  color: 'rgba(0,0,0,0.7)',
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  margin: '0 0 clamp(20px, 3vw, 30px) 0',
                  lineHeight: '1.6',
                  fontWeight: '300'
                }}>
                  {project.description}
                </p>

                {/* Metrics */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(6px, 1.5vw, 8px)'
                }}>
                  {project.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      style={{
                        fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                        color: 'rgba(0,0,0,0.5)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        position: 'relative',
                        paddingLeft: 'clamp(12px, 2vw, 15px)',
                        fontWeight: '300'
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '4px',
                        height: '4px',
                        background: getBrandColor(idx),
                        borderRadius: '50%'
                      }} />
                      {metric}
                    </div>
                  ))}
                </div>

                {/* Bottom accent */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 'clamp(20px, 4vw, 40px)',
                  right: 'clamp(20px, 4vw, 40px)',
                  height: '2px',
                  background: `linear-gradient(90deg, transparent, ${getBrandColor(index)}, transparent)`,
                  opacity: 0.3
                }} />
              </motion.div>
            ))}
          </div>

          {/* Footer CTA */}
          <div style={{
            padding: 'clamp(20px, 4vw, 40px) clamp(30px, 5vw, 60px) clamp(30px, 5vw, 60px)',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            textAlign: 'center'
          }}>
            <motion.button
              style={{
                background: 'linear-gradient(135deg, #ff3131, #5ce1e6)',
                border: 'none',
                color: '#fff',
                padding: 'clamp(15px, 3vw, 20px) clamp(30px, 5vw, 50px)',
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                fontWeight: '400',
                cursor: 'pointer',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedService && setSelectedService(portfolioService.service);
                setCurrentSection && setCurrentSection('contact');
                setShowPortfolio(false);
                setPortfolioService(null);
              }}
            >
              Start Similar Project
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Service showcase component
  const ServiceShowcase = ({ service, index, isActive }) => (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={`service-${index}`}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 clamp(20px, 5vw, 60px)',
            overflow: 'hidden',
            minHeight: '80vh'
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.23, 1, 0.32, 1],
            type: "tween"
          }}
        >
          {/* Left Content */}
          <motion.div
            style={{
              flex: 1,
              maxWidth: '600px',
              paddingRight: 'clamp(20px, 5vw, 80px)',
              paddingTop: 'clamp(40px, 8vh, 60px)'
            }}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.2,
              ease: [0.23, 1, 0.32, 1]
            }}
          >
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(10px, 3vw, 20px)',
                marginBottom: 'clamp(20px, 4vw, 30px)'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span style={{
                fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
                fontWeight: '300',
                color: '#5ce1e6',
                letterSpacing: '3px',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                {service.number}
              </span>
              <div style={{
                width: 'clamp(30px, 8vw, 60px)',
                height: '2px',
                background: 'linear-gradient(90deg, #ff3131, #5ce1e6, #43f8ac)',
                opacity: 0.6
              }} />
            </motion.div>

            <motion.h2 
              style={{
                fontSize: 'clamp(2rem, 6vw, 5rem)',
                fontWeight: '200',
                color: '#000',
                margin: '0 0 15px 0',
                letterSpacing: '-2px',
                lineHeight: '0.9',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                overflow: 'hidden'
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {service.title}
            </motion.h2>

            <motion.p 
              style={{
                fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
                color: getBrandColor(index),
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: 'clamp(20px, 4vw, 40px)',
                fontWeight: '400'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {service.subtitle}
            </motion.p>

            <motion.p 
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                color: 'rgba(0,0,0,0.8)',
                lineHeight: '1.7',
                marginBottom: 'clamp(30px, 5vw, 50px)',
                fontWeight: '300',
                maxWidth: '500px'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {service.description}
            </motion.p>

            {/* Technical specifications */}
            <motion.div
              style={{
                marginBottom: 'clamp(30px, 5vw, 60px)'
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <h4 style={{
                fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
                color: 'rgba(0,0,0,0.4)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: 'clamp(15px, 3vw, 25px)',
                fontWeight: '400',
                position: 'relative'
              }}>
                <span style={{
                  position: 'absolute',
                  left: '-15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '8px',
                  height: '8px',
                  background: getBrandColor(index),
                  borderRadius: '50%',
                  opacity: 0.6
                }} />
                Technical Specifications
              </h4>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'clamp(15px, 3vw, 20px)'
              }}>
                {service.technicalSpecs.map((spec, idx) => (
                  <motion.div
                    key={idx}
                    style={{
                      fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
                      color: 'rgba(0,0,0,0.7)',
                      fontWeight: '300',
                      position: 'relative',
                      paddingLeft: '20px'
                    }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + (idx * 0.1), duration: 0.5 }}
                  >
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '6px',
                      height: '6px',
                      background: getBrandColor(idx),
                      borderRadius: '50%',
                      opacity: 0.8
                    }} />
                    {spec}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              style={{
                display: 'flex',
                gap: 'clamp(15px, 3vw, 25px)',
                flexWrap: 'wrap'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.button
                style={{
                  background: 'linear-gradient(135deg, #ff3131, #5ce1e6)',
                  border: 'none',
                  color: '#fff',
                  padding: 'clamp(15px, 2.5vw, 18px) clamp(25px, 4vw, 40px)',
                  fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
                  fontWeight: '400',
                  cursor: 'pointer',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedService && setSelectedService(service.service);
                  setCurrentSection && setCurrentSection('contact');
                }}
              >
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                  }}
                  animate={{ left: ['100%', '-100%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                Start Project
              </motion.button>
              
              <motion.button
                style={{
                  background: 'transparent',
                  border: `1px solid ${getBrandColor(index)}`,
                  color: getBrandColor(index),
                  padding: 'clamp(15px, 2.5vw, 18px) clamp(25px, 4vw, 40px)',
                  fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
                  fontWeight: '400',
                  cursor: 'pointer',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
                whileHover={{ 
                  backgroundColor: getBrandColor(index),
                  color: '#fff'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setPortfolioService(service);
                  setShowPortfolio(true);
                }}
              >
                View Portfolio
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Showcase */}
          <motion.div
            style={{
              flex: 1,
              maxWidth: 'clamp(300px, 40vw, 500px)',
              height: 'clamp(300px, 40vh, 400px)',
              position: 'relative',
              display: window.innerWidth < 768 ? 'none' : 'block' // Hide on mobile
            }}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.3,
              ease: [0.23, 1, 0.32, 1]
            }}
          >
            {/* Main showcase container */}
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                background: '#fff',
                border: `1px solid ${getBrandColor(index)}20`,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 40px 80px rgba(0,0,0,0.08)'
              }}
              animate={{
                y: [0, -5, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Header bar */}
              <div style={{
                height: '50px',
                background: `${getBrandColor(index)}08`,
                borderBottom: `1px solid ${getBrandColor(index)}20`,
                display: 'flex',
                alignItems: 'center',
                padding: '0 25px',
                justifyContent: 'space-between'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '6px'
                }}>
                  {[0, 1, 2].map((dotIndex) => (
                    <div
                      key={dotIndex}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: getBrandColor(dotIndex),
                        opacity: 0.4
                      }}
                    />
                  ))}
                </div>
                
                <div style={{
                  fontSize: 'clamp(0.6rem, 1.2vw, 0.8rem)',
                  color: getBrandColor(index),
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontWeight: '400',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {service.showcase.title}
                </div>
              </div>

              {/* Content area */}
              <div style={{
                padding: 'clamp(20px, 4vw, 40px)',
                height: 'calc(100% - 50px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Geometric design elements */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '15%',
                    right: '10%',
                    width: 'clamp(100px, 20vw, 160px)',
                    height: 'clamp(60px, 12vw, 100px)',
                    background: `${getBrandColor(index)}08`,
                    border: `1px solid ${getBrandColor(index)}20`,
                    borderRadius: '8px'
                  }}
                  animate={{
                    y: [0, -8, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Inner elements */}
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    right: '15px',
                    height: '2px',
                    background: `${getBrandColor(index)}40`
                  }} />
                  
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    left: '15px',
                    width: '60px',
                    height: '2px',
                    background: getBrandColor(index),
                    opacity: 0.6
                  }} />
                  
                  <div style={{
                    position: 'absolute',
                    bottom: '25px',
                    left: '15px',
                    width: '80px',
                    height: '1px',
                    background: `${getBrandColor(index)}60`
                  }} />
                </motion.div>

                {/* Main content */}
                <div style={{ zIndex: 1 }}>
                  <h3 style={{
                    fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
                    fontWeight: '300',
                    color: '#000',
                    marginBottom: '15px',
                    lineHeight: '1.2',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {service.showcase.title}
                  </h3>
                  
                  <p style={{
                    fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
                    color: 'rgba(0,0,0,0.6)',
                    marginBottom: '30px',
                    lineHeight: '1.6',
                    maxWidth: '250px',
                    fontWeight: '300',
                    overflow: 'hidden'
                  }}>
                    {service.showcase.description}
                  </p>

                  {/* Metrics */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    {service.showcase.metrics.map((metric, idx) => (
                      <div key={idx} style={{
                        fontSize: 'clamp(0.6rem, 1.2vw, 0.8rem)',
                        color: 'rgba(0,0,0,0.4)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        position: 'relative',
                        paddingLeft: '20px',
                        fontWeight: '300',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '12px',
                          height: '2px',
                          background: `linear-gradient(90deg, ${getBrandColor(index)}, ${getBrandColor((index + 1) % 3)})`
                        }} />
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section style={{
      minHeight: '100vh',
      background: '#fefefe',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle grid background */}
      <div style={{ 
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />

      {/* Floating marquees */}
      <div style={{ position: 'absolute', top: '15%', left: 0, right: 0, overflow: 'hidden' }}>
        <FloatingMarquee text="PRECISION ENGINEERING" direction={1} />
      </div>

      {/* Header */}
      <motion.div
        style={{
          position: 'absolute',
          top: 'clamp(40px, 8vh, 80px)',
          left: 'clamp(20px, 5vw, 60px)',
          zIndex: 10,
          maxWidth: '400px'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          style={{
            fontSize: 'clamp(0.6rem, 1.2vw, 0.8rem)',
            color: 'rgba(0,0,0,0.4)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: 'clamp(10px, 3vw, 20px)',
            fontWeight: '300',
            position: 'relative'
          }}
        >
          <span style={{
            position: 'absolute',
            left: '-15px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '8px',
            height: '8px',
            background: '#5ce1e6',
            borderRadius: '50%',
            opacity: 0.6
          }} />
          Services Portfolio
        </motion.div>
      </motion.div>

      {/* Navigation dots */}
      <motion.div
        style={{
          position: 'fixed',
          right: 'clamp(20px, 4vw, 40px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(10px, 2vw, 15px)'
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        {servicesData.map((_, index) => (
          <motion.button
            key={index}
            style={{
              width: selectedIndex === index ? 'clamp(20px, 4vw, 30px)' : 'clamp(10px, 2vw, 15px)',
              height: '2px',
              background: selectedIndex === index 
                ? getBrandColor(index)
                : 'rgba(0,0,0,0.2)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setSelectedIndex(index)}
            whileHover={{ 
              width: 'clamp(20px, 4vw, 30px)', 
              backgroundColor: getBrandColor(index)
            }}
          />
        ))}
      </motion.div>

      {/* Service counter */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 'clamp(20px, 8vh, 60px)',
          left: 'clamp(20px, 5vw, 60px)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(15px, 3vw, 25px)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: '200',
          color: '#000',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          {String(selectedIndex + 1).padStart(2, '0')}
        </span>
        
        <div>
          <div style={{
            width: 'clamp(20px, 4vw, 30px)',
            height: '2px',
            background: `linear-gradient(90deg, ${getBrandColor(selectedIndex)}, ${getBrandColor((selectedIndex + 1) % 3)})`,
            marginBottom: '8px',
            opacity: 0.8
          }} />
          <span style={{
            fontSize: 'clamp(0.6rem, 1.5vw, 0.8rem)',
            color: 'rgba(0,0,0,0.4)',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            of 04
          </span>
        </div>
      </motion.div>

      {/* Service controls */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 'clamp(20px, 8vh, 60px)',
          right: 'clamp(20px, 5vw, 60px)',
          zIndex: 10,
          display: 'flex',
          gap: 'clamp(10px, 2vw, 15px)'
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.button
          style={{
            width: 'clamp(35px, 6vw, 45px)',
            height: 'clamp(35px, 6vw, 45px)',
            border: `1px solid ${selectedIndex === 0 ? 'rgba(0,0,0,0.1)' : getBrandColor(selectedIndex)}40`,
            background: 'transparent',
            cursor: selectedIndex === 0 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: selectedIndex === 0 ? 'rgba(0,0,0,0.3)' : getBrandColor(selectedIndex)
          }}
          disabled={selectedIndex === 0}
          whileHover={selectedIndex !== 0 ? { 
            backgroundColor: `${getBrandColor(selectedIndex)}10`,
            borderColor: getBrandColor(selectedIndex)
          } : {}}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
        >
          ←
        </motion.button>
        
        <motion.button
          style={{
            width: 'clamp(35px, 6vw, 45px)',
            height: 'clamp(35px, 6vw, 45px)',
            border: `1px solid ${selectedIndex === servicesData.length - 1 ? 'rgba(0,0,0,0.1)' : getBrandColor(selectedIndex)}40`,
            background: 'transparent',
            cursor: selectedIndex === servicesData.length - 1 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: selectedIndex === servicesData.length - 1 ? 'rgba(0,0,0,0.3)' : getBrandColor(selectedIndex)
          }}
          disabled={selectedIndex === servicesData.length - 1}
          whileHover={selectedIndex !== servicesData.length - 1 ? { 
            backgroundColor: `${getBrandColor(selectedIndex)}10`,
            borderColor: getBrandColor(selectedIndex)
          } : {}}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedIndex(Math.min(servicesData.length - 1, selectedIndex + 1))}
        >
          →
        </motion.button>
      </motion.div>

      {/* Main content area */}
      <div style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        width: '100%',
        paddingBottom: 'clamp(100px, 15vh, 160px)'
      }}>
        <div style={{ width: '100%', height: '100%' }}>
          {servicesData.map((service, index) => (
            selectedIndex === index && (
              <ServiceShowcase
                key={index}
                service={service}
                index={index}
                isActive={true}
              />
            )
          ))}
        </div>
      </div>

      {/* Portfolio Modal */}
      <AnimatePresence>
        {showPortfolio && <PortfolioShowcase />}
      </AnimatePresence>
    </section>
  );
};

export default Services;