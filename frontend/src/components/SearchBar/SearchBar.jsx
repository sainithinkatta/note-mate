import { FaMagnifyingGlass } from "react-icons/fa6";

function SearchBar({ 
    value, 
    onChange, 
    handleSearch, 
    onClearSearch 
}) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="w-full max-w-[160px] sm:max-w-xs md:max-w-sm flex items-center px-4 bg-slate-100 dark:bg-gray-700 rounded-md">
            <input
                type="text"
                placeholder="Search Notes"
                className="w-full text-xs bg-transparent py-[11px] outline-none text-slate-800 dark:text-gray-100"
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
            />
            <FaMagnifyingGlass
                className="text-slate-400 dark:text-gray-300 cursor-pointer hover:text-black"
                onClick={handleSearch}
            />
        </div>
    );
}

export default SearchBar;