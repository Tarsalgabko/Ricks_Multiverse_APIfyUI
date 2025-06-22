import React, { useState, useEffect } from 'react';
import { X, MapPin, Globe, User, Dna, Calendar, Tv, Loader } from 'lucide-react';
import { fetchCharacterEpisodes } from '../services/api';

const CharacterModal = ({ character, onClose }) => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (character && character.episode) {
      fetchCharacterEpisodes(character.episode)
        .then(episodeData => {
          setEpisodes(episodeData);
          setLoading(false);
        });
    }
  }, [character]);

  if (!character) return null;

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'alive': return '🟢';
      case 'dead': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-black/60 backdrop-blur-md border border-green-400/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-green-400/20">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20"></div>
          <div className="relative flex items-center justify-between p-6 border-b border-green-400/20">
            <h2 className="text-2xl font-bold text-green-100 font-mono">{character.name}</h2>
            <button
              onClick={onClose}
              className="p-2 text-green-400/60 hover:text-green-400 hover:bg-green-400/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Character Image and Basic Info */}
            <div className="space-y-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-xl blur opacity-75"></div>
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="relative w-full h-64 object-cover rounded-xl shadow-lg"
                />
              </div>
              
              {/* Character Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 backdrop-blur-sm border border-green-400/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="w-4 h-4 text-green-400" />
                      <span className="text-green-300/80 font-mono text-xs uppercase">Status</span>
                    </div>
                    <p className="text-green-100 font-mono">
                      {getStatusIcon(character.status)} {character.status}
                    </p>
                  </div>
                  
                  <div className="bg-black/40 backdrop-blur-sm border border-green-400/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Dna className="w-4 h-4 text-green-400" />
                      <span className="text-green-300/80 font-mono text-xs uppercase">Species</span>
                    </div>
                    <p className="text-green-100 font-mono">{character.species}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 backdrop-blur-sm border border-green-400/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="w-4 h-4 text-green-400" />
                      <span className="text-green-300/80 font-mono text-xs uppercase">Gender</span>
                    </div>
                    <p className="text-green-100 font-mono">{character.gender}</p>
                  </div>
                  
                  {character.type && (
                    <div className="bg-black/40 backdrop-blur-sm border border-green-400/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Dna className="w-4 h-4 text-green-400" />
                        <span className="text-green-300/80 font-mono text-xs uppercase">Type</span>
                      </div>
                      <p className="text-green-100 font-mono">{character.type}</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="bg-black/40 backdrop-blur-sm border border-green-400/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-4 h-4 text-green-400" />
                      <span className="text-green-300/80 font-mono text-xs uppercase">Origin</span>
                    </div>
                    <p className="text-green-100 font-mono">{character.origin.name}</p>
                  </div>
                  
                  <div className="bg-black/40 backdrop-blur-sm border border-green-400/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="w-4 h-4 text-green-400" />
                      <span className="text-green-300/80 font-mono text-xs uppercase">Location</span>
                    </div>
                    <p className="text-green-100 font-mono">{character.location.name}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Episodes */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Tv className="w-5 h-5 text-green-400" />
                <h3 className="text-green-400 font-mono text-lg font-semibold">Episodes</h3>
                <span className="text-green-300/60 font-mono text-sm">
                  ({character.episode.length})
                </span>
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader className="w-6 h-6 text-green-400 animate-spin" />
                  <span className="ml-2 text-green-300/80 font-mono">Loading episodes...</span>
                </div>
              ) : (
                <div className="bg-black/40 backdrop-blur-sm border border-green-400/20 rounded-lg max-h-96 overflow-y-auto">
                  <div className="space-y-2 p-4">
                    {episodes.map((episode, index) => (
                      <div key={index} className="bg-black/20 border border-green-400/10 rounded-lg p-3 hover:border-green-400/30 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-green-100 font-mono font-semibold">
                              {episode.name}
                            </p>
                            <p className="text-green-300/80 font-mono text-sm">
                              {episode.episode}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-green-400/60 font-mono text-xs">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(episode.air_date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;