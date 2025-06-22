import React from 'react';
import { Atom, Loader } from 'lucide-react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
        <div className="relative bg-black/80 p-4 rounded-full border-2 border-green-400 shadow-lg shadow-green-400/50">
          <Atom className="w-8 h-8 text-green-400 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Loader className="w-4 h-4 text-green-400 animate-spin" />
        <p className="text-green-300/80 font-mono text-sm">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;