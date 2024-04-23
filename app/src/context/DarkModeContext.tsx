import React, { createContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface DarkModeContextProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

interface DarkModeProviderProps {
  children: React.ReactNode;
}

const initialDarkModeContextValue: DarkModeContextProps = {
  isDarkMode: false,
  toggleDarkMode: () => {},
};

export const DarkModeContext = createContext<DarkModeContextProps>(
  initialDarkModeContextValue
);

export default function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useLocalStorage(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((s: boolean) => !s);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
