import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

const ThemeProvider = ({ children }) => {
  // Default theme is light; you can change it to any of the themes
  const savedTheme = localStorage.getItem("theme") || "light";

  const [theme, setTheme] = useState(savedTheme);

  const toggleTheme = () => {
    const nextTheme =
      theme === "light" ? "dark" : theme === "dark" ? "blue" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme); // Save the theme to localStorage
  };

  useEffect(() => {
    // Apply the theme class to the <body> tag
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
