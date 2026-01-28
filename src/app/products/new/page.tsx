'use client';

import ProductForm from '../../../components/ProductForm';

export default function CreateProduct() {
  const handleSubmit = async (data: { name: string; description: string; price: number; image?: string }) => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to create product');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}