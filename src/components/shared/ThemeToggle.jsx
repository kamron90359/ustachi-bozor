import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'dark';
    } catch (e) {
      return false;
    }
  });
  useEffect(() => {
    const root = document.documentElement;
    // Apply the dark class without animation on initial mount; transitions are added only when toggling
    if (isDark) root.classList.add('dark');else root.classList.remove('dark');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (e) {
      // ignore
    }
  }, [isDark]);
  const handleToggle = () => {
    const root = document.documentElement;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      // Add a transient class that enables smooth transitions, remove after 350ms
      root.classList.add('theme-transition');
      window.setTimeout(() => root.classList.remove('theme-transition'), 350);
    }
    setIsDark(v => !v);
  };
  return <button onClick={handleToggle} aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'} title={isDark ? 'Light' : 'Dark'} className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-[var(--color-bg)] focus-ring">
      {isDark ? <Sun className="h-5 w-5 text-[var(--color-navy)]" /> : <Moon className="h-5 w-5 text-[var(--color-navy)]" />}
    </button>;
}
