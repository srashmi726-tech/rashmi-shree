import { useState } from 'react';

import MainLayout from '../../layouts/MainLayout';
import { getStoredSession } from '../../services/auth';
import { THEME_OPTIONS, getStoredTheme, setStoredTheme } from '../../services/theme';

const accountFields = [
  { label: 'Full name', value: 'Buyer Demo' },
  { label: 'Email', value: 'buyer@example.com' },
  { label: 'Phone', value: '+91 98765 43210' },
  { label: 'Membership', value: 'Insider / 2450 points' }
];

const addressCards = [
  { title: 'Home address', detail: 'A-12, Orchid Apartments, Bengaluru, Karnataka' },
  { title: 'Work address', detail: 'Skyline Tower, MG Road, Bengaluru' }
];

export default function Settings() {
  const session = getStoredSession();
  const [selectedTheme, setSelectedTheme] = useState(() => getStoredTheme());

  function handleThemeChange(theme) {
    setSelectedTheme(setStoredTheme(theme));
  }

  return (
    <MainLayout>
      <section className="theme-panel rounded-3xl p-6 shadow-2xl shadow-black/30">
        <p className="text-sm uppercase tracking-[0.35em] text-pink-400">Account settings</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Control your account, theme, and delivery preferences</h1>
        <p className="mt-2 text-slate-300">This page complements the right-side control panel and keeps the buyer experience multi-page rather than a single screen.</p>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <article className="theme-card rounded-3xl p-5">
            <h2 className="text-xl font-semibold text-white">Account details</h2>
            <div className="mt-4 space-y-3">
              {accountFields.map((field) => (
                <div key={field.label} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
                  <p className="text-xs uppercase tracking-[0.35em] text-pink-400">{field.label}</p>
                  <p className="mt-1 text-sm text-slate-100">{field.value}</p>
                </div>
              ))}
              <div className="rounded-2xl border border-pink-500/30 bg-pink-500/10 p-3 text-sm text-pink-100">
                Signed in as {session?.user?.name || 'Buyer Demo'} · {session?.user?.email || 'buyer@example.com'}
              </div>
            </div>
          </article>

          <article className="theme-card rounded-3xl p-5">
            <h2 className="text-xl font-semibold text-white">Theme preferences</h2>
            <p className="mt-2 text-sm text-slate-300">Switch the storefront display to match your shopping mood.</p>
            <div className="mt-4 grid gap-3">
              {THEME_OPTIONS.map((theme) => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => handleThemeChange(theme)}
                  className={`rounded-2xl border px-4 py-3 text-left capitalize transition ${selectedTheme === theme ? 'border-pink-500 bg-pink-500/10 text-pink-100' : 'border-slate-700/70 bg-slate-900/70 text-slate-100 hover:border-pink-500 hover:bg-slate-800'}`}
                >
                  {theme} theme
                </button>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <article className="theme-card rounded-3xl p-5">
            <h2 className="text-xl font-semibold text-white">Address book</h2>
            <div className="mt-4 space-y-3">
              {addressCards.map((address) => (
                <article key={address.title} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                  <p className="text-sm font-semibold text-white">{address.title}</p>
                  <p className="mt-1 text-sm text-slate-300">{address.detail}</p>
                </article>
              ))}
            </div>
          </article>

          <article className="theme-card rounded-3xl p-5">
            <h2 className="text-xl font-semibold text-white">Notifications & support</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              <li className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">Order updates and tracking alerts</li>
              <li className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">Promotions and coupon reminders</li>
              <li className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">Support chat and help center contacts</li>
            </ul>
          </article>
        </div>
      </section>
    </MainLayout>
  );
}
