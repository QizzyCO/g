
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <motion.section 
      // Use spread with any to bypass broken environment types for framer-motion props
      {...({
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.02 }
      } as any)}
      className="py-12"
    >
      <div className="max-w-5xl mx-auto p-12 bg-blue-950/5 border border-blue-500/20 rounded-[3rem] backdrop-blur-md relative overflow-hidden">
        {/* Glow behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-[100px] pointer-events-none" />
        
        <div className="grid md:grid-cols-2 gap-16 relative z-10">
          <div>
            <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-gray-400 mb-10 leading-relaxed">
              Let's collaborate! I am always open to discussing exciting projects and new opportunities. 
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mono">Email me at</p>
                  <p className="font-semibold">terapptq@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mono">Call me</p>
                  <p className="font-semibold">+6285953937227</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mono">Location</p>
                  <p className="font-semibold">Surakarta. Central Java</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a href="#" className="p-3 bg-white/5 hover:bg-blue-500/20 rounded-xl transition-all border border-white/10"><Github size={24} /></a>
              <a href="#" className="p-3 bg-white/5 hover:bg-blue-500/20 rounded-xl transition-all border border-white/10"><Linkedin size={24} /></a>
            </div>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs mono uppercase text-blue-500 ml-1">Your Name</label>
              <input 
                type="text" 
                placeholder="Full Name"
                className="w-full bg-white/5 border border-white/10 focus:border-blue-500 outline-none rounded-2xl p-4 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs mono uppercase text-blue-500 ml-1">Your Email</label>
              <input 
                type="email" 
                placeholder="email@example.com"
                className="w-full bg-white/5 border border-white/10 focus:border-blue-500 outline-none rounded-2xl p-4 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs mono uppercase text-blue-500 ml-1">Your Message</label>
              <textarea 
                rows={5}
                placeholder="How can I help you?"
                className="w-full bg-white/5 border border-white/10 focus:border-blue-500 outline-none rounded-2xl p-4 transition-all resize-none"
              />
            </div>
            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]">
              <Send size={18} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;