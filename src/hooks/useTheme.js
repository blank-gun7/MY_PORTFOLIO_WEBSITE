'use client';

import { useCallback, useSyncExternalStore } from 'react';

function subscribeToTheme(callback) {
  window.addEventListener('theme-change', callback);
  return () => window.removeEventListener('theme-change', callback);
}

function getThemeSnapshot() {
  return localStorage.getItem('theme') || 'dark';
}

function getThemeServerSnapshot() {
  return 'dark';
}

const emptySubscribe = () => () => {};

export function useTheme() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getThemeServerSnapshot);

  const setTheme = useCallback((newTheme) => {
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.dispatchEvent(new Event('theme-change'));
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }, [theme, setTheme]);

  return { theme, toggleTheme, setTheme, mounted };
}
