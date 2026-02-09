import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isLowStim, setIsLowStim] = useState(false);

  const toggleMode = () => setIsLowStim(!isLowStim);

  return (
    <ThemeContext.Provider value={{ isLowStim, toggleMode }}>
      <div className={isLowStim ? "low-stim-mode" : "calm-mode"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);