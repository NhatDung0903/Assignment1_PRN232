'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DeleteConfirmModal from '../../../components/DeleteConfirmModal';
import { useRouter, useParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`/api/products/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
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
  const { user } = useAuth();
  const { addItem } = useCart();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(product.image || '');
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const FALLBACK_IMG = 'https://via.placeholder.com/600x400?text=No+Image';

  const handleDelete = () => {
    router.push('/');
  };

  const handleAddToCart = () => {
    if (!user) {
      if (confirm('You need to login to add products to cart. Go to login page?')) {
        router.push('/login');
      }
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image || null,
    }, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
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
            <div className="text-3xl font-bold text-green-600 mb-6">${product.price.toFixed(2)}</div>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  -
                </button>
                <span className="w-16 text-center font-semibold text-xl">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4">
              <button
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  addedToCart
                    ? 'bg-green-500 text-white cursor-default'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                }`}
              >
                {addedToCart ? '✓ Added to Cart!' : '🛒 Add to Cart'}
              </button>

              {user && (
                <div className="flex gap-3">
                  <Link
                    href={`/products/${product.id}/edit`}
                    className="flex-1 bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-all duration-300 text-center shadow-lg hover:shadow-xl"
                  >
                    Edit Product
                  </Link>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Delete Product
                  </button>
                </div>
              )}

              <Link
                href="/products"
                className="text-center text-indigo-600 hover:text-indigo-700 font-semibold py-2"
              >
                ← Back to Products
              </Link>
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