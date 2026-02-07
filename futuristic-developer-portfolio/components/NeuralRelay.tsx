import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Shield, Terminal, Radio, Cpu, Clock, Edit2, Check, X as CloseIcon, Globe, RefreshCw, Zap } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
}

const DEFAULT_MESSAGES: Message[] = [
  { id: 'sys-1', sender: 'SYSTEM_CORE', text: 'Neural relay established. Data retention policy: Active.', timestamp: Date.now() - 1000000 },
];

// New public bin for better persistence and global access
const GRID_STORE_URL = 'https://api.npoint.io/97732d887a0b38843983'; 

const PURGE_THRESHOLD_MS = 30 * 24 * 60 * 60 * 1000;

const NeuralRelay: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [nodeId, setNodeId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditingId, setIsEditingId] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'error'>('idle');
  const [tempId, setTempId] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const pollTimerRef = useRef<number | null>(null);

  const fetchGlobalFeed = async (showLoading = true) => {
    if (showLoading) setSyncStatus('syncing');
    try {
      const response = await fetch(GRID_STORE_URL);
      
      // Handle initial state if bin hasn't been created yet
      if (response.status === 404) {
        setMessages(DEFAULT_MESSAGES);
        setSyncStatus('idle');
        return;
      }

      if (!response.ok) throw new Error('Protocol mismatch');
      
      const data = await response.json();
      const now = Date.now();
      
      // Filter out messages older than 30 days
      const activeMessages = (Array.isArray(data) ? data : DEFAULT_MESSAGES)
        .filter(msg => (now - msg.timestamp) < PURGE_THRESHOLD_MS);
      
      setMessages(activeMessages);
      setSyncStatus('idle');
    } catch (err) {
      console.warn('Grid Connection Error:', err);
      setSyncStatus('error');
      // Fallback to local cache if offline
      const saved = localStorage.getItem('qizzy_relay_messages');
      if (saved && messages.length === 0) setMessages(JSON.parse(saved));
    }
  };

  const pushToGlobalFeed = async (updatedMessages: Message[]) => {
    try {
      const response = await fetch(GRID_STORE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMessages),
      });
      if (!response.ok) throw new Error('Uplink rejected');
    } catch (err) {
      console.error('Failed to push to grid:', err);
      throw err;
    }
  };

  useEffect(() => {
    // Persistent Identity Handle
    const savedId = localStorage.getItem('qizzy_node_id');
    const id = savedId || `NODE_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    if (!savedId) localStorage.setItem('qizzy_node_id', id);
    setNodeId(id);
    setTempId(id);

    // Initial Sync
    fetchGlobalFeed();

    // Fast Polling (every 10 seconds) for near real-time cross-device sync
    pollTimerRef.current = window.setInterval(() => fetchGlobalFeed(false), 10000);

    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setSyncStatus('syncing');
    
    try {
      // 1. Fetch latest to merge and prevent overwriting others
      const response = await fetch(GRID_STORE_URL);
      let latestMessages = [];
      if (response.ok) {
        const currentGrid = await response.json();
        latestMessages = Array.isArray(currentGrid) ? currentGrid : [];
      }

      // 2. Create the broadcast packet
      const msg: Message = {
        id: Math.random().toString(36).substring(7),
        sender: nodeId,
        text: newMessage,
        timestamp: Date.now(),
      };

      // Keep only last 100 messages for speed
      const updated = [...latestMessages, msg].slice(-100); 
      
      // 3. Post back to the global store
      await pushToGlobalFeed(updated);
      
      setMessages(updated);
      localStorage.setItem('qizzy_relay_messages', JSON.stringify(updated));
      setNewMessage('');
      setSyncStatus('idle');
    } catch (err) {
      setSyncStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (ts: number) => {
    const date = new Date(ts);
    const now = new Date();
    const diffMin = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="text-center mb-12">
        <span className="text-blue-500 mono text-xs tracking-[0.5em] mb-2 uppercase font-bold flex items-center justify-center gap-2">
          <Zap size={12} className={syncStatus === 'syncing' ? 'animate-bounce text-yellow-400' : 'text-blue-500'} /> 
          {syncStatus === 'syncing' ? 'Broadcasting to Grid...' : 'Public Neural Relay'}
        </span>
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-blue-500/50 tracking-tighter">
          Anonim <span className="text-blue-500">Message</span>
        </h2>
        
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
                  onChange={(e) => setTempId(e.target.value.substring(0, 15).toUpperCase())}
                  className="bg-transparent outline-none px-4 py-1 text-xs mono text-white w-32 placeholder:text-blue-300/20"
                  placeholder="Set Handle..."
                />
                <button type="submit" className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors text-white">
                  <Check size={14} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          <div className="flex items-center gap-4 mt-3">
            <p className="text-gray-500 mono text-[8px] uppercase tracking-[0.2em] flex items-center gap-2">
              <Globe size={10} className={syncStatus === 'error' ? 'text-red-500 animate-pulse' : 'text-green-500'} />
              Uplink: {syncStatus === 'error' ? 'DISRUPTED' : 'ACTIVE'} | Public Feed
            </p>
            {syncStatus === 'error' && (
              <button 
                onClick={() => fetchGlobalFeed(true)} 
                className="mono text-[8px] text-blue-500 border border-blue-500/20 px-2 py-0.5 rounded-full flex items-center gap-1 hover:bg-blue-500/10"
              >
                <RefreshCw size={8} /> Restore Connection
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative bg-[#0d162d]/40 border border-blue-500/20 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 left-0 right-0 p-4 border-b border-white/5 flex items-center justify-between bg-blue-500/5 z-20 backdrop-blur-md">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full ${syncStatus === 'error' ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
               <span className={`mono text-[10px] ${syncStatus === 'error' ? 'text-red-500' : 'text-green-500'} uppercase tracking-widest`}>
                 {syncStatus === 'error' ? 'Local Only' : 'Global Network'}
               </span>
             </div>
             <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
             <div className="hidden md:flex items-center gap-2 text-blue-400/60">
               <Cpu size={12} />
               <span className="mono text-[8px] uppercase">Packets: {messages.length}</span>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <span className="mono text-[8px] text-blue-500 uppercase">Latency: 44ms</span>
             <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                  className="w-1/2 h-full bg-blue-500"
                />
             </div>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="h-[450px] overflow-y-auto p-6 pt-16 scrollbar-hide flex flex-col gap-4 relative"
        >
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
          
          <AnimatePresence initial={false}>
            {messages.length <= 1 && syncStatus === 'idle' ? (
               <div className="flex-1 flex flex-col items-center justify-center opacity-20 text-center gap-4">
                  <Terminal size={40} className="text-blue-500" />
                  <p className="mono text-xs uppercase tracking-widest">Encryption protocols ready.<br/>Send a message to sync all devices.</p>
               </div>
            ) : messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex flex-col relative z-20 ${msg.sender === nodeId ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[85%] p-4 rounded-2xl border ${
                  msg.sender === 'SYSTEM_CORE' 
                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-300' 
                  : msg.sender === nodeId 
                    ? 'bg-blue-600/10 border-blue-500/40 text-white rounded-br-none shadow-[0_4px_20px_rgba(59,130,246,0.2)]' 
                    : 'bg-white/5 border-white/10 text-gray-300 rounded-bl-none shadow-xl'
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

        <div className="p-6 border-t border-white/5 bg-[#0a050d]/40 relative z-20">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex-1 relative">
              <input 
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Broadcast to all devices..."
                className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none rounded-2xl p-4 pr-12 text-sm mono transition-all placeholder:text-gray-600"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500/40">
                <Radio size={16} className={syncStatus === 'syncing' ? 'animate-pulse' : ''} />
              </div>
            </div>
            <button 
              disabled={isSubmitting || !newMessage.trim()}
              className={`px-8 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 ${
                isSubmitting || !newMessage.trim()
                ? 'bg-white/5 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30 cursor-target'
              }`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={18} /> <span className="hidden md:inline">Relay</span>
                </>
              )}
            </button>
          </form>
          <div className="mt-4 flex items-center justify-between text-[8px] mono text-gray-600 uppercase tracking-widest">
            <span className="flex items-center gap-1"><Clock size={10} /> Syncing across all connected nodes</span>
            <span className="text-blue-500/40 font-bold">MODE: GLOBAL_BROADCAST</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralRelay;