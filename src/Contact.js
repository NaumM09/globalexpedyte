import React, { useState } from 'react';

const Contact = ({ onBackToHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(false);

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

  const servicesData = [
    { title: "Logo Design", value: "logo-design" },
    { title: "Web Magic", value: "web-development" },
    { title: "Brand Wizardry", value: "brand-strategy" },
    { title: "Digital Marketing", value: "digital-marketing" },
    { title: "Visual Identity", value: "visual-identity" },
    { title: "UI/UX Sorcery", value: "ui-ux-design" }
  ];

  const styles = {
    container: {
      fontFamily: "'Inter', sans-serif",
      background: '#ffffff',
      width: '100vw',
      height: '100vh',
      padding: 0,
      margin: 0,
      color: '#000',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
      position: 'relative'
    },

    // Header section
    headerSection: {
      padding: '24px 48px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      zIndex: 20,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)'
    },

    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      color: '#374151',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      padding: '12px 20px',
      borderRadius: '8px',
      background: 'transparent',
      border: '1px solid rgba(55, 65, 81, 0.2)',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      fontFamily: "'Space Grotesk', sans-serif"
    },

    brandContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },

    brandText: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#1a1a1a',
      letterSpacing: '-0.02em',
      fontFamily: "'Space Grotesk', sans-serif"
    },

    // Main content section
    mainContent: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 48px',
      position: 'relative'
    },

    contentWrapper: {
      width: '100%',
      maxWidth: '1200px',
      display: 'flex',
      gap: '80px',
      alignItems: 'flex-start'
    },

    // Left content section
    leftContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      paddingTop: '40px'
    },

    eyebrowText: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#6b7280',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      fontFamily: "'JetBrains Mono', monospace",
      marginBottom: '16px'
    },

    mainHeading: {
      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
      fontWeight: '800',
      lineHeight: '1.1',
      marginBottom: '24px',
      color: '#111827',
      letterSpacing: '-0.04em',
      fontFamily: "'Space Grotesk', sans-serif"
    },

    touchText: {
      fontFamily: "'Crimson Text', serif",
      fontStyle: 'italic',
      fontWeight: '600'
    },

    subHeading: {
      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
      fontWeight: '500',
      color: '#4b5563',
      lineHeight: '1.6',
      marginBottom: '40px',
      maxWidth: '420px',
      fontFamily: "'Inter', sans-serif"
    },

    contactInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },

    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 0'
    },

    contactLabel: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      fontFamily: "'Space Grotesk', sans-serif",
      minWidth: '80px'
    },

    contactValue: {
      fontSize: '14px',
      color: '#6b7280',
      fontFamily: "'Inter', sans-serif"
    },

    // Right form section
    rightForm: {
      flex: 1,
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '40px',
      border: '1px solid rgba(0, 0, 0, 0.06)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
    },

    formHeader: {
      marginBottom: '32px'
    },

    formTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '8px',
      fontFamily: "'Space Grotesk', sans-serif",
      letterSpacing: '-0.02em'
    },

    formSubtitle: {
      fontSize: '14px',
      color: '#6b7280',
      fontFamily: "'Inter', sans-serif"
    },

    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginBottom: '20px'
    },

    formGroup: {
      marginBottom: '20px'
    },

    formLabel: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px',
      fontFamily: "'Space Grotesk', sans-serif"
    },

    formInput: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      fontSize: '14px',
      fontFamily: "'Inter', sans-serif",
      transition: 'all 0.3s ease',
      background: '#ffffff',
      outline: 'none',
      boxSizing: 'border-box'
    },

    formTextarea: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      fontSize: '14px',
      fontFamily: "'Inter', sans-serif",
      transition: 'all 0.3s ease',
      background: '#ffffff',
      outline: 'none',
      resize: 'vertical',
      minHeight: '100px',
      boxSizing: 'border-box'
    },

    formSelect: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      fontSize: '14px',
      fontFamily: "'Inter', sans-serif",
      transition: 'all 0.3s ease',
      background: '#ffffff',
      outline: 'none',
      cursor: 'pointer',
      boxSizing: 'border-box'
    },

    submitButton: {
      width: '100%',
      padding: '16px 32px',
      borderRadius: '12px',
      border: 'none',
      background: 'linear-gradient(135deg, #111827 0%, #374151 100%)',
      color: '#ffffff',
      fontSize: '16px',
      fontWeight: '700',
      fontFamily: "'Space Grotesk', sans-serif",
      cursor: 'pointer',
      transition: 'all 0.4s ease',
      boxShadow: '0 8px 24px rgba(17, 24, 39, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    },

    // Success message
    successMessage: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '32px',
      border: '1px solid rgba(0, 0, 0, 0.06)',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      textAlign: 'center',
      zIndex: 1000,
      opacity: showSuccess ? 1 : 0,
      visibility: showSuccess ? 'visible' : 'hidden',
      transition: 'all 0.3s ease'
    },

    successIcon: {
      fontSize: '48px',
      marginBottom: '16px'
    },

    successTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '8px',
      fontFamily: "'Space Grotesk', sans-serif"
    },

    successText: {
      fontSize: '14px',
      color: '#6b7280',
      fontFamily: "'Inter', sans-serif"
    },

    // Geometric accents
    geometricAccent: {
      position: 'absolute',
      zIndex: 1,
      opacity: 0.08
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    let emailBody = `Name: ${formData.name}\n`;
    emailBody += `Email: ${formData.email}\n`;
    if (formData.company) emailBody += `Company: ${formData.company}\n`;
    if (formData.service) emailBody += `Service Interest: ${formData.service}\n`;
    emailBody += `\nMessage:\n${formData.message}`;
    
    const subject = formData.service ? `Project Inquiry: ${formData.service}` : 'New Project Inquiry';
    const mailtoLink = `mailto:info@globalexpedyte.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailtoLink;
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
      });
    }, 3000);
  };

  const getFocusedStyle = (fieldName) => {
    return focusedField === fieldName ? {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    } : {};
  };

  // Geometric accents
  const geometricAccents = [
    { size: '100px', top: '10%', right: '15%', color: '#ff3333', shape: 'circle' },
    { size: '60px', bottom: '20%', left: '10%', color: '#33ccff', shape: 'square' },
    { size: '80px', top: '60%', right: '8%', color: '#00ff88', shape: 'circle' }
  ];

  return (
    <div style={styles.container}>
      {/* Geometric accents */}
      {geometricAccents.map((accent, index) => (
        <div
          key={`accent-${index}`}
          style={{
            ...styles.geometricAccent,
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
      <div style={styles.headerSection}>
        {onBackToHome && (
          <div 
            style={styles.backButton}
            onClick={onBackToHome}
          >
            <span>←</span>
            <span>Back to Home</span>
          </div>
        )}
        
        <div style={styles.brandContainer}>
          <span style={styles.brandText}>global expedyte.</span>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.contentWrapper}>
          {/* Left Content */}
          <div style={styles.leftContent}>
            <div style={styles.eyebrowText}>
              Let's Work Together
            </div>

            <h1 style={styles.mainHeading}>
              Ready to Get In <span style={styles.touchText}>Touch?</span>
            </h1>

            <p style={styles.subHeading}>
              We'd love to hear about your project and discuss how we can help bring your vision to life. Send us a message and we'll get back to you within 24 hours.
            </p>

            <div style={styles.contactInfo}>
              <div style={styles.contactItem}>
                <span style={styles.contactLabel}>Email:</span>
                <span style={styles.contactValue}>info@globalexpedyte.co.za</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactLabel}>Response:</span>
                <span style={styles.contactValue}>Within 24 hours</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactLabel}>Location:</span>
                <span style={styles.contactValue}>Pretoria, South Africa</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div style={styles.rightForm}>
            <div style={styles.formHeader}>
              <h2 style={styles.formTitle}>Send us a message</h2>
              <p style={styles.formSubtitle}>Tell us about your project and we'll get started</p>
            </div>

            <div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel} htmlFor="name">Your Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    style={{
                      ...styles.formInput,
                      ...getFocusedStyle('name')
                    }}
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel} htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    style={{
                      ...styles.formInput,
                      ...getFocusedStyle('email')
                    }}
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel} htmlFor="company">Company</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    style={{
                      ...styles.formInput,
                      ...getFocusedStyle('company')
                    }}
                    value={formData.company}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('company')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel} htmlFor="service">Service Interest</label>
                  <select 
                    id="service" 
                    name="service" 
                    style={{
                      ...styles.formSelect,
                      ...getFocusedStyle('service')
                    }}
                    value={formData.service}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('service')}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="">Select a service</option>
                    {servicesData.map(service => (
                      <option key={service.value} value={service.value}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="message">Your Message *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  style={{
                    ...styles.formTextarea,
                    ...getFocusedStyle('message')
                  }}
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              <button 
                type="submit" 
                style={{
                  ...styles.submitButton,
                  ...(hoveredButton ? {
                    transform: 'translateY(-2px) scale(1.02)',
                    boxShadow: '0 16px 32px rgba(17, 24, 39, 0.3)',
                    background: 'linear-gradient(135deg, #000000 0%, #1f2937 100%)'
                  } : {})
                }}
                onClick={handleSubmit}
                onMouseEnter={() => setHoveredButton(true)}
                onMouseLeave={() => setHoveredButton(false)}
              >
                Send Message →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div style={styles.successMessage}>
        <div style={styles.successIcon}>✨</div>
        <h3 style={styles.successTitle}>Message Sent!</h3>
        <p style={styles.successText}>Thank you for reaching out. We'll get back to you soon!</p>
      </div>
    </div>
  );
};

export default Contact;