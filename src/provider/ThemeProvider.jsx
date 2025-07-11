import React, { createContext, useState } from 'react';


export const ThemeContext = createContext();

const ThemeProvider = ({children}) => {

  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => {
    setIsDark(!isDark);
  }
  const themeInfo={
    isDark,
    toggleTheme,
  }


  return (
    <ThemeContext.Provider value={themeInfo}>
      {children}
    </ThemeContext.Provider>
   
  );
};

export default ThemeProvider;
