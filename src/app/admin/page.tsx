'use client';

import { useEffect, useMemo, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface Stats {
  totalProducts: number;
  totalValue: number;
  avgPrice: number;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<Stats>({ totalProducts: 0, totalValue: 0, avgPrice: 0 });
  const [loading, setLoading] = useState(true);

  // dùng memo cho endpoint list admin (lấy nhiều)
  const listUrl = useMemo(() => '/api/products?pageSize=1000', []);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recalcStats = (items: Product[]) => {
    const totalProducts = items.length;
    const totalValue = items.reduce((sum, p) => sum + Number(p.price), 0);
    const avgPrice = totalProducts > 0 ? totalValue / totalProducts : 0;
    setStats({ totalProducts, totalValue, avgPrice });
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      // cache: no-store để tránh danh sách bị cũ khi vừa CRUD
      const res = await fetch(listUrl, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
      const data = await res.json();

      // API của bạn trả data.data, meta.total
      const items: Product[] = Array.isArray(data?.data) ? data.data : [];
      setProducts(items);
      recalcStats(items);
    } catch (error) {
      console.error('Fetch products error:', error);
      alert(error instanceof Error ? error.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });

      // ✅ Delete OK (REST chuẩn)
      if (res.status === 204) {
        setProducts((prev) => {
          const remaining = prev.filter((p) => p.id !== id);
          // cập nhật stats dựa trên state mới
          recalcStats(remaining);
          return remaining;
        });
        return;
      }

      // ✅ Product không còn tồn tại => UI đang stale => refresh list
      if (res.status === 404) {
        await loadProducts();
        alert('Product was already deleted. List refreshed.');
        return;
      }

      // ❗ lỗi khác: đọc message chi tiết
      let errorMessage = `Failed to delete product (${res.status})`;
      try {
        const errorData = await res.json();
        errorMessage = errorData?.message || errorData?.error || errorMessage;
      } catch {
        const text = await res.text();
        if (text) errorMessage = `${errorMessage}: ${text}`;
      }

      console.error(`Delete failed: ${errorMessage}`);
      alert(errorMessage);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred';
      console.error('Delete error:', error);
      alert(message);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <a
          href="/products/new"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
        >
          <span className="text-xl">+</span>
          <span>Add Product</span>
        </a>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">📦 Total Products</h3>
              <p className="text-4xl font-bold">{stats.totalProducts}</p>
            </div>
            <div className="text-6xl opacity-20">📦</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">💰 Total Value</h3>
              <p className="text-4xl font-bold">${stats.totalValue.toFixed(2)}</p>
            </div>
            <div className="text-6xl opacity-20">💰</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">📊 Average Price</h3>
              <p className="text-4xl font-bold">${stats.avgPrice.toFixed(2)}</p>
            </div>
            <div className="text-6xl opacity-20">📊</div>
          </div>
        </div>
      </div>

      {/* Admin Table */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                    ${Number(product.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button className="text-indigo-600 hover:text-indigo-900 font-semibold transition-colors duration-200 hover:bg-indigo-50 px-3 py-1 rounded">
                        View
                      </button>
                      <button className="text-amber-600 hover:text-amber-900 font-semibold transition-colors duration-200 hover:bg-amber-50 px-3 py-1 rounded">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900 font-semibold transition-colors duration-200 hover:bg-red-50 px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
