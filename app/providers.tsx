"use client";
import { SessionProvider } from "next-auth/react";
import { useState, useEffect, createContext, useContext } from "react";

type Theme = 'light' | 'dark'
const ThemeContext = createContext<{ theme: string; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
})

export const useTheme = () => useContext(ThemeContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme
    if (saved) setTheme(saved)
    else setTheme('dark')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <SessionProvider>{children}</SessionProvider>
    </ThemeContext.Provider>
  );
}
