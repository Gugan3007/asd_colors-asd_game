import React from 'react';
import { useTheme } from '../context/ThemeContext';

const SafeMessage = ({ type, text }) => {
  const { isLowStim } = useTheme();

  // Define icon and color based on type & mode
  const isError = type === 'error';
  const icon = isError ? "⚠️" : "✅";
  
  // Dynamic classes based on state
  const normalClass = isError 
    ? "bg-red-50 border-asd-error text-slate-700" 
    : "bg-emerald-50 border-asd-success text-slate-700";
    
  const lowStimClass = "bg-stone-100 border-stone-400 font-medium text-stone-700";

  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg mb-3 border-l-4 transition-colors ${
      isLowStim ? lowStimClass : normalClass
    }`}>
      <span className="text-xl">{icon}</span>
      <span>{text}</span>
    </div>
  );
};

export default SafeMessage;