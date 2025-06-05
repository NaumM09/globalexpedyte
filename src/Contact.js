import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = ({ selectedService, setSelectedService, formData, setFormData, qrSource }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Services data for dropdown
  const servicesData = useMemo(() => [
    {
      title: "Web Design",
      service: "web-design"
    },
    {
      title: "Software Engineering",
      service: "software-engineering"
    },
    {
      title: "Branding",
      service: "branding"
    },
    {
      title: "Custom Design",
      service: "custom-design"
    }
  ], []);

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
    
    const subject = selectedService ? `Project Inquiry: ${selectedService}` : 'Project Inquiry - Partnership Request';
    const mailtoLink = `mailto:info@globalexpedyte.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailtoLink;
    
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
      setSelectedService('');
    }, 3000);
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
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {Array.from({ length: 10 }, (_, i) => `${text} • `).join('')}
      </motion.div>
    );
  };

  return (
    <section style={{
      minHeight: '100vh',
      padding: '120px 20px 60px',
      background: '#fefefe',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
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
        <FloatingMarquee text="COLLABORATE WITH US" direction={1} />
      </div>
      
      <div style={{ position: 'absolute', bottom: '15%', left: 0, right: 0, overflow: 'hidden' }}>
        <FloatingMarquee text="PRECISION PARTNERSHIPS" direction={-1} />
      </div>

      {/* Geometric accent */}
      <motion.div
        style={{
          width: '20px',
          height: '20px',
          background: '#000',
          transform: 'rotate(45deg)',
          marginBottom: '60px',
          opacity: 0.8
        }}
        initial={{ scale: 0, rotate: 45 }}
        whileInView={{ scale: 1, rotate: 45 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      />

      <motion.h2 
        style={{
          color: '#000',
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: '200',
          textAlign: 'center',
          margin: '0 0 20px 0',
          letterSpacing: '-2px',
          lineHeight: '0.9',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
      >
        INITIATE
        <br />
        <span style={{ 
          fontSize: 'clamp(1.5rem, 4vw, 3rem)', 
          fontWeight: '300',
          opacity: 0.6
        }}>
          PARTNERSHIP
        </span>
      </motion.h2>

      <motion.div
        style={{
          width: '60px',
          height: '1px',
          background: '#000',
          margin: '40px auto',
          opacity: 0.3
        }}
        initial={{ width: 0 }}
        whileInView={{ width: '60px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      <motion.p
        style={{
          color: 'rgba(0,0,0,0.7)',
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          textAlign: 'center',
          margin: '0 0 80px 0',
          maxWidth: '600px',
          lineHeight: '1.8',
          fontWeight: '300',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Ready to transform your digital presence with
        <br />
        <strong style={{ color: '#000', fontWeight: '400' }}>precision-crafted solutions?</strong>
        <br />
        Let's discuss your vision.
      </motion.p>
      
      <motion.div 
        style={{
          maxWidth: '800px',
          width: '100%',
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.08)',
          padding: '80px 60px',
          boxShadow: '0 40px 80px rgba(0,0,0,0.03)',
          position: 'relative'
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        {/* Top accent line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '60px',
          right: '60px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #000, transparent)',
          opacity: 0.3
        }} />
        
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px'
          }}
        >
          {/* Name and Email Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <label style={{
                display: 'block',
                color: '#000',
                fontSize: '0.8rem',
                fontWeight: '400',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                style={{
                  width: '100%',
                  padding: '20px 0',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  color: '#000',
                  fontSize: '1.1rem',
                  outline: 'none',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="Your name"
                onFocus={(e) => e.target.style.borderBottomColor = '#000'}
                onBlur={(e) => e.target.style.borderBottomColor = 'rgba(0,0,0,0.1)'}
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <label style={{
                display: 'block',
                color: '#000',
                fontSize: '0.8rem',
                fontWeight: '400',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{
                  width: '100%',
                  padding: '20px 0',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  color: '#000',
                  fontSize: '1.1rem',
                  outline: 'none',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="your@email.com"
                onFocus={(e) => e.target.style.borderBottomColor = '#000'}
                onBlur={(e) => e.target.style.borderBottomColor = 'rgba(0,0,0,0.1)'}
                required
              />
            </motion.div>
          </div>

          {/* Company and Service Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <label style={{
                display: 'block',
                color: '#000',
                fontSize: '0.8rem',
                fontWeight: '400',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                style={{
                  width: '100%',
                  padding: '20px 0',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  color: '#000',
                  fontSize: '1.1rem',
                  outline: 'none',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="Your company"
                onFocus={(e) => e.target.style.borderBottomColor = '#000'}
                onBlur={(e) => e.target.style.borderBottomColor = 'rgba(0,0,0,0.1)'}
              />
            </motion.div>
            
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <label style={{
                display: 'block',
                color: '#000',
                fontSize: '0.8rem',
                fontWeight: '400',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Service Interest
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                style={{
                  width: '100%',
                  padding: '20px 0',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  color: '#000',
                  fontSize: '1.1rem',
                  outline: 'none',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  transition: 'border-color 0.3s ease',
                  cursor: 'pointer'
                }}
                onFocus={(e) => e.target.style.borderBottomColor = '#000'}
                onBlur={(e) => e.target.style.borderBottomColor = 'rgba(0,0,0,0.1)'}
              >
                <option value="" style={{ background: '#fff', color: '#000' }}>Select service</option>
                {servicesData.map(service => (
                  <option 
                    key={service.service} 
                    value={service.service}
                    style={{ background: '#fff', color: '#000' }}
                  >
                    {service.title}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>
          
          {/* Message Field */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <label style={{
              display: 'block',
              color: '#000',
              fontSize: '0.8rem',
              fontWeight: '400',
              marginBottom: '15px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Project Brief *
            </label>
            <textarea
              rows={6}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              style={{
                width: '100%',
                padding: '20px 0',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                color: '#000',
                fontSize: '1.1rem',
                outline: 'none',
                resize: 'vertical',
                minHeight: '120px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                transition: 'border-color 0.3s ease'
              }}
              placeholder="Describe your vision, goals, and project requirements..."
              onFocus={(e) => e.target.style.borderBottomColor = '#000'}
              onBlur={(e) => e.target.style.borderBottomColor = 'rgba(0,0,0,0.1)'}
              required
            />
          </motion.div>
          
          {/* Submit Button */}
          <motion.button
            type="submit"
            style={{
              padding: '25px 60px',
              background: '#000',
              border: 'none',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: '400',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginTop: '40px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              position: 'relative',
              overflow: 'hidden',
              alignSelf: 'center'
            }}
            whileHover={{ 
              backgroundColor: '#333'
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.3, duration: 0.6 }}
            onClick={handleFormSubmit}
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
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
            />
            Begin Collaboration
          </motion.button>
        </div>
      </motion.div>
      
      {/* Contact Info */}
      <motion.div
        style={{
          marginTop: '80px',
          padding: '40px 50px',
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.08)',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 20px 40px rgba(0,0,0,0.02)'
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div style={{
          width: '30px',
          height: '1px',
          background: '#000',
          margin: '0 auto 30px',
          opacity: 0.3
        }} />
        
        <h3 style={{
          color: '#000',
          fontSize: '1.2rem',
          margin: '0 0 20px 0',
          fontWeight: '300',
          letterSpacing: '1px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          DIRECT COMMUNICATION
        </h3>
        <p style={{
          color: 'rgba(0,0,0,0.7)',
          fontSize: '1.1rem',
          margin: 0,
          fontWeight: '300',
          fontFamily: 'system-ui, -apple-system, sans-serif'
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
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
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
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.1)',
                padding: '80px 60px',
                textAlign: 'center',
                maxWidth: '500px',
                boxShadow: '0 40px 80px rgba(0,0,0,0.1)',
                position: 'relative'
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.6 }}
            >
              {/* Accent line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '60px',
                right: '60px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #000, transparent)',
                opacity: 0.3
              }} />
              
              <motion.div
                style={{
                  width: '20px',
                  height: '20px',
                  background: '#000',
                  transform: 'rotate(45deg)',
                  margin: '0 auto 40px'
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: 2 }}
              />
              
              <h3 style={{
                color: '#000',
                fontSize: '2rem',
                margin: '0 0 30px 0',
                fontWeight: '200',
                letterSpacing: '1px',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                PARTNERSHIP INITIATED
              </h3>
              
              <div style={{
                width: '40px',
                height: '1px',
                background: '#000',
                margin: '30px auto',
                opacity: 0.3
              }} />
              
              <p style={{
                color: 'rgba(0,0,0,0.7)',
                fontSize: '1.2rem',
                margin: 0,
                lineHeight: '1.6',
                fontWeight: '300',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Your inquiry has been received.
                <br />
                We'll respond within 24 hours
                <br />
                with next steps.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;