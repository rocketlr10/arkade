
import React from 'react';

const h = React.createElement;

const GameViewer = ({ game, onClose }) => {
  return h('div', { className: "fixed inset-0 z-[100] bg-black flex flex-col" },
    h('div', { className: "h-20 bg-black border-b border-zinc-900 flex items-center justify-between px-8" },
      h('div', { className: "flex items-center gap-6" },
        h('button', { 
          onClick: onClose,
          className: "text-zinc-500 hover:text-white transition-colors flex items-center gap-2"
        },
          h('svg', { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" },
            h('line', { x1: "19", y1: "12", x2: "5", y2: "12" }),
            h('polyline', { points: "12 19 5 12 12 5" })
          ),
          h('span', { className: "text-[10px] font-bold tracking-widest uppercase" }, "EXIT")
        ),
        h('div', { className: "h-4 w-[1px] bg-zinc-800" }),
        h('h2', { className: "text-white font-bold text-sm uppercase tracking-tight" }, game.title)
      ),
      h('button', { 
        className: "border border-zinc-800 hover:border-zinc-500 text-zinc-400 hover:text-white px-6 py-2 text-[10px] font-bold tracking-widest uppercase transition-all" 
      }, "FULLSCREEN")
    ),
    h('div', { className: "flex-1 bg-[#050505]" },
      h('iframe', { 
        src: game.url, 
        className: "w-full h-full border-none",
        title: game.title,
        allowFullScreen: true
      })
    )
  );
};

export default GameViewer;
