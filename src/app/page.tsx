'use client';

import ProductsGrid from '../components/ProductsGrid';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl p-12 mb-8 text-center shadow-2xl">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Welcome to CND Shop</h1>
        <p className="text-xl mb-8 drop-shadow-md max-w-2xl mx-auto">Discover the latest fashion trends and shop your favorite clothing items with style and quality.</p>
        <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
          Shop Now
        </button>
      </div>

      {/* Featured Products */}
      <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
      <ProductsGrid />
    </div>
  );
}
