import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Calendar, MapPin } from 'lucide-react';
import CircularGallery from './CircularGallery';

const CERTIFICATES = [
  { image: 'https://raw.githubusercontent.com/QizzyCO/library/refs/heads/main/6294281899962207239.jpg', text: 'Protocol Alpha' },
  { image: 'https://raw.githubusercontent.com/QizzyCO/library/refs/heads/main/6294281899962207240.jpg', text: 'System Override' },
  { image: 'https://raw.githubusercontent.com/QizzyCO/library/refs/heads/main/6294281899962207241.jpg', text: 'Neural Interface' },
  { image: 'https://raw.githubusercontent.com/QizzyCO/library/refs/heads/main/6314139088549776612.jpg', text: 'Data Architect' },
  { image: 'https://raw.githubusercontent.com/QizzyCO/library/refs/heads/main/6321057129812397433.jpg', text: 'Quantum Security' },
  { image: 'https://raw.githubusercontent.com/QizzyCO/library/refs/heads/main/6323532529918479779.jpg', text: 'Cloud Nexus' },
  { image: 'https://raw.githubusercontent.com/QizzyCO/library/refs/heads/main/6327624761873206261.jpg', text: 'Robotics Core' },
  { image: 'https://raw.githubusercontent.com/QizzyCO/library/refs/heads/main/6327624761873206323.jpg', text: 'Digital Vision' },
];

const Certificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<{ image: string; text: string } | null>(null);

  return (
    <motion.section 
      {...({
        initial: { opacity: 0 },
        whileInView: { opacity: 1 }
      } as any)}
      className="max-w-7xl mx-auto px-4 w-full"
    >
      <div className="text-center mb-16">
        <span className="text-blue-500 mono text-xs tracking-[0.5em] mb-2 uppercase font-bold">Credential Vault</span>
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-blue-500/50 tracking-tighter">
          Professional <span className="text-blue-500">Achievements</span>
        </h2>
        <p className="text-gray-500 mono text-[10px] mt-4 uppercase tracking-[0.3em] font-medium opacity-60">Interaction Required: Select target to expand data</p>
      </div>

      <div style={{ height: '600px', position: 'relative' }} className="rounded-[3rem] overflow-hidden border border-white/5 bg-[#0d162d]/20 backdrop-blur-md shadow-2xl">
        <CircularGallery 
          items={CERTIFICATES}
          bend={3}
          textColor="#3b82f6" 
          borderRadius={0.08} 
          scrollEase={0.06}
          scrollSpeed={2.5}
          onItemClick={(item) => setSelectedCert(item)}
        />
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a050d] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a050d] to-transparent pointer-events-none z-10" />
        
        {/* HUD Decoration */}
        <div className="absolute top-8 left-8 p-4 border-l border-t border-blue-500/30 rounded-tl-2xl pointer-events-none opacity-40">
           <div className="mono text-[8px] text-blue-400">SCAN_RANGE: ACTIVE</div>
        </div>
        <div className="absolute bottom-8 right-8 p-4 border-r border-b border-blue-500/30 rounded-br-2xl pointer-events-none opacity-40">
           <div className="mono text-[8px] text-blue-400">DATA_RELAY: STABLE</div>
        </div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            {...({
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 }
            } as any)}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12"
          >
            {/* Backdrop */}
            <motion.div 
              {...({
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 }
              } as any)}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-[#0a050d]/95 backdrop-blur-2xl cursor-pointer"
            />
            
            {/* Content Card */}
            <motion.div
              {...({
                layoutId: `cert-${selectedCert.text}`,
                initial: { scale: 0.8, opacity: 0, y: 40 },
                animate: { scale: 1, opacity: 1, y: 0 },
                exit: { scale: 0.8, opacity: 0, y: 40 },
                transition: { type: "spring", damping: 30, stiffness: 200 }
              } as any)}
              className="relative w-full max-w-6xl bg-[#0d162d] border border-blue-500/20 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.15)] flex flex-col md:flex-row h-full max-h-[90vh]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-8 right-8 z-50 p-4 bg-white/5 hover:bg-red-500/80 rounded-full text-white transition-all backdrop-blur-xl border border-white/10"
              >
                <X size={24} />
              </button>
              
              {/* Image Section */}
              <div className="flex-[1.5] overflow-hidden bg-black/40 flex items-center justify-center p-4">
                <motion.img 
                  {...({
                    initial: { opacity: 0, scale: 0.95 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { delay: 0.2 }
                  } as any)}
                  src={selectedCert.image} 
                  alt={selectedCert.text} 
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${selectedCert.text}/1200/800?grayscale`;
                  }}
                />
              </div>

              {/* Data Section */}
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/5 bg-gradient-to-b from-[#0d162d] to-[#0a050d]">
                 <div className="mb-8">
                   <span className="text-blue-500 mono text-[10px] tracking-[0.5em] uppercase mb-4 block font-bold">System Authentication</span>
                   <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter text-white leading-tight">
                     {selectedCert.text}
                   </h3>
                   <div className="h-1 w-20 bg-blue-500 rounded-full" />
                 </div>

                 <div className="space-y-6 mb-12">
                   <div className="flex items-start gap-4">
                     <div className="mt-1 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                       <ShieldCheck size={18} />
                     </div>
                     <div>
                       <p className="text-white text-sm font-semibold mb-1">Authenticated Credential</p>
                       <p className="text-gray-500 text-xs">Digitally signed and encrypted by Qizzy Verification Node.</p>
                     </div>
                   </div>

                   <div className="flex items-start gap-4">
                     <div className="mt-1 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                       <Calendar size={18} />
                     </div>
                     <div>
                       <p className="text-white text-sm font-semibold mb-1">Timestamp</p>
                       <p className="text-gray-500 text-xs">Issued 2025.03.14 / Valid Term: Permanent</p>
                     </div>
                   </div>

                   <div className="flex items-start gap-4">
                     <div className="mt-1 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                       <MapPin size={18} />
                     </div>
                     <div>
                       <p className="text-white text-sm font-semibold mb-1">Origin Node</p>
                       <p className="text-gray-500 text-xs">Global Digital Network / Indonesia Sector</p>
                     </div>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4 mt-auto">
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                     <div className="text-blue-500 font-bold text-xl mb-1">100%</div>
                     <div className="mono text-[8px] text-gray-500 uppercase">Integrity</div>
                   </div>
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                     <div className="text-green-500 font-bold text-xl mb-1">SECURE</div>
                     <div className="mono text-[8px] text-gray-500 uppercase">Protocol</div>
                   </div>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Certificates;