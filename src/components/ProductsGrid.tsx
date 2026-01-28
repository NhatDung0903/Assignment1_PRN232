'use client';

import { useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import ProductFilters, { ProductFilterState } from './ProductFilters';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface ProductsGridProps {
  initialProducts?: Product[];
  showFilters?: boolean;
}

export default function ProductsGrid({ initialProducts = [], showFilters = true }: ProductsGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(!initialProducts.length);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState<ProductFilterState>({
    search: '',
    minPrice: '',
    maxPrice: '',
    sort: 'newest',
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search: filters.search,
        sort: filters.sort,
        page: page.toString(),
        pageSize: '8',
      });
      if (filters.minPrice) params.set('minPrice', filters.minPrice);
      if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);

      const res = await fetch(`/api/products?${params}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data.data);
      setTotalPages(data.meta.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    if (showFilters) {
      fetchProducts();
    }
  }, [fetchProducts, showFilters]);

  const handleFiltersChange = (newFilters: ProductFilterState) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div>
      {showFilters && (
        <ProductFilters filters={filters} onFiltersChange={handleFiltersChange} />
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} onDelete={handleDelete} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          )}

          {showFilters && totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
              >
                ← Previous
              </button>
              <span className="text-lg font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}