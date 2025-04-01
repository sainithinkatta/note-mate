import { useEffect, useState } from 'react';

function ToastMessage({ 
    toastMessage, 
    onClose 
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (toastMessage) {
            setVisible(true);
        }
    }, [toastMessage, onClose]);

    if (!visible) return null;

    return (
        <div className="flex items-center justify-between p-2 border border-green-500 rounded-md max-w-md mx-auto mt-5">
            <p className="text-green-500 text-xs">
                {toastMessage}
            </p>
            <button
                className="text-red-500 text-sm ml-4"
                onClick={() => {
                    setVisible(false);
                    onClose?.();
                }}
            >
                X
            </button>
        </div>
    );
}

export default ToastMessage;