import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  authenticateDemoUser,
  DEMO_ACCOUNTS,
  signInWithEmailPassword,
  signInWithGoogle
} from '../../services/auth';

const roleOptions = [
  { id: 'buyer', label: 'Buyer', description: 'Browse and checkout' },
  { id: 'seller', label: 'Seller', description: 'Manage products' },
  { id: 'admin', label: 'Admin', description: 'View admin tools' }
];

export default function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('buyer');
  const [email, setEmail] = useState(DEMO_ACCOUNTS.buyer.email);
  const [password, setPassword] = useState(DEMO_ACCOUNTS.buyer.password);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);

  const activeRole = useMemo(() => DEMO_ACCOUNTS[selectedRole], [selectedRole]);

  function handleRoleChange(role) {
    setSelectedRole(role);
    setEmail(DEMO_ACCOUNTS[role].email);
    setPassword(DEMO_ACCOUNTS[role].password);
    setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await signInWithEmailPassword(email, password);

      if (!result.ok) {
        setError(result.message);
        return;
      }

      navigate('/', { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleQuickLogin(role) {
    const result = authenticateDemoUser(DEMO_ACCOUNTS[role].email, DEMO_ACCOUNTS[role].password);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate('/', { replace: true });
  }

  async function handleGoogleLogin() {
    setError('');
    setIsGoogleSigningIn(true);

    try {
      const result = await signInWithGoogle();

      if (!result.ok) {
        setError(result.message);
        return;
      }

      navigate('/', { replace: true });
    } finally {
      setIsGoogleSigningIn(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-black/30">
        <p className="text-pink-400 text-sm uppercase tracking-[0.35em]">Rashmi Shree</p>
        <h1 className="mt-4 text-3xl font-semibold">Welcome back</h1>
        <p className="mt-3 text-slate-300">Sign in with a demo account to access the buyer, seller, or admin workspace.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {roleOptions.map((option) => (
            <button
              type="button"
              key={option.id}
              onClick={() => handleRoleChange(option.id)}
              className={`rounded-2xl border px-3 py-3 text-left transition ${selectedRole === option.id ? 'border-pink-500 bg-pink-500/10 text-pink-100' : 'border-slate-700 bg-slate-800 text-slate-200 hover:border-pink-500'}`}
            >
              <span className="block text-sm font-semibold">{option.label}</span>
              <span className="text-xs text-slate-300">{option.description}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm text-slate-200">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-0 placeholder:text-slate-400 focus:border-pink-500"
              placeholder="you@example.com"
            />
          </label>

          <label className="block text-sm text-slate-200">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-0 placeholder:text-slate-400 focus:border-pink-500"
              placeholder="Enter password"
            />
          </label>

          {error ? <p className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-pink-500 px-4 py-3 font-semibold text-white hover:bg-pink-400 transition disabled:cursor-not-allowed disabled:bg-pink-400/70"
          >
            {isSubmitting ? 'Signing in…' : `Sign in as ${activeRole.role}`}
          </button>
        </form>

        <div className="mt-4 grid gap-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleSigningIn}
            className="w-full rounded-xl bg-pink-500 px-4 py-3 font-semibold text-white hover:bg-pink-400 transition disabled:cursor-not-allowed disabled:bg-pink-400/70"
          >
            {isGoogleSigningIn ? 'Connecting to Google…' : 'Continue with Google'}
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('seller')}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 font-semibold text-slate-100 hover:border-pink-500 transition"
          >
            Use demo seller login
          </button>
        </div>

        <p className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
          Demo credentials: buyer@example.com / buyer123, seller@example.com / seller123, admin@example.com / admin123.
        </p>

        <p className="mt-6 text-sm text-slate-400">
          New seller or buyer? <Link to="/" className="text-pink-300 hover:text-pink-200">Start shopping</Link>
        </p>
      </section>
    </main>
  );
}
