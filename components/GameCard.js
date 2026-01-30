
import React from 'react';

const h = React.createElement;

const GameCard = ({ game, onClick }) => {
  return h('div', { 
    className: "group relative bg-[#1a1a1e] rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-indigo-500/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1",
    onClick: () => onClick(game)
  },
    h('div', { className: "aspect-[4/3] w-full relative overflow-hidden" },
      h('img', { 
        src: game.thumbnail, 
        alt: game.title, 
        className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      }),
      h('div', { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4" },
         h('button', { className: "w-full bg-white text-black font-bold py-2 rounded-lg text-sm transition-transform translate-y-2 group-hover:translate-y-0 duration-300" }, "Play Now")
      )
    ),
    h('div', { className: "p-4" },
      h('span', { className: "text-[10px] uppercase font-bold tracking-widest text-indigo-400" }, game.category),
      h('h3', { className: "text-white font-bold text-lg group-hover:text-indigo-400 transition-colors" }, game.title),
      h('p', { className: "text-gray-400 text-xs mt-1 line-clamp-2" }, game.description)
    )
  );
};

export default GameCard;
