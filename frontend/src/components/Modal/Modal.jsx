function Modal({ 
    isOpen, 
    onClose, 
    children 
    }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-2">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 pt-12 rounded-lg shadow-lg relative mx-2 sm:mx-0">
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