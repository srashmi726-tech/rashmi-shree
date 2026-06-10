import { useState } from 'react';

import { getStoredSession } from '../services/auth';
import { createBankTransaction } from '../services/transactions';

export default function ProductCard({ product }) {
  const [status, setStatus] = useState('');

  function handleAddToCart() {
    setStatus(`Added ${product?.title || 'this item'} to your cart.`);
  }

  function handleBankPurchase() {
    const session = getStoredSession();

    if (!session?.ok) {
      setStatus('Please sign in before you make a bank purchase.');
      return;
    }

    const transaction = createBankTransaction({
      product: product?.title || 'Fashion Item',
      amount: Number(product?.price || 999),
      paymentMethod: 'Bank Transfer'
    });

    setStatus(`Bank transfer confirmed for ${product?.title || 'this item'} — ${transaction.transactionId}.`);
  }

  return (
    <article className="theme-card rounded-3xl p-4 shadow-lg shadow-black/20">
      <div className="h-36 rounded-2xl bg-gradient-to-br from-pink-500/20 via-slate-900 to-slate-800" />
      <h3 className="mt-4 text-xl font-semibold text-white">{product?.title || 'Featured Fashion Item'}</h3>
      <p className="mt-2 text-sm text-slate-300">{product?.description || 'This card is ready for product catalog integration.'}</p>
      <div className="mt-4 flex items-center justify-between text-sm text-pink-100">
        <span>₹{product?.price || '999'}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={handleAddToCart} className="rounded-full bg-slate-800 px-3 py-2 text-white hover:bg-slate-700">Add to cart</button>
        <button type="button" onClick={handleBankPurchase} className="rounded-full bg-pink-500 px-3 py-2 text-white hover:bg-pink-400">Buy with bank</button>
      </div>
      {status ? <p className="mt-3 rounded-2xl border border-pink-500/30 bg-pink-500/10 px-3 py-2 text-xs text-pink-100">{status}</p> : null}
    </article>
  );
}
