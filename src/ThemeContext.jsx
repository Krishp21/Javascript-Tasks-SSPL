import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("darkMode");
    return storedTheme !== null ? JSON.parse(storedTheme) : false;
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    console.log("Setting theme:", darkMode); // ✅ Debugging
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if (darkMode) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    console.log("Toggling theme"); // ✅ Debugging
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
