import { useEffect, useState } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { applyTheme, getStoredTheme } from '../services/theme';

export default function MainLayout({ children }) {
  const [theme, setTheme] = useState(() => getStoredTheme());

  useEffect(() => {
    applyTheme(getStoredTheme());
    setTheme(getStoredTheme());

    const syncTheme = () => {
      const nextTheme = getStoredTheme();
      applyTheme(nextTheme);
      setTheme(nextTheme);
    };

    window.addEventListener('rashmi-theme-changed', syncTheme);
    return () => window.removeEventListener('rashmi-theme-changed', syncTheme);
  }, []);

  const shellClass =
    theme === 'light'
      ? 'min-h-screen bg-[linear-gradient(135deg,#fff7ed_0%,#eff6ff_42%,#fdf2f8_100%)] text-slate-950'
      : theme === 'neon'
        ? 'min-h-screen bg-[linear-gradient(135deg,#020617_0%,#111827_30%,#4c1d95_58%,#0f766e_100%)] text-white'
        : 'min-h-screen bg-[linear-gradient(135deg,#020617_0%,#111827_45%,#172554_100%)] text-white';

  return (
    <div className={`app-shell ${shellClass}`}>
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <section className="space-y-6">{children}</section>
          <Sidebar />
        </div>
      </main>
      <Footer />
    </div>
  );
}
