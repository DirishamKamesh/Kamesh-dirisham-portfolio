'use client';

import { useSyncExternalStore, useCallback } from 'react';
import { soundController } from '@/lib/sound';

export type PortfolioTheme = 'dark' | 'light';

const STORAGE_KEY = 'dk-portfolio-theme';
const THEME_EVENT = 'dk-portfolio-theme-change';

function getThemeSnapshot(): PortfolioTheme {
  if (typeof document === 'undefined') return 'dark';
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') {
    return attr;
  }
  return 'dark';
}

function getServerSnapshot(): PortfolioTheme {
  return 'dark';
}

function subscribeToTheme(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback();
  window.addEventListener(THEME_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(THEME_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}

export function applyPortfolioTheme(nextTheme: PortfolioTheme) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', nextTheme);
  document.documentElement.style.colorScheme = nextTheme;
  try {
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  } catch {
    // Ignore storage restrictions
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerSnapshot
  );

  const toggleTheme = useCallback(() => {
    const next: PortfolioTheme = theme === 'dark' ? 'light' : 'dark';
    soundController.playSubtleTick(next === 'dark' ? 520 : 660);
    applyPortfolioTheme(next);
  }, [theme]);

  const setTheme = useCallback((next: PortfolioTheme) => {
    soundController.playSubtleTick(next === 'dark' ? 520 : 660);
    applyPortfolioTheme(next);
  }, []);

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme,
  };
}
