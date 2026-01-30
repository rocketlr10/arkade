
import React from 'react';

const GameViewer = ({ game, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      <div className="h-16 bg-[#0a0a0c] border-b border-white/10 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
          <h2 className="text-white font-bold">{game.title}</h2>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors">
          Fullscreen
        </button>
      </div>
      <div className="flex-1 bg-black">
        <iframe 
          src={game.url} 
          className="w-full h-full border-none"
          title={game.title}
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default GameViewer;
