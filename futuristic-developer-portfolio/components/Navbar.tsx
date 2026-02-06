
import React from 'react';
import { Home, User, FolderCode, Terminal, Mail, Award, MessageSquare } from 'lucide-react';
import GooeyNav from './GooeyNav';

interface NavbarProps {
  activeSection: string;
  onNavClick: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavClick }) => {
  const navItems = [
    { label: 'Home', id: 'home', icon: <Home size={18} /> },
    { label: 'About', id: 'about', icon: <User size={18} /> },
    { label: 'Projects', id: 'projects', icon: <FolderCode size={18} /> },
    { label: 'Services', id: 'services', icon: <Terminal size={18} /> },
    { label: 'Awards', id: 'certificates', icon: <Award size={18} /> },
    { label: 'Anonim Message', id: 'anonim-message', icon: <MessageSquare size={18} /> },
    { label: 'Contact', id: 'contact', icon: <Mail size={18} /> },
  ];

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex justify-center w-auto transition-all duration-500">
      <div className="bg-[#0d162d]/60 border border-blue-500/30 backdrop-blur-2xl rounded-full shadow-2xl shadow-blue-500/10 px-2 py-2 max-w-[95vw] overflow-x-auto scrollbar-hide hover:border-blue-500/50 transition-colors">
        <GooeyNav 
          items={navItems} 
          activeId={activeSection} 
          onItemClick={onNavClick} 
          particleCount={12} 
        />
      </div>
    </div>
  );
};

export default Navbar;
