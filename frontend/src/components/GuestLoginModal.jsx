import { useState } from "react";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";

function GuestLoginModal({ 
    onClose, 
    guestEmail, 
    guestPassword 
}) {
    const [copiedField, setCopiedField] = useState(null);

    const handleCopy = (text, fieldName) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopiedField(fieldName);
                setTimeout(() => setCopiedField(null), 2000);
            })
            .catch(() => {
                setCopiedField(null);
            });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4">Guest Login Details</h3>
                <p className="mb-4">You can use the following credentials to try out our website:</p>
                
                <div className="mb-4 flex items-center">
                    <strong className="mr-2">Email:</strong>
                    <span>{guestEmail}</span>
                    <button
                        className="ml-2 text-gray-500"
                        onClick={() => handleCopy(guestEmail, 'email')}
                        aria-label="Copy email"
                    >
                        {copiedField === 'email' ? (
                            <FaClipboardCheck className="text-green-500" />
                        ) : (
                            <FaClipboard />
                        )}
                    </button>
                </div>
                
                <div className="mb-4 flex items-center">
                    <strong className="mr-2">Password:</strong>
                    <span>{guestPassword}</span>
                    <button
                        className="ml-2 text-gray-500"
                        onClick={() => handleCopy(guestPassword, 'password')}
                        aria-label="Copy password"
                    >
                        {copiedField === 'password' ? (
                            <FaClipboardCheck className="text-green-500" />
                        ) : (
                            <FaClipboard />
                        )}
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="btn-primary w-full mt-4"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default GuestLoginModal;