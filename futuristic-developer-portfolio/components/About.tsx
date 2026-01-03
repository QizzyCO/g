
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="max-w-5xl mx-auto px-4"
    >
      <div className="flex items-center gap-6 mb-12">
        <h2 className="text-4xl font-bold uppercase tracking-widest mono text-white">
          <span className="text-blue-500">01.</span> About
        </h2>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
      </div>
      
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light">
          <p>
            Hello! My name is <span className="text-white font-medium">Qizzy</span>. I'm a digital creator who loves building things for the web. My journey started in 2023 when I decided to try editing some HTML/CSS templates for a project—turns out that hacking together a custom landing page taught me a lot about the magic of the browser!
          </p>
          <p>
            Currently, I'm pursuing a degree in <span className="text-blue-400">Computer Science</span> while working as a freelance multidisciplinary specialist. My main focus these days is building accessible, inclusive products and digital experiences at the intersection of design and code.
          </p>
          <p>
            I thrive in environments that challenge me to think outside the box and push the boundaries of what's possible in a browser window.
          </p>
          
          <div className="pt-6">
            <h3 className="mono text-blue-500 uppercase text-xs tracking-widest mb-6 flex items-center gap-3">
              <span className="w-4 h-4 rounded-full border border-blue-500/50 flex items-center justify-center text-[8px]">!</span>
              Current Tech Arsenal
            </h3>
            <ul className="grid grid-cols-2 gap-4 text-sm mono">
              {[
                { name: 'JavaScript (ES6+)', icon: '◈' },
                { name: 'React / Next.js', icon: '◈' },
                { name: 'TypeScript', icon: '◈' },
                { name: 'Tailwind CSS', icon: '◈' },
                { name: 'Framer Motion', icon: '◈' },
                { name: 'Figma / UI Design', icon: '◈' }
              ].map(tech => (
                <li key={tech.name} className="flex items-center gap-3 group">
                  <span className="text-blue-500 group-hover:rotate-45 transition-transform duration-300">{tech.icon}</span>
                  <span className="group-hover:text-white transition-colors">{tech.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative group">
           <div className="absolute inset-4 border border-blue-500/30 rounded-[2rem] translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500 z-0" />
           <div className="relative z-10 p-2 bg-[#0d162d] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-500">
             <div className="aspect-[4/5] overflow-hidden rounded-[1.8rem]">
               <img 
                 src="https://picsum.photos/seed/amine-portrait/800/1000" 
                 alt="Qizzy" 
                 className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
               />
               <div className="absolute inset-0 bg-blue-500/10 mix-blend-multiply group-hover:opacity-0 transition-opacity" />
             </div>
             <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <p className="text-[10px] mono text-blue-500 uppercase tracking-widest mb-1">Status: Active</p>
                <p className="text-xs text-white">"Design is not just what it looks like and feels like. Design is how it works."</p>
             </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;