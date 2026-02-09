import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { isLowStim, toggleMode } = useTheme();

  return (
    <header className={`flex justify-between items-center mb-8 border-b pb-4 transition-colors ${
      isLowStim ? 'border-stone-300' : 'border-slate-200'
    }`}>
      <div>
        <h1 className={`text-2xl font-bold tracking-tight ${
           isLowStim ? 'text-[#4E4E4E]' : 'text-asd-text'
        }`}>
          ColorCode <span className="font-normal text-base opacity-70">ASD Assistant</span>
        </h1>
      </div>
      
      <button 
        onClick={toggleMode}
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all shadow-sm ${
          isLowStim 
            ? 'bg-transparent border-2 border-stone-400 text-stone-600 hover:bg-stone-100' 
            : 'bg-white text-asd-accent border border-slate-200 hover:shadow-md'
        }`}
      >
        {isLowStim ? '🛑 Restore Colors' : '🍃 Low Stim Mode'}
      </button>
    </header>
  );
};

export default Header;