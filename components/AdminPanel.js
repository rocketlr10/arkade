
import React, { useState } from 'react';

const h = React.createElement;

const AdminPanel = ({ isOpen, onClose, onAddGame, onReset, onDeleteSessionGame, currentGames }) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [iframeSnippet, setIframeSnippet] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [thumbnail, setThumbnail] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    let finalUrl = iframeSnippet;
    const srcMatch = iframeSnippet.match(/src=["']([^"']+)["']/);
    if (srcMatch && srcMatch[1]) {
      finalUrl = srcMatch[1];
    }

    const newGame = {
      id: title.toLowerCase().replace(/\s+/g, '-'),
      title,
      url: finalUrl,
      thumbnail: thumbnail || `https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop`,
      category
    };

    onAddGame(newGame);
    setTitle('');
    setIframeSnippet('');
    setThumbnail('');
  };

  const copyConfig = () => {
    const json = JSON.stringify(currentGames, null, 2);
    navigator.clipboard.writeText(json);
    alert('Full configuration copied! Paste this into games.json to save for everyone.');
  };

  const localGames = JSON.parse(localStorage.getItem('arkade_custom_games') || '[]');

  return h('div', { className: "fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4" },
    h('div', { className: "bg-[#0c0c0e] border border-zinc-800 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl" },
      // Header
      h('div', { className: "p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/30" },
        h('div', null,
          h('h2', { className: "text-white font-black text-sm tracking-[0.2em] uppercase mb-1" }, "DEVELOPER CONSOLE"),
          h('p', { className: "text-zinc-500 text-[10px] uppercase font-bold tracking-tight" }, "System Library Management")
        ),
        h('button', { onClick: onClose, className: "p-2 text-zinc-500 hover:text-white transition-colors" },
          h('svg', { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" },
            h('line', { x1: "18", y1: "6", x2: "6", y2: "18" }),
            h('line', { x1: "6", y1: "6", x2: "18", y2: "18" })
          )
        )
      ),

      // Two Column Layout
      h('div', { className: "flex-1 overflow-hidden flex" },
        // Left Column: Add Game
        h('div', { className: "w-1/2 overflow-y-auto p-8 border-r border-zinc-800" },
          h('h3', { className: "text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-6" }, "Register New Entry"),
          h('form', { onSubmit: handleAdd, className: "space-y-6" },
            h('div', { className: "space-y-4" },
              h('div', null,
                h('label', { className: "text-[9px] text-zinc-600 font-black uppercase tracking-widest block mb-2" }, "Title"),
                h('input', { 
                  required: true,
                  value: title,
                  onChange: e => setTitle(e.target.value),
                  className: "w-full bg-zinc-900/50 border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-zinc-500 transition-colors" 
                })
              ),
              h('div', null,
                h('label', { className: "text-[9px] text-zinc-600 font-black uppercase tracking-widest block mb-2" }, "Source (Iframe or URL)"),
                h('textarea', { 
                  required: true,
                  value: iframeSnippet,
                  onChange: e => setIframeSnippet(e.target.value),
                  placeholder: "<iframe src='...'></iframe>",
                  className: "w-full bg-zinc-900/50 border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-zinc-500 h-24 font-mono transition-colors" 
                })
              ),
              h('div', { className: "grid grid-cols-2 gap-4" },
                h('div', null,
                  h('label', { className: "text-[9px] text-zinc-600 font-black uppercase tracking-widest block mb-2" }, "Category"),
                  h('select', { 
                    value: category,
                    onChange: e => setCategory(e.target.value),
                    className: "w-full bg-zinc-900/50 border border-zinc-800 p-3 text-xs text-white focus:outline-none" 
                  },
                    ['Arcade', 'Action', 'Puzzle', 'Sports', 'Classic'].map(cat => h('option', { key: cat, value: cat }, cat))
                  )
                ),
                h('div', null,
                  h('label', { className: "text-[9px] text-zinc-600 font-black uppercase tracking-widest block mb-2" }, "Cover URL"),
                  h('input', { 
                    value: thumbnail,
                    placeholder: "https://...",
                    onChange: e => setThumbnail(e.target.value),
                    className: "w-full bg-zinc-900/50 border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-zinc-500 transition-colors" 
                  })
                )
              )
            ),
            h('button', { 
              type: "submit",
              className: "w-full bg-white text-black font-black text-[10px] py-4 tracking-[0.2em] uppercase hover:bg-zinc-200 transition-all" 
            }, "Append to Session")
          )
        ),

        // Right Column: Session & Export
        h('div', { className: "w-1/2 overflow-y-auto p-8 bg-zinc-900/10 flex flex-col" },
          h('div', { className: "flex-1" },
            h('h3', { className: "text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-6" }, "Current Session Games"),
            localGames.length === 0 ? h('p', { className: "text-zinc-600 text-[10px] uppercase font-bold text-center py-12 border border-dashed border-zinc-800" }, "No temporary games added")
            : h('div', { className: "space-y-2" },
                localGames.map((g) => h('div', { key: g.id, className: "flex items-center justify-between p-3 bg-zinc-900/40 border border-zinc-800" },
                  h('div', null,
                    h('p', { className: "text-white text-[10px] font-bold uppercase" }, g.title),
                    h('p', { className: "text-zinc-600 text-[8px] uppercase font-bold" }, g.category)
                  ),
                  h('button', { 
                    onClick: () => onDeleteSessionGame(g.id),
                    className: "text-zinc-700 hover:text-red-500 transition-colors" 
                  },
                    h('svg', { xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" },
                      h('polyline', { points: "3 6 5 6 21 6" }),
                      h('path', { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })
                    )
                  )
                ))
            )
          ),

          h('div', { className: "mt-8 pt-8 border-t border-zinc-800 space-y-4" },
            h('p', { className: "text-[9px] text-zinc-500 leading-relaxed font-medium" }, 
              "To save these games PERMANENTLY, click the button below to copy the new configuration, then paste it into your games.json file."
            ),
            h('div', { className: "flex gap-2" },
              h('button', { 
                onClick: copyConfig,
                className: "flex-1 border border-zinc-700 text-zinc-300 font-black text-[9px] py-3 tracking-widest uppercase hover:border-white hover:text-white transition-all" 
              }, "Copy JSON Config"),
              h('button', { 
                onClick: onReset,
                className: "border border-red-900/30 text-red-500/50 font-black text-[9px] px-4 py-3 tracking-widest uppercase hover:bg-red-500/10 hover:text-red-500 transition-all" 
              }, "Clear")
            )
          )
        )
      )
    )
  );
};

export default AdminPanel;
