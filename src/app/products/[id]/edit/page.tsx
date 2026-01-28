'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductForm from '../../../../components/ProductForm';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export default function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(async ({ id }) => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          notFound();
        }
        const data = await res.json();
        setProduct(data);
      } catch {
        notFound();
      } finally {
        setLoading(false);
      }
    });
  }, [params]);

  const handleSubmit = async (data: { name: string; description: string; price: number; image?: string }) => {
    const { id } = await params;
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to update product');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <ProductForm initialData={product} onSubmit={handleSubmit} />
    </div>
  );
}