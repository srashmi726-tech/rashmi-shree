import MainLayout from '../../layouts/MainLayout';
import { getBankTransactions } from '../../services/transactions';

export default function Orders() {
  const transactions = getBankTransactions();

  return (
    <MainLayout>
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/30">
        <h1 className="text-3xl font-semibold text-white">Orders & banking transactions</h1>
        <p className="mt-2 text-slate-300">This page now shows real purchase records created through the bank payment flow.</p>

        <div className="mt-6 space-y-3">
          {transactions.length === 0 ? (
            <article className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4 text-slate-300">No bank transactions yet. Use the Buy with bank button on the product cards to create one.</article>
          ) : (
            transactions.map((entry) => (
              <article key={entry.id} className="rounded-3xl border border-pink-500/20 bg-slate-950/80 p-4 shadow-lg shadow-black/20">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-lg font-semibold text-white">{entry.product}</p>
                    <p className="text-sm text-slate-300">{entry.paymentMethod} · {new Date(entry.createdAt).toLocaleString()}</p>
                  </div>
                  <span className="rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-sm text-pink-100">₹{entry.amount}</span>
                </div>
                <p className="mt-2 text-sm text-slate-200">Status: {entry.status} · ID: {entry.id}</p>
              </article>
            ))
          )}
        </div>
      </section>
    </MainLayout>
  );
}
