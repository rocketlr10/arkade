
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
        setGames([]);
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

  return h('div', { className: "min-h-screen flex flex-col" },
    h(Navbar, { 
      onSearch: setSearchTerm, 
      onHomeClick: () => {
        setActiveCategory(GameCategory.ALL);
        setSearchTerm('');
      }
    }),

    h('main', { className: "flex-1 max-w-7xl mx-auto w-full px-6 pt-12" },
      // Hero Section - Minimalist
      h('header', { className: "mb-20 text-center py-12" },
        h('h2', { className: "text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 text-white uppercase italic" }, "ARKADE"),
        h('p', { className: "text-zinc-500 text-lg max-w-lg mx-auto font-medium" }, "The definitive collection of unblocked web experiences. Clean, fast, and focused.")
      ),

      isLoading ? h('div', { className: "flex flex-col items-center justify-center py-20" },
        h('div', { className: "w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin" })
      ) : h(React.Fragment, null,
        // Categories
        h('div', { className: "flex flex-wrap justify-center gap-2 mb-16" },
          Object.values(GameCategory).map((cat) => 
            h('button', {
              key: cat,
              onClick: () => setActiveCategory(cat),
              className: `px-6 py-2 rounded-full text-xs font-bold transition-all border ${
                activeCategory === cat 
                  ? 'bg-white border-white text-black' 
                  : 'bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'
              }`
            }, cat.toUpperCase())
          )
        ),

        // Game Grid
        h('div', { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" },
          filteredGames.length > 0 ? filteredGames.map((game) => 
            h(GameCard, { 
              key: game.id, 
              game: game, 
              onClick: (g) => setSelectedGame(g) 
            })
          ) : h('div', { className: "col-span-full py-32 text-center" }, 
              h('div', { className: "inline-flex items-center justify-center w-12 h-12 rounded-full border border-zinc-800 mb-6" },
                h('div', { className: "w-2 h-2 bg-zinc-700 rounded-full" })
              ),
              h('h3', { className: "text-zinc-400 font-medium text-sm tracking-widest uppercase mb-2" }, "Library currently empty"),
              h('p', { className: "text-zinc-600 text-xs max-w-xs mx-auto" }, "We are hand-curating new titles. Please check back later.")
          )
        )
      )
    ),

    h('footer', { className: "mt-auto border-t border-zinc-900 py-12 flex flex-col items-center gap-4" }, 
      h('span', { className: "text-[10px] uppercase tracking-[0.4em] font-black text-zinc-700" }, "ARKADE"),
      h('div', { className: "text-[10px] font-medium text-zinc-500 uppercase tracking-widest" }, "© 2024 • Built for Performance")
    ),

    selectedGame && h(GameViewer, { 
      game: selectedGame, 
      onClose: () => setSelectedGame(null) 
    })
  );
};

export default App;
