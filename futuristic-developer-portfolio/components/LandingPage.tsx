
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const systemLogs = [
  "INITIALIZING KERNEL_CORE_V2.0...",
  "CHECKING HARDWARE ACCELERATION...",
  "ESTABLISHING SECURE PROTOCOLS...",
  "LOADING ASSETS: [UI_TEXTURES, SHADERS, AUDIO]...",
  "DECRYPTING PORTFOLIO_V25.DATA...",
  "CALIBRATING NEURAL INTERFACE...",
  "SYNCHRONIZING WITH GLOBAL GRID...",
  "SYSTEM_STATUS: [STABLE]",
  "WELCOME, OPERATOR QIZZY."
];

const LandingPage: React.FC = () => {
  const [percent, setPercent] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [showEnter, setShowEnter] = useState(false);

  useEffect(() => {
    // Slower progress update: from 40ms to 100ms
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowEnter(true);
          return 100;
        }
        // Slightly smaller steps for a smoother, slower feel
        return prev + Math.floor(Math.random() * 3) + 1;
      });
    }, 100);

    // Slower log update: from 250ms to 600ms
    const logInterval = setInterval(() => {
      setLogIndex(prev => (prev < systemLogs.length - 1 ? prev + 1 : prev));
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, []);

  const currentDisplayTitle = percent < 90 ? "LOADING" : "WELCOME";

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        y: -1000,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a050d] overflow-hidden"
    >
      {/* Cinematic Scanning Line */}
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10 pointer-events-none"
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} 
      />

      <div className="relative w-full max-w-2xl px-6">
        {/* Terminal Text */}
        <div className="mb-12 h-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p 
              key={logIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="mono text-[10px] text-blue-500/60 uppercase tracking-widest text-center"
            >
              {systemLogs[logIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Central Core */}
        <div className="relative flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <h1 className="text-6xl md:text-9xl font-bold text-white tracking-tighter text-center leading-none min-w-[300px]">
              {currentDisplayTitle}<span className="text-blue-500">.</span>
            </h1>
            
            {/* Glitch Effect Overlay */}
            <motion.h1 
              key={currentDisplayTitle}
              animate={{ 
                x: [0, -2, 2, -2, 0],
                opacity: [0, 0.5, 0]
              }}
              transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 2 }}
              className="absolute inset-0 text-6xl md:text-9xl font-bold text-blue-500/30 tracking-tighter text-center leading-none pointer-events-none"
            >
              {currentDisplayTitle}.
            </motion.h1>
          </motion.div>

          <div className="mt-12 w-full max-w-xs">
            <div className="flex justify-between items-end mb-2 mono text-[10px] text-blue-500/60 uppercase tracking-widest">
              <span>System Boot</span>
              <span>{percent}%</span>
            </div>
            <div className="h-[2px] w-full bg-white/5 relative overflow-hidden rounded-full">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Details */}
        <div className="absolute bottom-[-150px] left-0 right-0 flex justify-between mono text-[8px] text-blue-500/30 tracking-[0.3em] px-4">
          <div className="flex flex-col gap-1">
            <span>MEM: 64GB_DDR5</span>
            <span>OS: PORTFOLIO_V2</span>
          </div>
          <div className="flex flex-col items-end gap-1 text-right">
            <span>LATENCY: 12MS</span>
            <span>ENCRYPTION: AES-256</span>
          </div>
        </div>
      </div>

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />
    </motion.div>
  );
};

export default LandingPage;