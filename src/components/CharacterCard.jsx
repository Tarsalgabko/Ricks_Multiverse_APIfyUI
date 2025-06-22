import React from 'react';
import { Eye, Zap, Heart, Skull, HelpCircle } from 'lucide-react';

const CharacterCard = ({ character, onClick }) => {
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'alive': return <Heart className="w-4 h-4 text-green-400" />;
      case 'dead': return <Skull className="w-4 h-4 text-red-400" />;
      default: return <HelpCircle className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'alive': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'dead': return 'text-red-400 border-red-400/30 bg-red-400/10';
      default: return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
    }
  };

  return (
    <div 
      onClick={() => onClick(character)}
      className="group relative cursor-pointer"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Card */}
      <div className="relative bg-black/40 backdrop-blur-sm border border-green-400/20 rounded-xl overflow-hidden shadow-lg group-hover:border-green-400/40 transition-all duration-300 group-hover:shadow-green-400/20 group-hover:shadow-xl">
        {/* Image container */}
        <div className="relative overflow-hidden">
          <img 
            src={character.image} 
            alt={character.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* View icon overlay */}
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Eye className="w-4 h-4 text-green-400" />
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="text-green-100 font-mono text-lg font-semibold truncate group-hover:text-green-300 transition-colors">
            {character.name}
          </h3>
          
          <div className="space-y-2">
            {/* Status */}
            <div className={`inline-flex items-center space-x-2 px-2 py-1 rounded-full border font-mono text-xs ${getStatusColor(character.status)}`}>
              {getStatusIcon(character.status)}
              <span className="capitalize">{character.status}</span>
            </div>
            
            {/* Species & Gender */}
            <div className="flex items-center justify-between text-green-300/80 font-mono text-xs">
              <span className="capitalize">{character.species}</span>
              <span className="capitalize text-green-400/60">{character.gender}</span>
            </div>
          </div>
          
          {/* Hover effect indicator */}
          <div className="flex items-center justify-center space-x-1 text-green-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Zap className="w-3 h-3" />
            <span className="font-mono text-xs">Click to explore</span>
            <Zap className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;