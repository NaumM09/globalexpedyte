import React, { useState, useRef, useEffect } from 'react';
import './design.css';
import Footer from "./Footer";

const Designs = ({ onBackToHome, onNavigateToContact }) => {
  const [currentProject, setCurrentProject] = useState(0);
  const scrollRef = useRef(null);

  // Sample project data - replace with your actual projects
  const projects = [
    {
      id: 1,
      period: "PERIOD 1",
      year: "2025",
      title: "Frontend Dev",
      subtitle: "BRAND TRANSFORMATION",
      client: "Omentic Mining Technologies",
      description: "Implemented a fully responsive frontend using React based on provided UI designs, ensuring smooth user interaction and performance across their mining analytics platform.",
      images: [
        "https://i.ibb.co/hJYSBnT9/Screenshot-2025-07-24-124822.png",
        "https://i.ibb.co/Lz9v7KMb/Screenshot-2025-07-24-175639.png",
        "https://i.ibb.co/Gvv5YLS3/Screenshot-2025-07-28-141700.png",
      ],
      color: "#f1f1f1",
      textColor: "#2C1810"
    },
    {
      id: 2,
      period: "PERIOD 2", 
      year: "2025",
      title: "Web Redesign",
      subtitle: "DIGITAL EXPERIENCE",
      client: "Nazaria Technologies",
      description: "Led a full website rebrand, from visual identity to responsive frontend development, delivering a modern, user-friendly digital presence aligned with their tech-driven vision.",
      images: [
        "https://i.ibb.co/nsGT9Z34/Screenshot-2025-07-14-100658.png",
        "https://i.ibb.co/TDMBXTv4/Screenshot-2025-07-14-095551.png",
        "https://i.ibb.co/0p9S6FfP/Screenshot-2025-07-14-095623.png",
      ],
      color: "#120055ff",
      textColor: "#BC9824",
    },
    {
      id: 3,
      period: "PERIOD 3",
      year: "2025",
      title: "Rebrand & Professional Email",
      subtitle: "BRAND IDENTITY",
      client: "Stimela Cleaning & Hygiene",
      description: "Redesigned the company logo, set up a professional email address, and created a polished business profile to elevate their brand presence and client communications.",
      images: [
        "https://i.ibb.co/SX5b24HV/Stimela-logos.jpg",
        "https://i.ibb.co/jvf7SNQn/stimela-poster-2.png",
        "https://i.ibb.co/7tT5F98k/Stimela-logos-transparent-3.png",
      ],
      color: "#4ECDC4",
      textColor: "#1A1A1A"
    },
    {
      id: 4,
      period: "PERIOD 4",
      year: "2025",
      title: "Logo Design",
      subtitle: "PACKAGING & BRANDING",
      client: "Moss Lekota Investments",
      description: "Designed a distinctive logo, business cards, and promotional posters to establish a cohesive and professional visual identity for the brand.",
      images: [
        "https://i.ibb.co/35CcLPMG/Moss-Lekota-Finance-Logos.png",
        "https://i.ibb.co/N2nWXrv3/Moss-Letoka-Investmenst-BUSINESS-CARD-3.png",
        "https://i.ibb.co/Q37ScyGp/purchase-order-poster.png",
      ],
      color: "#BC9824",
      textColor: "#2C1810"
    }
  ];

  const handleBackClick = () => {
    console.log('Going back to home');
    if (onBackToHome) {
      onBackToHome();
    }
  };

  const handleContactClick = () => {
    console.log('Going to contact');
    if (onNavigateToContact) {
      onNavigateToContact();
    }
  };

  // Enhanced scroll handling with better detection
  const handleScroll = React.useCallback(() => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const containerWidth = scrollRef.current.offsetWidth;
      const projectIndex = Math.round(scrollLeft / containerWidth);
      if (projectIndex !== currentProject && projectIndex >= 0 && projectIndex < projects.length) {
        setCurrentProject(projectIndex);
      }
    }
  }, [currentProject, projects.length]);

  const scrollToProject = React.useCallback((index) => {
    if (scrollRef.current && index !== currentProject && index >= 0 && index < projects.length) {
      setCurrentProject(index);
      const containerWidth = scrollRef.current.offsetWidth;
      const scrollAmount = index * containerWidth;
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [currentProject, projects.length]);

  // Add keyboard navigation
  const handleKeyDown = React.useCallback((e) => {
    if (e.key === 'ArrowLeft' && currentProject > 0) {
      e.preventDefault();
      scrollToProject(currentProject - 1);
    } else if (e.key === 'ArrowRight' && currentProject < projects.length - 1) {
      e.preventDefault();
      scrollToProject(currentProject + 1);
    }
  }, [currentProject, projects.length, scrollToProject]);

  // Touch handling for better mobile experience
  const handleTouchStart = React.useCallback((e) => {
    const touchStartX = e.touches[0].clientX;
    scrollRef.current?.setAttribute('data-touch-start', touchStartX);
  }, []);

  const handleTouchEnd = React.useCallback((e) => {
    const touchStartX = parseFloat(scrollRef.current?.getAttribute('data-touch-start') || '0');
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0 && currentProject < projects.length - 1) {
        // Swipe left - next project
        scrollToProject(currentProject + 1);
      } else if (diff < 0 && currentProject > 0) {
        // Swipe right - previous project
        scrollToProject(currentProject - 1);
      }
    }
  }, [currentProject, projects.length, scrollToProject]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
      scrollContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        scrollContainer.removeEventListener('touchstart', handleTouchStart);
        scrollContainer.removeEventListener('touchend', handleTouchEnd);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleScroll, handleKeyDown, handleTouchStart, handleTouchEnd]);

  // Initialize first project on mount
  useEffect(() => {
    setCurrentProject(0);
  }, []);

  return (
    <div className="designs-container">
      {/* Header */}
      <header className="designs-header">
        <div className="header-left">
          <button onClick={handleBackClick} className="back-button">
            ← Back to Home
          </button>
        </div>
        
        <div className="header-logo">
          <img 
            src="https://i.ibb.co/20hhhH7w/GE.png"
            alt="Logo" 
            className="logo-image"
            onError={(e) => {
              e.target.src = 'https://i.ibb.co/20hhhH7w/GE.png'
            }}
          />
        </div>
        
        <div className="header-right">
          <button onClick={handleContactClick} className="contact-button">
            Contact Us
          </button>
          <span className="timeline-label">PROJECTS</span>
          <button className="menu-toggle" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="scroll-container" ref={scrollRef}>
        {projects.map((project, index) => (
          <section 
            key={project.id} 
            className="project-slide"
            style={{ 
              backgroundColor: project.color,
              color: project.textColor 
            }}
          >
            <div className="project-content">
              {/* Period Label */}
              <div className="period-label">
                {project.period}
              </div>

              {/* Year */}
              <div className="project-year">
                {project.year}
              </div>

              {/* Main Title */}
              <h1 className="project-title">
                {project.title}
              </h1>

              {/* Images Grid */}
              <div className="images-grid">
                {project.images.map((image, imgIndex) => (
                  <div key={imgIndex} className={`image-frame frame-${imgIndex + 1}`}>
                    <img 
                      src={image} 
                      alt={`${project.client} project ${imgIndex + 1}`}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://i.ibb.co/20hhhH7w/GE.png'
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Bottom Section */}
              <div className="project-bottom">
                <h2 className="project-subtitle">
                  {project.subtitle}
                </h2>
                
                <div className="project-details">
                  <div className="client-info">
                    <span className="client-label">Client</span>
                    <span className="client-name">{project.client}</span>
                  </div>
                  
                  <p className="project-description">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="decorative-dot"></div>
              <div className="decorative-lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Navigation Dots */}
      <nav className="project-navigation" aria-label="Project navigation">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`nav-dot ${index === currentProject ? 'active' : ''}`}
            onClick={() => scrollToProject(index)}
            aria-label={`Go to project ${index + 1}`}
            title={`Project ${index + 1}`}
          />
        ))}
      </nav>

      {/* Project Counter */}
      <div className="project-counter">
        <span className="current-project">{String(currentProject + 1).padStart(2, '0')}</span>
        <span className="separator">/</span>
        <span className="total-projects">{String(projects.length).padStart(2, '0')}</span>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Designs;