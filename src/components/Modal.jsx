import React from 'react';

const Modal = ({ children, onClose }) => {
  const handleOverlayClick = (e) => {
    // If the click is outside the modal content, close the modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed top-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}  // Add the overlay click handler here
    >
      <div
        className="bg-gray-900 p-6 w-full max-w-lg h-auto overflow-auto rounded-lg"
        // Prevent click events inside the modal content from propagating to the overlay
        onClick={(e) => e.stopPropagation()}  
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-white"
        >
          &times;
        </button>
        <div className='py-4'>
        {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
