
import React from 'react';

const HeaderOverlay: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-between px-2 mb-8 mono text-[10px] md:text-xs text-blue-500/60 uppercase tracking-widest">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
          SYSTEM READY
        </span>
        <span className="hidden md:inline">PORTFOLIO v2.0.25</span>
      </div>
      <div className="flex items-center gap-4">
        <span>UI LOADING COMPLETE</span>
        <span className="flex items-center gap-1 text-green-500">
          <span className="w-1 h-1 bg-green-500 rounded-full" />
          ONLINE
        </span>
      </div>
    </div>
  );
};

export default HeaderOverlay;