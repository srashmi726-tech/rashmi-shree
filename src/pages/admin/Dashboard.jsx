export default function AdminDashboard() {
  return (
    <main className="min-h-screen p-6 text-white">
      <section className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-black/30">
        <p className="text-amber-400 uppercase tracking-[0.35em] text-sm">Admin panel</p>
        <h1 className="mt-3 text-3xl font-semibold">Users, sellers, products, reports, and notifications</h1>
        <p className="mt-3 text-slate-300">The admin workspace is ready for moderation, analytics, and operational oversight.</p>
      </section>
    </main>
  );
}
