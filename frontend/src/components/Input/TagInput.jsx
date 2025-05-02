import { useState } from 'react';

function TagInput({ tags, setTags }) {
    const [inputValue, setInputValue] = useState('');

    function handleInputChange(e) {
        setInputValue(e.target.value);
    }

    function addNewtag() {
        if (inputValue.trim() !== '') {
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            addNewtag();
        }
    }

    function handleRemoveTag(tagToRemove) {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    }

    return (
        <div>
            {tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mt-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="flex items-center gap-2 text-sm text-slate-900 dark:text-gray-100 bg-slate-100 dark:bg-gray-700 px-3 py-1 rounded"
                        >
                            # {tag}
                            <button
                                onClick={() => handleRemoveTag(tag)}
                                className="text-red-600 hover:text-red-800 px-2 py-1 rounded transition-colors duration-200"
                            >
                                ✖
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-4 mt-3">
                <input
                    type="text"
                    className="text-sm bg-transparent border border-gray-300 dark:border-gray-600 px-3 py-2 rounded outline-none text-slate-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-300"
                    placeholder="Add tags"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors duration-200"
                    onClick={addNewtag}
                >
                    <span className="text-2xl">+</span>
                </button>
            </div>
        </div>
    );
}

export default TagInput;