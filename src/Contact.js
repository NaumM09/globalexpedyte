import React, { useState, useEffect } from 'react';
import './Contact.css';

const Contact = ({ onBackToHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const servicesData = [
    { title: "Brand Strategy & Identity", value: "branding" },
    { title: "Web Development", value: "web-development" },
    { title: "Mobile Applications", value: "mobile-apps" },
    { title: "Digital Marketing", value: "digital-marketing" },
    { title: "Custom Software", value: "custom-software" },
    { title: "Consultation", value: "consultation" }
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
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Prepare email content
    let emailBody = `Name: ${formData.name}\n`;
    emailBody += `Email: ${formData.email}\n`;
    if (formData.company) emailBody += `Company: ${formData.company}\n`;
    if (formData.service) emailBody += `Service Interest: ${formData.service}\n`;
    emailBody += `\nMessage:\n${formData.message}`;
    
    const subject = formData.service ? `Project Inquiry: ${formData.service}` : 'New Project Inquiry';
    const mailtoLink = `mailto:info@globalexpedyte.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    setShowSuccess(true);
    
    // Hide success message and reset form after 3 seconds
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

  // Add interactive effects on mount
  useEffect(() => {
    const inputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');
    
    const handleFocus = (e) => {
      e.target.parentElement.style.transform = 'scale(1.02)';
    };
    
    const handleBlur = (e) => {
      e.target.parentElement.style.transform = 'scale(1)';
    };
    
    inputs.forEach(input => {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    });
    
    // Cleanup
    return () => {
      inputs.forEach(input => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      });
    };
  }, []);

  return (
    <div className="postcard-page">
      {/* Back Button */}
      {onBackToHome && (
        <button onClick={onBackToHome} className="back-button">
          ← Back to Home
        </button>
      )}

      <div className="postcard-container">
        {/* Vintage aging spots */}
        <div className="age-spot"></div>
        <div className="age-spot"></div>
        <div className="age-spot"></div>
        <div className="age-spot"></div>
        
        <div className="postcard-front">
          {/* Left side - Design */}
          <div className="postcard-left">
            <div className="decorative-stamp">🌟</div>
            <h1 className="postcard-title">Get In Touch!</h1>
            <p className="postcard-subtitle">
              Send us a message and we'll get back to you as soon as possible. 
              We'd love to hear about your project!
            </p>
            <div className="postmark">
              GLOBAL<br />
              EXPEDYTE<br />
              2025
            </div>
          </div>

          {/* Divider */}
          <div className="divider"></div>

          {/* Right side - Form */}
          <div className="postcard-right">
            <div className="form-header">
              <h2 className="form-title">Drop us a line</h2>
              <p className="form-subtitle">We respond within 24 hours</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="form-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-input"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="company">Company</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    className="form-input"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="service">Service Interest</label>
                  <select 
                    id="service" 
                    name="service" 
                    className="form-select"
                    value={formData.service}
                    onChange={handleInputChange}
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

              <div className="form-group">
                <label className="form-label" htmlFor="message">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Send Message 
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="success-message show">
          <div className="success-icon">✅</div>
          <h3 className="success-title">Message Sent!</h3>
          <p className="success-text">Thank you for reaching out. We'll get back to you soon!</p>
        </div>
      )}
    </div>
  );
};

export default Contact;