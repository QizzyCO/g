
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Shield, Terminal, Radio, Cpu, Clock, Edit2, Check, X as CloseIcon } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
}

const DEFAULT_MESSAGES: Message[] = [
  { id: 'sys-1', sender: 'SYSTEM_CORE', text: 'Neural relay established. Data retention policy: 30 Days.', timestamp: Date.now() - 1000000 },
  { id: 'user-1', sender: 'NODE_49X1', text: 'This portfolio is from the future! Love the 3D gallery.', timestamp: Date.now() - 500000 },
  { id: 'user-2', sender: 'NODE_88B2', text: 'Qizzy is definitely a jack of all trades. Inspiring stuff.', timestamp: Date.now() - 100000 },
];

// 30 days in milliseconds
const PURGE_THRESHOLD_MS = 30 * 24 * 60 * 60 * 1000;

const NeuralRelay: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [nodeId, setNodeId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditingId, setIsEditingId] = useState(false);
  const [tempId, setTempId] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate or fetch user Node ID
    const savedId = localStorage.getItem('qizzy_node_id');
    if (savedId) {
      setNodeId(savedId);
      setTempId(savedId);
    } else {
      const newId = `NODE_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      localStorage.setItem('qizzy_node_id', newId);
      setNodeId(newId);
      setTempId(newId);
    }

    // Load and Clean messages
    const now = Date.now();
    const savedMessagesRaw = localStorage.getItem('qizzy_relay_messages');
    let loadedMessages: Message[] = savedMessagesRaw ? JSON.parse(savedMessagesRaw) : DEFAULT_MESSAGES;

    // Filter messages: Keep only those within the last 30 days
    const activeMessages = loadedMessages.filter(msg => (now - msg.timestamp) < PURGE_THRESHOLD_MS);
    
    // If we purged anything or just used defaults, sync back to storage
    if (activeMessages.length !== loadedMessages.length || !savedMessagesRaw) {
      localStorage.setItem('qizzy_relay_messages', JSON.stringify(activeMessages));
    }
    
    setMessages(activeMessages);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleIdChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempId.trim()) return;
    setNodeId(tempId);
    localStorage.setItem('qizzy_node_id', tempId);
    setIsEditingId(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      const msg: Message = {
        id: Math.random().toString(36).substring(7),
        sender: nodeId,
        text: newMessage,
        timestamp: Date.now(),
      };

      const updated = [...messages, msg];
      setMessages(updated);
      localStorage.setItem('qizzy_relay_messages', JSON.stringify(updated));
      setNewMessage('');
      setIsSubmitting(false);
    }, 800);
  };

  const formatTime = (ts: number) => {
    const date = new Date(ts);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
    
    if (diffDays === 0) return `Today ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    if (diffDays === 1) return `Yesterday ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-blue-500 mono text-xs tracking-[0.5em] mb-2 uppercase font-bold flex items-center justify-center gap-2">
          <Radio size={12} className="animate-pulse" /> Global Relay Feed
        </span>
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-blue-500/50 tracking-tighter">
          Anonim <span className="text-blue-500">Message</span>
        </h2>
        
        {/* Identity HUD Area */}
        <div className="mt-6 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!isEditingId ? (
              <motion.div 
                key="id-display"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 bg-blue-500/5 border border-blue-500/20 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-500/10 transition-colors group"
                onClick={() => setIsEditingId(true)}
              >
                <span className="text-gray-500 mono text-[10px] uppercase tracking-widest">Identify:</span>
                <span className="text-blue-400 font-bold mono text-xs">{nodeId}</span>
                <Edit2 size={12} className="text-blue-500/40 group-hover:text-blue-400 transition-colors" />
              </motion.div>
            ) : (
              <motion.form 
                key="id-edit"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onSubmit={handleIdChange}
                className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/40 p-1 rounded-full overflow-hidden"
              >
                <input 
                  autoFocus
                  type="text"
                  value={tempId}
                  onChange={(e) => setTempId(e.target.value.substring(0, 15))}
                  className="bg-transparent outline-none px-4 py-1 text-xs mono text-white w-32 placeholder:text-blue-300/20"
                  placeholder="Set handle..."
                />
                <button type="submit" className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors text-white">
                  <Check size={14} />
                </button>
                <button type="button" onClick={() => { setIsEditingId(false); setTempId(nodeId); }} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                  <CloseIcon size={14} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          <p className="text-gray-500 mono text-[8px] mt-2 uppercase tracking-[0.2em]">Transmission Status: SECURE | Public Ledger</p>
        </div>
      </div>

      <div className="relative bg-[#0d162d]/40 border border-blue-500/20 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl">
        {/* HUD Elements */}
        <div className="absolute top-0 left-0 right-0 p-4 border-b border-white/5 flex items-center justify-between bg-blue-500/5 z-20 backdrop-blur-md">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="mono text-[10px] text-green-500 uppercase tracking-widest">Uplink Active</span>
             </div>
             <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
             <div className="hidden md:flex items-center gap-2 text-blue-400/60">
               <Clock size={12} />
               <span className="mono text-[8px] uppercase">TTL: 30 DAYS</span>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`w-1 h-3 rounded-sm ${i < 4 ? 'bg-blue-500' : 'bg-white/10'}`} />
                ))}
             </div>
             <span className="mono text-[8px] text-blue-500 uppercase hidden sm:inline">Sig_Strength: 78%</span>
          </div>
        </div>

        {/* Message Feed */}
        <div 
          ref={scrollRef}
          className="h-[450px] overflow-y-auto p-6 pt-16 scrollbar-hide flex flex-col gap-4 relative"
        >
          {/* Subtle Scanning Lines Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
          
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                // Use spread with any to bypass broken environment types for framer-motion props
                {...({
                  initial: { opacity: 0, x: -20, scale: 0.95 },
                  animate: { opacity: 1, x: 0, scale: 1 }
                } as any)}
                className={`flex flex-col relative z-20 ${msg.sender === nodeId ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-2xl border ${
                  msg.sender === 'SYSTEM_CORE' 
                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-300' 
                  : msg.sender === nodeId 
                    ? 'bg-blue-600/10 border-blue-500/40 text-white rounded-br-none shadow-[0_4px_20px_rgba(59,130,246,0.15)]' 
                    : 'bg-white/5 border-white/10 text-gray-300 rounded-bl-none'
                }`}>
                  <div className="flex items-center justify-between gap-8 mb-2">
                    <span className="mono text-[9px] font-bold tracking-widest flex items-center gap-1">
                      {msg.sender === 'SYSTEM_CORE' ? <Shield size={10} /> : <User size={10} />}
                      {msg.sender}
                    </span>
                    <span className="mono text-[8px] opacity-40">{formatTime(msg.timestamp)}</span>
                  </div>
                  <p className="text-sm font-light leading-relaxed break-words">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/5 bg-[#0a050d]/40 relative z-20">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex-1 relative">
              <input 
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Broadcast a message to the grid..."
                className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none rounded-2xl p-4 pr-12 text-sm mono transition-all placeholder:text-gray-600"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500/40">
                <Terminal size={16} />
              </div>
            </div>
            <button 
              disabled={isSubmitting || !newMessage.trim()}
              className={`px-8 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 ${
                isSubmitting || !newMessage.trim() 
                ? 'bg-white/5 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
              }`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={18} /> <span className="hidden md:inline">Relay Packet</span>
                </>
              )}
            </button>
          </form>
          <div className="mt-4 flex items-center justify-between text-[8px] mono text-gray-600 uppercase tracking-widest">
            <span>Encryption: Enabled (AES-256)</span>
            <span className="text-blue-500/40 font-bold">Data Life Cycle: 30 Days</span>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="mt-12 grid grid-cols-4 gap-4 opacity-20 pointer-events-none hidden md:grid">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        ))}
      </div>
    </div>
  );
};

export default NeuralRelay;
