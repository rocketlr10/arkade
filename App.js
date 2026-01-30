
import React, { useState, useMemo, useEffect } from 'react';
import { GameCategory } from './constants.js';
import Navbar from './components/Navbar.js';
import GameCard from './components/GameCard.js';
import GameViewer from './components/GameViewer.js';

const h = React.createElement;

const App = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(GameCategory.ALL);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('./games.json');
        if (!response.ok) throw new Error('Failed to load games data');
        const data = await response.json();
        setGames(data || []);
      } catch (error) {
        console.error('Error loading games:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === GameCategory.ALL || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchTerm, activeCategory]);

  return h('div', { className: "min-h-screen pb-20 bg-[#0a0a0c]" },
    h(Navbar, { 
      onSearch: setSearchTerm, 
      onHomeClick: () => {
        setActiveCategory(GameCategory.ALL);
        setSearchTerm('');
      }
    }),

    // Hero Section
    h('section', { className: "relative h-[400px] flex items-center justify-center overflow-hidden border-b border-white/5" },
      h('div', { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" }),
      h('div', { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" }),
      h('div', { className: "relative z-10 text-center px-6 max-w-3xl" },
        h('span', { className: "inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4" }, "Curated Content"),
        h('h2', { className: "text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight gaming-font" }, 
          "NOVA", h('span', { className: "text-indigo-500" }, "ARCADE")
        ),
        h('p', { className: "text-gray-400 text-lg mb-8 max-w-xl mx-auto" }, "Your personal portal to unblocked high-performance web gaming."),
        h('button', { 
          onClick: () => setActiveCategory(GameCategory.ALL),
          className: "px-12 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-indigo-600/20"
        }, "Browse Library")
      )
    ),

    h('main', { className: "max-w-7xl mx-auto px-6 mt-12" },
      isLoading ? h('div', { className: "flex flex-col items-center justify-center py-20 space-y-4" },
        h('div', { className: "w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" }),
        h('p', { className: "text-gray-500 font-medium animate-pulse" }, "Scanning Database...")
      ) : h(React.Fragment, null,
        h('div', { className: "flex flex-wrap gap-3 mb-12" },
          Object.values(GameCategory).map((cat) => 
            h('button', {
              key: cat,
              onClick: () => setActiveCategory(cat),
              className: `px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                activeCategory === cat 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`
            }, cat)
          )
        ),

        h('div', { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" },
          filteredGames.length > 0 ? filteredGames.map((game) => 
            h(GameCard, { 
              key: game.id, 
              game: game, 
              onClick: (g) => setSelectedGame(g) 
            })
          ) : h('div', { className: "col-span-full py-32 text-center" }, 
              h('div', { className: "w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6" },
                h('svg', { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", className: "text-gray-600" },
                  h('rect', { width: "18", height: "18", x: "3", y: "3", rx: "2" }),
                  h('path', { d: "M3 9h18" }),
                  h('path', { d: "M9 21V9" })
                )
              ),
              h('h3', { className: "text-white font-bold text-xl mb-2" }, "Vault is Empty"),
              h('p', { className: "text-gray-500 max-w-sm mx-auto" }, "There are currently no games in the library. Check back soon for new additions.")
          )
        )
      )
    ),

    h('footer', { className: "mt-24 border-t border-white/5 py-12 text-center text-gray-600 text-[10px] uppercase tracking-widest font-bold" }, 
      "\u00A9 2024 NOVAARCADE."
    ),

    selectedGame && h(GameViewer, { 
      game: selectedGame, 
      onClose: () => setSelectedGame(null) 
    })
  );
};

export default App;
