
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Download, Send, ChevronDown, Instagram, MapPin } from 'lucide-react';
import SplitText from './SplitText';

const TiktokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

interface HeroProps {
  onExploreClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col justify-center items-center py-12"
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 w-full mb-16">
        <div className="flex-1 text-left">
          <motion.div variants={itemVariants} className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-[10px] mono uppercase font-semibold mb-6 tracking-widest cursor-target">
            Available for freelance work
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-8xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-blue-500/30 leading-[1.1] tracking-tighter">
              <SplitText 
                text="Hi, I'm " 
                className="text-white"
                delay={40}
                duration={0.8}
              /> 
              <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">Qizzy</span><br />
              <span className="text-3xl md:text-5xl text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] block mt-2 cursor-target">The All Roler Person</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8 mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-blue-400/80">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-blue-500" />
              <span>Based in Indonesia</span>
            </div>
            <div className="w-[1px] h-3 bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>Available for hire</span>
            </div>
          </motion.div>

          <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-xl mb-8 leading-relaxed font-light">
            Crafting digital realms where beauty meets utility. Specialized in building high-performance, immersive web interfaces with a focus on modern aesthetic.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
            <button className="group relative flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 active:scale-95 overflow-hidden cursor-target">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Send size={18} className="relative z-10" /> <span className="relative z-10">Hire Me</span>
            </button>
            <button className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all active:scale-95 cursor-target">
              <Download size={18} /> Download CV
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-6">
            <span className="text-gray-500 text-[10px] mono uppercase tracking-[0.3em]">Follow Me:</span>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 rounded-xl transition-all text-gray-400 hover:text-blue-400 cursor-target" title="Github"><Github size={20} /></a>
              <a href="#" className="p-2 bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 rounded-xl transition-all text-gray-400 hover:text-blue-400 cursor-target" title="LinkedIn"><Linkedin size={20} /></a>
              <a href="#" className="p-2 bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 rounded-xl transition-all text-gray-400 hover:text-blue-400 cursor-target" title="Twitter"><Twitter size={20} /></a>
              <a href="https://www.instagram.com/qizzy_neon._/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 rounded-xl transition-all text-gray-400 hover:text-blue-400 cursor-target" title="Instagram"><Instagram size={20} /></a>
              <a href="https://www.tiktok.com/@qizzy_ori" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 rounded-xl transition-all text-gray-400 hover:text-blue-400 cursor-target" title="TikTok"><TiktokIcon size={20} /></a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          className="relative group cursor-target"
        >
          <div className="absolute inset-0 bg-blue-500 rounded-[3rem] blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
          <div className="relative w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-[3rem] p-[1px] shadow-2xl">
            <div className="w-full h-full bg-[#0a050d] rounded-[2.95rem] overflow-hidden relative">
              <img src="https://raw.githubusercontent.com/QizzyCO/library/refs/heads/main/ALLL%20ROLER.png" alt="Qizzy" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a050d]/40 to-transparent opacity-60" />
            </div>
          </div>
          <div className="absolute -top-6 -right-6 w-16 h-16 border-t-[1px] border-r-[1px] border-blue-500/40 rounded-tr-3xl" />
          <div className="absolute -bottom-6 -left-6 w-16 h-16 border-b-[1px] border-l-[1px] border-blue-500/40 rounded-bl-3xl" />
        </motion.div>
      </div>

      <motion.button
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={onExploreClick}
        className="flex flex-col items-center gap-2 group cursor-target"
      >
        <span className="text-[10px] mono text-blue-500 uppercase tracking-[0.5em] group-hover:text-white transition-colors">Scroll to Explore</span>
        <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center p-1 group-hover:border-blue-500 transition-colors">
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1 h-2 bg-blue-500 rounded-full" />
        </div>
        <ChevronDown size={14} className="text-blue-500" />
      </motion.button>
    </motion.section>
  );
};

export default Hero;
