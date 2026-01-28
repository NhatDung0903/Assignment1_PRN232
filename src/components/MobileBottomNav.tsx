'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around py-2">
        <Link href="/" className={`flex flex-col items-center p-2 ${pathname === '/' ? 'text-blue-600' : 'text-gray-600'}`}>
          <span className="text-lg">🏠</span>
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/products" className={`flex flex-col items-center p-2 ${pathname === '/products' ? 'text-blue-600' : 'text-gray-600'}`}>
          <span className="text-lg">🛍️</span>
          <span className="text-xs">Products</span>
        </Link>
        <Link href="/products/new" className={`flex flex-col items-center p-2 ${pathname === '/products/new' ? 'text-blue-600' : 'text-gray-600'}`}>
          <span className="text-lg">➕</span>
          <span className="text-xs">Add</span>
        </Link>
        <Link href="/admin" className={`flex flex-col items-center p-2 ${pathname === '/admin' ? 'text-blue-600' : 'text-gray-600'}`}>
          <span className="text-lg">⚙️</span>
          <span className="text-xs">Admin</span>
        </Link>
      </div>
    </nav>
  );
}