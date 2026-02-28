'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl border-b border-white/20">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-extrabold flex items-center hover:scale-105 transition-transform duration-300">
          <span className="mr-3 text-4xl">🛒</span> CND Shop
        </Link>
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="text-lg font-medium hover:text-yellow-300 transition-colors duration-300 relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/products" className="text-lg font-medium hover:text-yellow-300 transition-colors duration-300 relative group">
            Products
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          {user && (
            <>
              <Link href="/orders" className="text-lg font-medium hover:text-yellow-300 transition-colors duration-300 relative group">
                Orders
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/admin" className="text-lg font-medium hover:text-yellow-300 transition-colors duration-300 relative group">
                Admin
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
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
            className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium hidden lg:block">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/login"
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold transition-all duration-300"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-yellow-400 text-indigo-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-all duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}