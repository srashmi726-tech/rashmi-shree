import { Link } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import { getStoredSession } from '../../services/auth';

const categoryGroups = [
  {
    title: 'Men’s Fashion',
    accent: 'From shirts and sneakers to ethnic and festive wear',
    items: ['Topwear', 'Bottomwear', 'Innerwear', 'Footwear', 'Accessories']
  },
  {
    title: 'Women’s Fashion',
    accent: 'Indian fusion wear, western edits, activewear and accessories',
    items: ['Kurtas', 'Dresses', 'Lingerie', 'Footwear', 'Jewellery']
  },
  {
    title: 'Kids',
    accent: 'Age-based apparel, footwear, toys and school essentials',
    items: ['0–2 Years', '2–8 Years', 'Boys', 'Girls', 'Footwear']
  },
  {
    title: 'Home & Living',
    accent: 'Bedding, bath, decor, kitchen and dining upgrades',
    items: ['Bedding', 'Bath Essentials', 'Home Decor', 'Kitchen & Dining']
  },
  {
    title: 'Beauty & Personal Care',
    accent: 'Makeup, skincare, haircare and fragrance collections',
    items: ['Makeup', 'Skincare', 'Haircare', 'Fragrances']
  },
  {
    title: 'Trend Zones',
    accent: 'Gen-Z looks, curated influencer edits and premium picks',
    items: ['Streetwear', 'Celebrity Curation', 'Studio Picks', 'FWD Drops']
  }
];

const profileModules = [
  { label: 'My Orders', value: '12 active and completed' },
  { label: 'Wishlist', value: '24 saved items awaiting purchase' },
  { label: 'Coupons & Promos', value: '2 active offers and referral codes' },
  { label: 'Notification Settings', value: 'Push, SMS and email alerts' },
  { label: 'Help Center', value: 'FAQs, live chat and call-back support' }
];

export default function Home() {
  const session = getStoredSession();

  return (
    <MainLayout>
      <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-black/30">
        <p className="text-sm uppercase tracking-[0.35em] text-pink-400">Fashion marketplace</p>
        <h1 className="mt-3 text-4xl font-semibold md:text-5xl">Welcome back, {session?.user?.name || 'Buyer Demo'}</h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          Browse the home view, open the shop, check orders and wishlist, then manage your account details, delivery address, and theme preferences from the right-hand panel.
          {session?.ok ? ' Your session is active and the account state is now connected to the marketplace.' : ' Sign in to unlock the full account and transaction experience.'}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {['New arrivals', 'Trending now', 'Offers', 'Express delivery'].map((chip) => (
            <span key={chip} className="rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-2 text-sm text-pink-100">{chip}</span>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {profileModules.map((item) => (
            <article key={item.label} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4 shadow-lg shadow-black/20">
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-2 text-sm text-slate-300">{item.value}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/shop" className="rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-400">Start shopping</Link>
          <Link to="/settings" className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-pink-500 hover:text-pink-100">Open account settings</Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {categoryGroups.map((group) => (
            <article key={group.title} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg shadow-black/20 transition hover:border-pink-500/80 hover:bg-slate-950">
              <p className="text-xs uppercase tracking-[0.35em] text-pink-400">{group.title}</p>
              <p className="mt-3 text-slate-200">{group.accent}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100">{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
