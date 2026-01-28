'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DeleteConfirmModal from '../../../components/DeleteConfirmModal';
import { useRouter, useParams } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const prod = await getProduct(id);
      if (!prod) {
        notFound();
      }
      setProduct(prod);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return notFound();

  return <ProductDetailContent product={product} />;
}

function ProductDetailContent({ product }: { product: Product }) {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(product.image || '');
  const FALLBACK_IMG = 'https://via.placeholder.com/600x400?text=No+Image';

  const handleDelete = () => {
    router.push('/');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            {product.image ? (
              <img
                src={imgSrc}
                alt={product.name}
                className="w-full h-96 md:h-full object-cover"
                referrerPolicy="no-referrer"
                onError={() => setImgSrc(FALLBACK_IMG)}
              />
            ) : (
              <div className="w-full h-96 md:h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-lg">No Image</span>
              </div>
            )}
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
            <div className="text-3xl font-bold text-blue-600 mb-8">${product.price.toFixed(2)}</div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/products/${product.id}/edit`}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Edit Product
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        productId={product.id}
        productName={product.name}
        onDelete={handleDelete}
      />
    </div>
  );
}