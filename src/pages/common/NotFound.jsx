export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 text-white">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center shadow-2xl shadow-black/30">
        <p className="text-pink-400 uppercase tracking-[0.35em] text-sm">404</p>
        <h1 className="mt-3 text-3xl font-semibold">This page is not part of the current blueprint.</h1>
        <p className="mt-3 text-slate-300">Use the main routes to explore the marketplace skeleton.</p>
      </section>
    </main>
  );
}
