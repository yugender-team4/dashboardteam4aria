import { useCallback, useEffect, useState } from "react"

export type Theme = "light" | "dark"

const STORAGE_KEY = "aria-theme"

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light"
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "light" || stored === "dark") return stored
  } catch {
    // ignore (private browsing, blocked storage, etc.)
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-theme", theme)
    root.classList.toggle("dark", theme === "dark")
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // ignore
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((cur) => (cur === "dark" ? "light" : "dark"))
  }, [])

  return { theme, toggleTheme }
}
