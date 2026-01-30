import React from 'react';

const h = React.createElement;

const GameViewer = ({ game, onClose }) => {
  return h('div', { className: "fixed inset-0 z-[100] bg-black flex flex-col" },
    h('div', { className: "h-16 bg-[#0a0a0c] border-b border-white/10 flex items-center justify-between px-6" },
      h('div', { className: "flex items-center gap-4" },
        h('button', { 
          onClick: onClose,
          className: "p-2 hover:bg-white/10 rounded-full text-white transition-colors"
        },
          // Fix: replaced '=' with ':' for strokeLinejoin property inside the attributes object
          h('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
            h('line', { x1: "19", y1: "12", x2: "5", y2: "12" }),
            h('polyline', { points: "12 19 5 12 12 5" })
          )
        ),
        h('h2', { className: "text-white font-bold" }, game.title)
      ),
      h('button', { className: "bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors" }, "Fullscreen")
    ),
    h('div', { className: "flex-1 bg-black" },
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