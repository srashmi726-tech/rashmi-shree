import MainLayout from '../../layouts/MainLayout';

export default function Cart() {
  return (
    <MainLayout>
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/30">
        <h1 className="text-3xl font-semibold text-white">Cart</h1>
        <p className="mt-2 text-slate-300">Cart, quantity updates, and checkout hooks will be added here.</p>
      </section>
    </MainLayout>
  );
}
