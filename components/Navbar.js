
import React from 'react';

const h = React.createElement;

const Navbar = ({ onSearch, onHomeClick }) => {
  return h('nav', { className: "sticky top-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between" },
    h('div', { 
      className: "flex items-center gap-2 cursor-pointer group",
      onClick: onHomeClick
    },
      h('div', { className: "w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-colors shadow-lg" },
        h('svg', { 
          xmlns: "http://www.w3.org/2000/svg", 
          width: "24", 
          height: "24", 
          viewBox: "0 0 24 24", 
          fill: "none", 
          stroke: "currentColor", 
          strokeWidth: "2", 
          strokeLinecap: "round", 
          strokeLinejoin: "round", 
          className: "text-white" 
        },
          h('polyline', { points: "16 18 22 12 16 6" }),
          h('polyline', { points: "8 6 2 12 8 18" })
        )
      ),
      h('h1', { className: "text-xl font-extrabold tracking-tighter gaming-font text-white" },
        "NOVA", h('span', { className: "text-indigo-500" }, "ARCADE")
      )
    ),

    h('div', { className: "hidden md:flex flex-1 max-w-xl mx-8 relative" },
      h('input', { 
        type: "text", 
        placeholder: "Search for a game...", 
        onChange: (e) => onSearch(e.target.value),
        className: "w-full bg-white/5 border border-white/10 rounded-full px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm"
      }),
      h('svg', { 
        xmlns: "http://www.w3.org/2000/svg", 
        width: "18", 
        height: "18", 
        viewBox: "0 0 24 24", 
        fill: "none", 
        stroke: "currentColor", 
        strokeWidth: "2", 
        strokeLinecap: "round", 
        strokeLinejoin: "round", 
        className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
      },
        h('circle', { cx: "11", cy: "11", r: "8" }),
        h('line', { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
      )
    ),

    h('button', { className: "bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all" }, "Login")
  );
};

export default Navbar;
