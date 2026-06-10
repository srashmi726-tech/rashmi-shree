import MainLayout from '../../layouts/MainLayout';
import ProductCard from '../../components/ProductCard';

const sampleProducts = [
  { title: 'Aurora Dress', description: 'Party-ready drape', price: '1499' },
  { title: 'Studio Jacket', description: 'Layered streetwear', price: '2199' },
  { title: 'Luna Bag', description: 'Premium accessory', price: '1799' }
];

export default function Shop() {
  return (
    <MainLayout>
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/30">
        <h1 className="text-3xl font-semibold text-white">Buyer catalog</h1>
        <p className="mt-2 text-slate-300">This placeholder page maps to the product catalog and buyer shopping experience.</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sampleProducts.map((product) => (
            <ProductCard key={product.title} product={product} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
