
import React from 'react';
import { Muppet } from '../types';

interface Props {
  muppet: Muppet;
  onClick: (m: Muppet) => void;
}

export const MuppetCard: React.FC<Props> = ({ muppet, onClick }) => {
  return (
    <div 
      onClick={() => onClick(muppet)}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all cursor-pointer border-t-4 border-emerald-500 group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={muppet.imageUrl} 
          alt={muppet.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-bold">
          {muppet.era}
        </div>
      </div>
      <div className="p-4">
        <h3 className="muppet-font text-xl text-gray-800 mb-1">{muppet.name}</h3>
        <p className="text-sm text-gray-500 font-semibold mb-2">{muppet.performer}</p>
        <p className="text-gray-600 text-sm line-clamp-2 italic">"{muppet.bestKnownFor}"</p>
      </div>
    </div>
  );
};
