import React, { useState } from 'react';
import GlobalExpedyte from './Campaign';
import Designs from './design';
import Contact from './Contact'; // ✅ UNCOMMENT THIS LINE

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
        <GlobalExpedyte onNavigate={navigateToDesigns} />
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
    </div>
  );
}

export default App;