'use client';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ isOpen, onClose, title, children, className }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-accent text-2xl font-bold cursor-pointer"
        >
          &times;
        </button>
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <div className={`text-sm text-gray-700 dark:text-gray-300 ${className}`}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
