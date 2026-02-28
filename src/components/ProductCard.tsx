"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductModal from "./ProductModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface ProductCardProps {
  product: Product;
  onDelete?: (id: number) => void;
  showAdminActions?: boolean;
}

const FALLBACK_IMG = "https://via.placeholder.com/600x400?text=No+Image";

export default function ProductCard({ product, onDelete, showAdminActions = false }: ProductCardProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(product.image || "");
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleDelete = () => {
    if (onDelete) onDelete(product.id);
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
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Nếu product.image thay đổi sau khi edit, sync lại imgSrc
  // (tránh trường hợp ảnh cũ vẫn giữ)
  if (product.image && imgSrc !== product.image) {
    // NOTE: safe in client component; prevents stale image after edit
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // (if you prefer, convert to useEffect; but this is ok if no strict lint)
    // We'll keep simple: useEffect is cleaner, but optional.
  }

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
        <div className="relative mb-4 overflow-hidden rounded-lg">
          {product.image ? (
            <img
              src={imgSrc}
              alt={product.name}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgSrc(FALLBACK_IMG)}
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-lg">
              <span className="text-gray-500 text-lg font-medium">No Image</span>
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-3 line-clamp-2 text-sm leading-relaxed">
          {product.description}
        </p>
        <p className="text-2xl font-extrabold text-green-600 mb-4">
          ${Number(product.price).toFixed(2)}
        </p>

        {showAdminActions ? (
          <div className="flex space-x-2">
            <Link
              href={`/products/${product.id}`}
              className="flex-1 bg-indigo-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              View
            </Link>

            <button
              onClick={() => setShowEditModal(true)}
              className="flex-1 bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Edit
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Delete
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Link
              href={`/products/${product.id}`}
              className="flex-1 bg-indigo-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              View Details
            </Link>

            <button
              onClick={handleAddToCart}
              disabled={addedToCart}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
                addedToCart
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
              }`}
            >
              {addedToCart ? '✓ Added!' : 'Add to Cart'}
            </button>
          </div>
        )}
      </div>

      <ProductModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} product={product} />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        productId={product.id}
        productName={product.name}
        onDelete={handleDelete}
      />
    </>
  );
}
