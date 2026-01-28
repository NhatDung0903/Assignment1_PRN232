import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl border-b border-white/20">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-extrabold flex items-center hover:scale-105 transition-transform duration-300">
          <span className="mr-3 text-4xl">🛒</span> CND Shop
        </Link>
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-lg font-medium hover:text-yellow-300 transition-colors duration-300 relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/products" className="text-lg font-medium hover:text-yellow-300 transition-colors duration-300 relative group">
            Products
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/admin" className="text-lg font-medium hover:text-yellow-300 transition-colors duration-300 relative group">
            Admin
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
        <Link href="/products/new" className="bg-yellow-400 text-indigo-900 px-6 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
          Add Product
        </Link>
      </div>
    </nav>
  );
}