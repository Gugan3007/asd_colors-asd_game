import React from 'react';
import { useTheme } from '../context/ThemeContext';

const SafeCard = ({ title, children, className = "" }) => {
  const { isLowStim } = useTheme();

  return (
    <div className={`rounded-xl p-6 transition-all mb-6 ${
      isLowStim 
        ? 'bg-transparent border-2 border-dashed border-stone-300 shadow-none text-[#4E4E4E]' 
        : 'bg-white shadow-sm border border-slate-100 text-asd-text'
    } ${className}`}>
      
      {title && (
        <h2 className="text-sm font-bold uppercase tracking-wider opacity-60 mb-4">
          {title}
        </h2>
      )}
      
      {children}
    </div>
  );
};

export default SafeCard;