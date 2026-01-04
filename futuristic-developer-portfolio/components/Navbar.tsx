
import React from 'react';
import { Home, User, FolderCode, Terminal, Mail } from 'lucide-react';

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
    { label: 'Contact', id: 'contact', icon: <Mail size={18} /> },
  ];

  return (
    <nav className="sticky top-6 z-50 mt-4 px-2 py-2 bg-[#0d162d]/40 border border-blue-500/20 backdrop-blur-xl rounded-2xl flex items-center gap-1 md:gap-4 shadow-2xl shadow-blue-500/5">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavClick(item.id)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 group
            ${activeSection === item.id 
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/40' 
              : 'hover:bg-white/5 text-gray-400 hover:text-white'}
          `}
        >
          <span className={`${activeSection === item.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
            {item.icon}
          </span>
          <span className="hidden sm:inline font-medium text-xs md:text-sm uppercase tracking-wider mono">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navbar;