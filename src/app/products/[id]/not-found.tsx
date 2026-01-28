import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
      <p className="mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Back to Home
      </Link>
    </div>
  );
}