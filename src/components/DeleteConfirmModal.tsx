'use client';

import { useToast } from './Toast';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  productName: string;
  onDelete: () => void;
}

export default function DeleteConfirmModal({ isOpen, onClose, productId, productName, onDelete }: DeleteConfirmModalProps) {
  const { addToast } = useToast();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      if (!res.ok) {
        // Try to read response body for detailed error
        let errorMessage = `Failed to delete product (${res.status})`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          // If response is not JSON, use status text
          errorMessage = res.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      addToast('Product deleted successfully!', 'success');
      onDelete();
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      addToast(message, 'error');
      console.error('Delete error:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md mx-auto shadow-2xl border border-gray-200">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Delete Product</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Are you sure you want to delete <span className="font-semibold text-gray-900">&#34;{productName}&#34;</span>?
            This action cannot be undone and the product will be permanently removed.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}