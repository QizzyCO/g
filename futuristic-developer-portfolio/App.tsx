import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeaderOverlay from './components/HeaderOverlay';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import LandingPage from './components/LandingPage';
import Aurora from './components/Aurora';
import Footer from './components/Footer';
import Certificates from './components/Certificates';
import NeuralRelay from './components/NeuralRelay';
import TargetCursor from './components/TargetCursor';

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Synchronize with the 8-second landing sequence
    const timer = setTimeout(() => setIsReady(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'services', 'certificates', 'anonim-message', 'contact'];
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
    <div className="min-h-screen relative bg-[#0a050d] text-white selection:bg-blue-500/30 overflow-x-hidden">
      <TargetCursor />
      
      {/* Background Aurora */}
      <div className="absolute top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <Aurora
          colorStops={["#7cff67","#B19EEF","#5227FF"]}
          blend={0.5}
          amplitude={1.0}
          speed={1}
        />
      </div>
      
      <AnimatePresence mode="wait">
        {!isReady ? (
          <LandingPage key="landing" />
        ) : (
          <motion.div
            key="main"
            {...({
              initial: { opacity: 0 },
              animate: { opacity: 1 }
            } as any)}
            className="relative z-10 w-full"
          >
            <div className="w-full flex flex-col items-center">
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

                  <section id="certificates" className="py-24">
                    <Certificates />
                  </section>

                  <section id="anonim-message" className="py-24">
                    <NeuralRelay />
                  </section>
                  
                  <section id="contact" className="py-24">
                    <Contact />
                  </section>
                </main>

                {/* Side HUD Pagination */}
                <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-50">
                  {['home', 'about', 'projects', 'services', 'certificates', 'anonim-message', 'contact'].map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className="group flex items-center justify-end gap-3 cursor-target"
                    >
                      <span className={`text-[10px] mono uppercase tracking-widest transition-all duration-300 opacity-0 group-hover:opacity-100 ${activeSection === section ? 'text-blue-500 opacity-100' : 'text-gray-500'}`}>
                        {section === 'anonim-message' ? 'anonim' : section}
                      </span>
                      <div className={`w-2 h-2 rounded-full border border-blue-500/50 transition-all duration-300 ${activeSection === section ? 'bg-blue-500 scale-125 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-transparent group-hover:bg-blue-500/20'}`} />
                    </button>
                  ))}
                </div>
              </div>
              
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Scroll Progress HUD */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-[110] origin-left"
        {...({
          initial: { scaleX: 0 },
          animate: { scaleX: 1 }
        } as any)}
      />
    </div>
  );
};

export default App;