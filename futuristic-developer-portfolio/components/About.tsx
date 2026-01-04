import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const abilities = [
    "Software Development", "Video Post-Production", "System Architecture",
    "Digital Design", "UI/UX Strategy", "Hardware Robotics", 
    "Motion Graphics", "Cybersecurity", "Content Strategy"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="max-w-6xl mx-auto px-4"
    >
      <div className="flex items-center gap-6 mb-16">
        <div className="flex flex-col">
          <span className="text-blue-500 mono text-xs tracking-[0.5em] mb-2 uppercase">Identity Scan</span>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest mono text-white">
            <span className="text-blue-500">01.</span> About
          </h2>
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-500/50 to-transparent self-end mb-4" />
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
        <div className="space-y-8 text-gray-400 text-lg leading-relaxed font-light">
          <p>
            Hi! My name is <span className="text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Qizzy</span>. 
            I'm a digital creator who loves building things for technology. My journey began in 
            <span className="text-blue-400 font-medium"> 2025 </span> when I decided to be 
            <span className="italic text-white/80"> "different" </span> by doing various things or becoming a 
            <span className="text-blue-500 mono text-base border-b border-blue-500/30"> jack of all trades </span> 
            — and it turns out, having abilities beyond the average person has taught me a lot about the wonders of technology today!
          </p>
          
          <p>
            I'm currently in <span className="text-blue-400 font-medium">high school</span> and exploring new things. 
            My main focus right now is building accessible and inclusive digital projects and experiences 
            at the intersection of design and code.
          </p>

          <p className="p-6 bg-blue-500/5 border-l-2 border-blue-500 rounded-r-2xl italic text-gray-300">
            "I thrive in environments that challenge me to think outside the box and push the boundaries of what's possible in this day and age!"
          </p>

          <div className="pt-4">
            <p className="text-sm mono text-blue-500/60 uppercase tracking-[0.2em] mb-6 font-bold">Detected Capabilities:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {abilities.map((skill, i) => (
                <div key={i} className="flex items-center gap-2 group">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-150 transition-transform" />
                  <span className="text-xs mono uppercase tracking-wider group-hover:text-blue-400 transition-colors">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative group">
          {/* Outer glow */}
          <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 to-transparent rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative aspect-square md:aspect-auto md:h-[600px] bg-[#0d162d] border border-white/10 rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:border-blue-500/50 shadow-2xl">
            
            {/* Full Card Image */}
            <div className="absolute inset-0">
              <img 
                src="https://raw.githubusercontent.com/QizzyCO/library/refs/heads/main/download.png" 
                alt="Qizzy Profile"
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
              />
              
              {/* Subtle protective overlay to maintain card depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a050d]/40 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700" />
            </div>

            {/* Subtle border shine effect */}
            <div className="absolute inset-0 border border-white/5 rounded-[2.5rem] pointer-events-none" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;