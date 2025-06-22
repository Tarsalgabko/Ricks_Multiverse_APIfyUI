import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-black/20 backdrop-blur-sm border-t border-green-500/10 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Copyright Info */}
          <div className="text-center md:text-left">
            <p className="text-green-300/60 font-mono text-sm">
              © 2025 Rick's Multiverse
            </p>
            <p className="text-green-400/80 font-mono text-xs mt-1">
              Created by <span className="text-green-400">Gabriell S. Kisely</span> • MIT License
            </p>
          </div>
          
          {/* Floating Rick - Clickable to scroll to top */}
          <div className="relative">
            <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl opacity-50"></div>
            <button
              onClick={scrollToTop}
              className="relative group cursor-pointer transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400/30 rounded-full"
              title="Scroll to top"
            >
              <img 
                src="src/assets/rick.jpg"
                alt="Rick Sanchez" 
                className="w-20 h-20 object-cover rounded-full border border-green-400/30 shadow-lg shadow-green-400/20 animate-float group-hover:border-green-400/60 transition-all duration-300"
              />
            </button>
          </div>
          
          {/* Additional Info */}
          <div className="text-center md:text-right">
            <p className="text-green-300/40 font-mono text-xs">
              Powered by Rick and Morty API
            </p>
            <p className="text-green-400/60 font-mono text-xs mt-1">
              Wubba Lubba Dub Dub!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;