
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
      className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer border-4 border-emerald-400 group transform hover:-translate-y-2"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={muppet.imageUrl} 
          alt={muppet.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 right-3 bg-yellow-400 text-red-700 text-xs px-3 py-1 rounded-full font-bold muppet-sub shadow-md">
          {muppet.era}
        </div>
      </div>
      <div className="p-5 text-center">
        <h3 className="muppet-title text-2xl text-emerald-700 mb-1 group-hover:text-emerald-500 transition-colors">{muppet.name}</h3>
        <p className="text-sm text-gray-500 font-bold mb-3 muppet-sub">{muppet.performer}</p>
        <div className="h-px bg-emerald-100 w-1/2 mx-auto mb-3"></div>
        <p className="text-gray-600 text-sm italic line-clamp-2 leading-relaxed">"{muppet.bestKnownFor}"</p>
      </div>
    </div>
  );
};
