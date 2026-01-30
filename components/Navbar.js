import React from 'react';

const h = React.createElement;

const Navbar = ({ onSearch, onHomeClick }) => {
  return h('nav', { className: "sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-zinc-900 px-6 h-20 flex items-center justify-between" },
    h('div', { 
      className: "flex items-center gap-4 cursor-pointer group",
      onClick: onHomeClick
    },
      h('div', { className: "text-xl font-black tracking-tighter uppercase italic text-white" }, "ARKADE")
    ),

    h('div', { className: "flex flex-1 max-w-md ml-auto relative" },
      h('input', { 
        type: "text", 
        placeholder: "SEARCH LIBRARY", 
        onChange: (e) => onSearch(e.target.value),
        className: "w-full bg-zinc-900/50 border border-zinc-800 rounded-none px-4 py-2 focus:outline-none focus:border-zinc-500 transition-all text-[10px] font-bold tracking-widest uppercase text-white placeholder:text-zinc-600"
      }),
      h('div', { className: "absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600" },
        h('svg', { 
          xmlns: "http://www.w3.org/2000/svg", 
          width: "14", 
          height: "14", 
          viewBox: "0 0 24 24", 
          fill: "none", 
          stroke: "currentColor", 
          strokeWidth: "3", 
          strokeLinecap: "round", 
          strokeLinejoin: "round"
        },
          h('circle', { cx: "11", cy: "11", r: "8" }),
          h('line', { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
        )
      )
    )
  );
};

export default Navbar;