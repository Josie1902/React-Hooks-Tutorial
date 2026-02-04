import React, { useContext, useState } from "react";

const ThemeContext = React.createContext(false);
const ThemeUpdateContext = React.createContext(() => {});

export function useToggleTheme() {
    return useContext(ThemeUpdateContext);
}

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider2({ children }: { children: React.ReactNode }) {
    const [darkTheme, setDarkTheme] = useState(false);

    function toggleTheme() {
      setDarkTheme(prevDarkTheme => !prevDarkTheme);
    }

    return (
      <ThemeContext.Provider value={darkTheme}>
        <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
        </ThemeUpdateContext.Provider>
      </ThemeContext.Provider>
    );
}