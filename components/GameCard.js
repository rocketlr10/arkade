
import React from 'react';

const h = React.createElement;

const GameCard = ({ game, onClick }) => {
  return h('div', { 
    className: "group relative bg-[#09090b] rounded-none overflow-hidden cursor-pointer border border-zinc-900 hover:border-zinc-700 transition-all duration-300",
    onClick: () => onClick(game)
  },
    h('div', { className: "aspect-square w-full relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700" },
      h('img', { 
        src: game.thumbnail, 
        alt: game.title, 
        className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
      }),
      h('div', { className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" },
         h('div', { className: "border border-white px-6 py-2 text-[10px] font-bold tracking-widest uppercase text-white" }, "LAUNCH")
      )
    ),
    h('div', { className: "p-5" },
      h('div', { className: "flex items-center justify-between mb-2" },
        h('span', { className: "text-[9px] uppercase font-bold tracking-widest text-zinc-600" }, game.category),
        h('div', { className: "w-1 h-1 bg-zinc-800 rounded-full" })
      ),
      h('h3', { className: "text-white font-bold text-sm tracking-tight uppercase" }, game.title)
    )
  );
};

export default GameCard;
