import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { clearStoredSession, getStoredSession, signOutUser } from '../services/auth';

export default function Header() {
  const [session, setSession] = useState(() => getStoredSession());

  useEffect(() => {
    const syncSession = () => setSession(getStoredSession());

    window.addEventListener('storage', syncSession);
    return () => window.removeEventListener('storage', syncSession);
  }, []);

  async function handleLogout() {
    await signOutUser();
    clearStoredSession();
    setSession(null);
  }

  return (
    <header className="theme-panel border-b backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link to="/" className="text-xl font-semibold text-pink-200">Rashmi Shree</Link>
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-200">
          <NavLink to="/" className={({ isActive }) => `rounded-full px-3 py-2 hover:text-pink-300 ${isActive ? 'bg-pink-500/10 text-pink-100' : ''}`}>Home</NavLink>
          <NavLink to="/shop" className={({ isActive }) => `rounded-full px-3 py-2 hover:text-pink-300 ${isActive ? 'bg-pink-500/10 text-pink-100' : ''}`}>Shop</NavLink>
          <NavLink to="/orders" className={({ isActive }) => `rounded-full px-3 py-2 hover:text-pink-300 ${isActive ? 'bg-pink-500/10 text-pink-100' : ''}`}>Orders</NavLink>
          <NavLink to="/wishlist" className={({ isActive }) => `rounded-full px-3 py-2 hover:text-pink-300 ${isActive ? 'bg-pink-500/10 text-pink-100' : ''}`}>Wishlist</NavLink>
          <NavLink to="/settings" className={({ isActive }) => `rounded-full px-3 py-2 hover:text-pink-300 ${isActive ? 'bg-pink-500/10 text-pink-100' : ''}`}>Settings</NavLink>
          {session ? (
            <>
              <span className="rounded-full border border-pink-500/40 bg-pink-500/10 px-3 py-2 text-pink-100">{session.user.name}</span>
              <button type="button" onClick={handleLogout} className="rounded-full border border-slate-700 px-4 py-2 text-slate-100 hover:border-pink-500 hover:text-pink-200">Logout</button>
            </>
          ) : (
            <Link to="/login" className="rounded-full bg-pink-500 px-4 py-2 text-white hover:bg-pink-400">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
