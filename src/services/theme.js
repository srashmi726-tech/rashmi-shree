const THEME_KEY = 'rashmi-shree-theme';
const memoryStore = {};

export const THEME_OPTIONS = ['dark', 'neon', 'light'];

function getStorage() {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }

  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : null;
    },
    setItem(key, value) {
      memoryStore[key] = String(value);
    },
    removeItem(key) {
      delete memoryStore[key];
    }
  };
}

export function getStoredTheme() {
  const storage = getStorage();
  const savedTheme = storage?.getItem(THEME_KEY);

  return THEME_OPTIONS.includes(savedTheme || '') ? savedTheme : 'dark';
}

export function setStoredTheme(theme) {
  const storage = getStorage();
  const nextTheme = THEME_OPTIONS.includes(theme) ? theme : 'dark';

  storage?.setItem(THEME_KEY, nextTheme);
  applyTheme(nextTheme);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('rashmi-theme-changed', { detail: { theme: nextTheme } }));
  }

  return nextTheme;
}

export function applyTheme(theme = getStoredTheme()) {
  if (typeof document === 'undefined') {
    return theme;
  }

  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme === 'light' ? 'light' : 'dark';

  return theme;
}
