'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import ProductsGrid from '../../components/ProductsGrid';

export default function ProductsPage() {
  const { user } = useAuth();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Products</h1>
        {user && (
          <Link
            href="/products/new"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
          >
            <span className="text-xl">+</span>
            <span>Add Product</span>
          </Link>
        )}
      </div>
      <ProductsGrid />
    </div>
  );
}