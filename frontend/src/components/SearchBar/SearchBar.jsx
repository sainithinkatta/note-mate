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
        <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
            <input
                type="text"
                placeholder="Search Notes"
                className="w-full text-xs bg-transparent py-[11px] outline-none"
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
            />

            <FaMagnifyingGlass
                className="text-slate-400 cursor-pointer hover:text-black"
                onClick={handleSearch}
            />
        </div>
    );
}

export default SearchBar;