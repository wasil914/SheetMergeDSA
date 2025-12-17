import React, { useEffect, useState } from "react";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const storageKey = "theme-preference";

  const getColorPreference = () => {
    if (localStorage.getItem(storageKey)) return localStorage.getItem(storageKey);
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getColorPreference());

  const setPreference = (newTheme) => {
    localStorage.setItem(storageKey, newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setPreference(newTheme);
  };

  useEffect(() => {
    setPreference(theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      const systemTheme = e.matches ? "dark" : "light";
      setTheme(systemTheme);
      setPreference(systemTheme);
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme]);

  return (
    <div className="theme-switch-wrapper">
      <input
        type="checkbox"
        id="theme-switch"
        className="theme-switch-checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label htmlFor="theme-switch" className="theme-switch-label">
        <span className="theme-switch-inner" />
        <span className="theme-switch-switch" />
      </label>
    </div>
  );
}
