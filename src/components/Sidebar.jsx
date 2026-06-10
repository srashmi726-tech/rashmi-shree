import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { getStoredSession } from '../services/auth';

const accountLinks = [
  { label: 'Overview', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Orders', to: '/orders' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'Settings', to: '/settings' }
];

const controlCards = [
  { title: 'Account details', text: 'Profile name, email, phone and plan preferences.' },
  { title: 'Theme & display', text: 'Switch between dark, neon and minimal storefront themes.' },
  { title: 'Address book', text: 'Manage saved addresses, delivery notes and default shipping options.' },
  { title: 'Notifications', text: 'Control order alerts, promos and support updates.' }
];

export default function Sidebar() {
  const [session, setSession] = useState(() => getStoredSession());

  useEffect(() => {
    const syncSession = () => setSession(getStoredSession());
    window.addEventListener('storage', syncSession);
    return () => window.removeEventListener('storage', syncSession);
  }, []);

  return (
    <aside className="theme-panel w-full rounded-3xl p-5 xl:sticky xl:top-6 xl:self-start">
      <p className="text-xs uppercase tracking-[0.35em] text-pink-400">Profile lane</p>
      <h2 className="mt-2 text-xl font-semibold text-white">Account control center</h2>
      <p className="mt-2 text-sm text-slate-300">Use this right-hand panel to jump between pages and manage your account, theme, and address preferences.</p>

      <div className="theme-chip mt-5 rounded-3xl p-4">
        <p className="text-xs uppercase tracking-[0.35em] text-pink-200">Signed in</p>
        <p className="mt-2 text-lg font-semibold text-white">Buyer Demo</p>
        <p className="text-sm text-slate-200">buyer@example.com · Insider tier</p>
      </div>

      <div className="mt-5 space-y-2">
        {accountLinks.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-2xl border px-3 py-3 text-sm transition ${
                isActive
                  ? 'border-pink-500 bg-pink-500/10 text-pink-100'
                  : 'border-slate-700/80 bg-slate-950/60 text-slate-100 hover:border-pink-500 hover:bg-slate-800'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-pink-400">Settings</p>
        {controlCards.map((card) => (
          <article key={card.title} className="theme-card rounded-2xl p-3">
            <p className="text-sm font-semibold text-white">{card.title}</p>
            <p className="mt-1 text-sm text-slate-300">{card.text}</p>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-100 hover:border-pink-500 hover:text-pink-100"
      >
        Manage account settings
      </button>
    </aside>
  );
}
