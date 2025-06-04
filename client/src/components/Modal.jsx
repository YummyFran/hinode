'use client';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ isOpen, onClose, title, children, className, titleEditable, isEditting, setIsEditting, details, setDetails, handleSave }) {
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
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg w-full max-w-xl p-6 relative max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-accent text-2xl font-bold cursor-pointer"
        >
          &times;
        </button>
        {
          titleEditable ? (
            isEditting ? 
                <input className="text-xl font-semibold mb-4 w-full" type="text" value={details.title} onChange={e => setDetails(prev => ({...prev, title: e.target.value}))} onBlur={() => handleSave(prev => ({...prev, title: false}))} autoFocus/>
            :
                <h2 className="text-xl font-semibold mb-4 wrap-break-word" onClick={() => setIsEditting(prev => ({...prev, title: true}))}>{title}</h2>
          ) : 
          <h2 className="text-xl font-semibold mb-4 wrap-break-word">{title}</h2>
        }
        <div className={`text-sm text-gray-700 dark:text-gray-300 ${className} overflow-auto`}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
