
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeaderOverlay from './components/HeaderOverlay';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Sync with LandingPage loading time (increased to 8000ms for slower effect)
    const timer = setTimeout(() => setIsReady(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'services', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen relative bg-[#0a050d] text-white selection:bg-blue-500/30">
      {/* Dynamic Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full z-0 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full z-0 pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {!isReady ? (
          <LandingPage key="landing" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 flex flex-col items-center w-full"
          >
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col items-center">
              <HeaderOverlay />
              <Navbar activeSection={activeSection} onNavClick={scrollToSection} />
              
              <main className="w-full">
                <section id="home" className="min-h-[90vh] flex items-center">
                  <Hero onExploreClick={() => scrollToSection('about')} />
                </section>
                
                <section id="about" className="py-24">
                  <About />
                </section>
                
                <section id="projects" className="py-24">
                  <Projects />
                </section>
                
                <section id="services" className="py-24">
                  <Services />
                </section>
                
                <section id="contact" className="py-24">
                  <Contact />
                </section>
              </main>

              {/* Side Pagination - HUD Style */}
              <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-50">
                {['home', 'about', 'projects', 'services', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="group flex items-center justify-end gap-3"
                  >
                    <span className={`text-[10px] mono uppercase tracking-widest transition-all duration-300 opacity-0 group-hover:opacity-100 ${activeSection === section ? 'text-blue-500 opacity-100' : 'text-gray-500'}`}>
                      {section}
                    </span>
                    <div className={`w-2 h-2 rounded-full border border-blue-500/50 transition-all duration-300 ${activeSection === section ? 'bg-blue-500 scale-125 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-transparent group-hover:bg-blue-500/20'}`} />
                  </button>
                ))}
              </div>

              <footer className="w-full py-10 opacity-30 text-[10px] mono text-center border-t border-white/5 uppercase tracking-[0.3em]">
                &copy; 2025 QIZZY • ENCRYPTED PORTFOLIO • [STABLE_BUILD_402]
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-[60] origin-left"
        style={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
      />
    </div>
  );
};

export default App;