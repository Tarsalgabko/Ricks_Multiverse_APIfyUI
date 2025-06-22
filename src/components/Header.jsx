import React from 'react';

const Header = () => {
  return (
    <header className="relative z-10 bg-black/30 backdrop-blur-sm border-b border-green-500/20">
      {/* Portal Logo - Top Left */}
      <div className="absolute top-4 left-4 z-20">
        <div className="relative group">
          <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity animate-pulse"></div>
          <img 
            src="/src/assets/rick-and-morty-portal.jpg" 
            alt="Rick and Morty Portal" 
            className="relative w-16 h-16 rounded-full border-2 border-green-400/50 shadow-lg shadow-green-400/30 object-cover group-hover:border-green-400/70 transition-all duration-300"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-green-500 font-mono tracking-wider">
              RICK'S
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-green-300 font-mono tracking-widest">
              MULTIVERSE
            </h2>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-green-300/80 font-mono text-sm md:text-base tracking-wide">
            Explore infinite dimensions and meet every Rick & Morty character
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;