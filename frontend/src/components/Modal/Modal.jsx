function Modal({ 
  isOpen, 
  onClose, 
  children 
}) {
  if (!isOpen) return null;

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg relative">
              <button
                  className="absolute top-6 right-7 text-gray-500 hover:text-red-600 transition-colors duration-200"
                  onClick={onClose}
              >
                  <span className="text-5xl">&times;</span>
              </button>
              {children}
          </div>
      </div>
  );
}

export default Modal;