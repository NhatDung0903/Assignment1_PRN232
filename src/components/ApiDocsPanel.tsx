'use client';

import { useState } from 'react';

export default function ApiDocsPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 z-40"
        title="API Docs"
      >
        📚
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">API Documentation</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">GET /api/products</h3>
                <p>List all products with optional filters: ?search=...&minPrice=...&maxPrice=...&sort=...&page=...&pageSize=...</p>
              </div>
              <div>
                <h3 className="font-semibold">GET /api/products/:id</h3>
                <p>Get single product by ID</p>
              </div>
              <div>
                <h3 className="font-semibold">POST /api/products</h3>
                <p>Create new product</p>
              </div>
              <div>
                <h3 className="font-semibold">PUT /api/products/:id</h3>
                <p>Update product by ID</p>
              </div>
              <div>
                <h3 className="font-semibold">DELETE /api/products/:id</h3>
                <p>Delete product by ID</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}