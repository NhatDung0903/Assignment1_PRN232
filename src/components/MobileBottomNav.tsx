'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="flex justify-around py-2">
        <Link href="/" className={`flex flex-col items-center p-2 ${pathname === '/' ? 'text-indigo-600' : 'text-gray-600'}`}>
          <span className="text-lg">🏠</span>
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/products" className={`flex flex-col items-center p-2 ${pathname === '/products' ? 'text-indigo-600' : 'text-gray-600'}`}>
          <span className="text-lg">🛍️</span>
          <span className="text-xs">Products</span>
        </Link>
        <button
          onClick={() => {
            if (!user) {
              if (confirm('You need to login to view cart. Go to login page?')) {
                router.push('/login');
              }
            } else {
              router.push('/cart');
            }
          }}
          className={`flex flex-col items-center p-2 relative ${pathname === '/cart' ? 'text-indigo-600' : 'text-gray-600'}`}
        >
          <span className="text-lg">🛒</span>
          <span className="text-xs">Cart</span>
          {getTotalItems() > 0 && (
            <span className="absolute top-0 right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </button>
        {user ? (
          <Link href="/orders" className={`flex flex-col items-center p-2 ${pathname === '/orders' ? 'text-indigo-600' : 'text-gray-600'}`}>
            <span className="text-lg">📦</span>
            <span className="text-xs">Orders</span>
          </Link>
        ) : (
          <Link href="/login" className={`flex flex-col items-center p-2 ${pathname === '/login' ? 'text-indigo-600' : 'text-gray-600'}`}>
            <span className="text-lg">👤</span>
            <span className="text-xs">Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}