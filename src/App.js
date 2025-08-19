import React, { useState } from 'react';
import GlobalExpedyte from './Campaign';
import Designs from './design';
import Contact from './Contact';
import CookieConsent from './CookieConsent'; // Add this import

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  // State for Contact component
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const navigateToDesigns = () => {
    setCurrentPage('designs');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  const navigateToContact = () => {
    setCurrentPage('contact');
  };

  return (
    <div className="App">
      {currentPage === 'home' && (
        <GlobalExpedyte 
          onNavigate={navigateToDesigns} 
          onNavigateToContact={navigateToContact}
        />
      )}
      {currentPage === 'designs' && (
        <Designs 
          onBackToHome={navigateToHome} 
          onNavigateToContact={navigateToContact}
        />
      )}
      {currentPage === 'contact' && (
        <Contact 
          onBackToHome={navigateToHome}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          formData={formData}
          setFormData={setFormData}
          qrSource="direct"
        />
      )}
      
      {/* Global Cookie Consent - appears on all pages */}
      <CookieConsent />
    </div>
  );
}

export default App;