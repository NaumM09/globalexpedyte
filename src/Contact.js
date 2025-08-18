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
    <>
      <style>{`
        /* Reset and Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          height: 100%;
          overflow-x: hidden;
          font-size: 16px;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: #ffffff;
          color: #000;
        }

        /* Container */
        .contact-container {
          font-family: 'Inter', sans-serif;
          background: #ffffff;
          width: 100vw;
          min-height: 100vh;
          padding: 0;
          margin: 0;
          color: #000;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          position: relative;
        }

        /* Header Section */
        .contact-header {
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 20;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .contact-back-button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #374151;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          padding: 10px 16px;
          border-radius: 8px;
          background: transparent;
          border: 1px solid rgba(55, 65, 81, 0.2);
          text-decoration: none;
          transition: all 0.3s ease;
          font-family: 'Space Grotesk', sans-serif;
          min-height: 44px;
        }

        .contact-back-button:hover {
          background: rgba(55, 65, 81, 0.05);
          transform: translateX(-2px);
        }

        .contact-brand-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .contact-brand-text {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          letter-spacing: -0.02em;
          font-family: 'Space Grotesk', sans-serif;
        }

        /* Main Content */
        .contact-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 20px;
          position: relative;
          min-height: calc(100vh - 80px);
        }

        .contact-content-wrapper {
          width: 100%;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          gap: 32px;
          flex: 1;
        }

        /* Left Content Section */
        .contact-left-content {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          order: 1;
        }

        .contact-eyebrow {
          font-size: 10px;
          font-weight: 600;
          color: #6b7280;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-family: 'JetBrains Mono', monospace;
          margin-bottom: 12px;
        }

        .contact-main-heading {
          font-size: clamp(1.8rem, 8vw, 2.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 16px;
          color: #111827;
          letter-spacing: -0.04em;
          font-family: 'Space Grotesk', sans-serif;
        }

        .contact-touch-text {
          font-family: 'Crimson Text', serif;
          font-style: italic;
          font-weight: 600;
        }

        .contact-sub-heading {
          font-size: clamp(0.9rem, 4vw, 1rem);
          font-weight: 500;
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 24px;
          font-family: 'Inter', sans-serif;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 0;
        }

        .contact-label {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          font-family: 'Space Grotesk', sans-serif;
          min-width: 70px;
        }

        .contact-value {
          font-size: 13px;
          color: #6b7280;
          font-family: 'Inter', sans-serif;
        }

        /* Form Section */
        .contact-form {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          order: 2;
          flex: 1;
        }

        .contact-form-header {
          margin-bottom: 24px;
          text-align: center;
        }

        .contact-form-title {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 6px;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: -0.02em;
        }

        .contact-form-subtitle {
          font-size: 13px;
          color: #6b7280;
          font-family: 'Inter', sans-serif;
        }

        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        .contact-form-group {
          margin-bottom: 16px;
        }

        .contact-form-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
          font-family: 'Space Grotesk', sans-serif;
        }

        .contact-form-input,
        .contact-form-textarea,
        .contact-form-select {
          width: 100%;
          padding: 12px 14px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
          background: #ffffff;
          outline: none;
          box-sizing: border-box;
          min-height: 44px;
        }

        .contact-form-textarea {
          resize: vertical;
          min-height: 100px;
          font-family: 'Inter', sans-serif;
        }

        .contact-form-input:focus,
        .contact-form-textarea:focus,
        .contact-form-select:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .contact-submit-button {
          width: 100%;
          padding: 16px 24px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #111827 0%, #374151 100%);
          color: #ffffff;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Space Grotesk', sans-serif;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 0 6px 20px rgba(17, 24, 39, 0.2);
          position: relative;
          overflow: hidden;
          min-height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .contact-submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(17, 24, 39, 0.3);
          background: linear-gradient(135deg, #000000 0%, #1f2937 100%);
        }

        .contact-submit-button:active {
          transform: translateY(0);
        }

        /* Success Message */
        .contact-success-message {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          text-align: center;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          max-width: 320px;
          margin: 0 20px;
        }

        .contact-success-message.show {
          opacity: 1;
          visibility: visible;
        }

        .contact-success-icon {
          font-size: 40px;
          margin-bottom: 12px;
        }

        .contact-success-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 6px;
          font-family: 'Space Grotesk', sans-serif;
        }

        .contact-success-text {
          font-size: 13px;
          color: #6b7280;
          font-family: 'Inter', sans-serif;
        }

        /* Geometric Accents */
        .contact-geometric-accent {
          position: absolute;
          z-index: 1;
          opacity: 0.08;
        }

        /* Tablet Styles */
        @media (min-width: 768px) {
          .contact-header {
            padding: 20px 32px;
          }

          .contact-back-button {
            font-size: 14px;
            padding: 12px 20px;
          }

          .contact-brand-text {
            font-size: 18px;
          }

          .contact-main {
            padding: 32px;
            align-items: center;
            justify-content: center;
          }

          .contact-content-wrapper {
            max-width: 1000px;
            flex-direction: row;
            gap: 60px;
            align-items: flex-start;
          }

          .contact-left-content {
            flex: 1;
            order: 1;
            padding-top: 40px;
          }

          .contact-form {
            flex: 1;
            order: 2;
            padding: 32px;
          }

          .contact-main-heading {
            font-size: clamp(2.2rem, 5vw, 3rem);
            margin-bottom: 20px;
          }

          .contact-sub-heading {
            font-size: clamp(1rem, 2vw, 1.1rem);
            margin-bottom: 32px;
            max-width: 400px;
          }

          .contact-form-row {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }

          .contact-form-title {
            font-size: 22px;
          }

          .contact-form-subtitle {
            font-size: 14px;
          }
        }

        /* Desktop Styles */
        @media (min-width: 1024px) {
          .contact-header {
            padding: 24px 48px;
          }

          .contact-brand-text {
            font-size: 20px;
          }

          .contact-main {
            padding: 40px 48px;
          }

          .contact-content-wrapper {
            max-width: 1200px;
            gap: 80px;
          }

          .contact-form {
            padding: 40px;
          }

          .contact-main-heading {
            font-size: clamp(2.5rem, 5vw, 3.5rem);
            margin-bottom: 24px;
          }

          .contact-sub-heading {
            font-size: clamp(1rem, 2vw, 1.2rem);
            margin-bottom: 40px;
            max-width: 420px;
          }

          .contact-form-title {
            font-size: 24px;
          }

          .contact-submit-button {
            font-size: 16px;
            padding: 16px 32px;
          }
        }

        /* Extra Small Mobile */
        @media (max-width: 375px) {
          .contact-header {
            padding: 12px 16px;
          }

          .contact-brand-text {
            font-size: 14px;
          }

          .contact-main {
            padding: 16px;
          }

          .contact-form {
            padding: 20px;
          }

          .contact-main-heading {
            font-size: clamp(1.6rem, 9vw, 2.2rem);
          }

          .contact-sub-heading {
            font-size: clamp(0.85rem, 4.5vw, 0.95rem);
            margin-bottom: 20px;
          }

          .contact-form-group {
            margin-bottom: 14px;
          }

          .contact-form-input,
          .contact-form-textarea,
          .contact-form-select {
            padding: 10px 12px;
            font-size: 13px;
          }

          .contact-submit-button {
            font-size: 14px;
            padding: 14px 20px;
            min-height: 50px;
          }
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
          .contact-container {
            background: #0f0f0f;
            color: #ffffff;
          }

          .contact-header {
            background: rgba(15, 15, 15, 0.95);
          }

          .contact-brand-text {
            color: #ffffff;
          }

          .contact-main-heading {
            color: #ffffff;
          }

          .contact-sub-heading {
            color: #a1a1aa;
          }

          .contact-form {
            background: rgba(31, 31, 31, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .contact-form-input,
          .contact-form-textarea,
          .contact-form-select {
            background: #1f1f1f;
            border: 1px solid #374151;
            color: #ffffff;
          }

          .contact-form-label {
            color: #d1d5db;
          }

          .contact-form-title {
            color: #ffffff;
          }

          .contact-form-subtitle {
            color: #9ca3af;
          }
        }

        /* Accessibility */
        @media (prefers-contrast: high) {
          .contact-form {
            border: 2px solid #000000;
          }

          .contact-submit-button {
            background: #000000;
            border: 2px solid #000000;
          }
        }

        /* Focus States */
        .contact-back-button:focus,
        .contact-form-input:focus,
        .contact-form-textarea:focus,
        .contact-form-select:focus,
        .contact-submit-button:focus {
          outline: 2px solid #0066cc;
          outline-offset: 2px;
        }

        /* Loading Animation */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .contact-container {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>

      <div className={`contact-container ${showSuccess ? 'success-visible' : ''}`}>
        {/* Geometric accents */}
        {geometricAccents.map((accent, index) => (
          <div
            key={`accent-${index}`}
            className="contact-geometric-accent"
            style={{
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
        <div className="contact-header">
          {onBackToHome && (
            <div 
              className="contact-back-button"
              onClick={onBackToHome}
            >
              <span>←</span>
              <span>Back to Home</span>
            </div>
          )}
          
          <div className="contact-brand-container">
            <span className="contact-brand-text">global expedyte.</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="contact-main">
          <div className="contact-content-wrapper">
            {/* Left Content */}
            <div className="contact-left-content">
              <div className="contact-eyebrow">
                Let's Work Together
              </div>

              <h1 className="contact-main-heading">
                Ready to Get In <span className="contact-touch-text">Touch?</span>
              </h1>

              <p className="contact-sub-heading">
                We'd love to hear about your project and discuss how we can help bring your vision to life. Send us a message and we'll get back to you within 24 hours.
              </p>

              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-label">Email:</span>
                  <span className="contact-value">info@globalexpedyte.co.za</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Response:</span>
                  <span className="contact-value">Within 24 hours</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Location:</span>
                  <span className="contact-value">Pretoria, South Africa</span>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="contact-form">
              <div className="contact-form-header">
                <h2 className="contact-form-title">Send us a message</h2>
                <p className="contact-form-subtitle">Tell us about your project and we'll get started</p>
              </div>

              <div>
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label className="contact-form-label" htmlFor="name">Your Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      className="contact-form-input"
                      style={getFocusedStyle('name')}
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                  </div>
                  <div className="contact-form-group">
                    <label className="contact-form-label" htmlFor="email">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="contact-form-input"
                      style={getFocusedStyle('email')}
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label className="contact-form-label" htmlFor="company">Company</label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company" 
                      className="contact-form-input"
                      style={getFocusedStyle('company')}
                      value={formData.company}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div className="contact-form-group">
                    <label className="contact-form-label" htmlFor="service">Service Interest</label>
                    <select 
                      id="service" 
                      name="service" 
                      className="contact-form-select"
                      style={getFocusedStyle('service')}
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

                <div className="contact-form-group">
                  <label className="contact-form-label" htmlFor="message">Your Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    className="contact-form-textarea"
                    style={getFocusedStyle('message')}
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
                  className="contact-submit-button"
                  onMouseEnter={() => setHoveredButton(true)}
                  onMouseLeave={() => setHoveredButton(false)}
                >
                  <span>Send Message</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className={`contact-success-message ${showSuccess ? 'show' : ''}`}>
          <div className="contact-success-icon">✨</div>
          <h3 className="contact-success-title">Message Sent!</h3>
          <p className="contact-success-text">Thank you for reaching out. We'll get back to you soon!</p>
        </div>
      </div>
    </>
  );
};

export default Contact;