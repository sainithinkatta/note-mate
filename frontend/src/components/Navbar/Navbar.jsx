import { useState, useEffect } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaBars } from "react-icons/fa";

function Navbar({ userInfo, onSearchNote }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [theme, setTheme] = useState("light");
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    function onLogout() {
        localStorage.clear();
        navigate("/");
    }

    function handleSearch() {
        if (searchQuery) {
            onSearchNote(searchQuery);
        }
    }

    function onClearSearch() {
        setSearchQuery("");
    }

    const onSearch = debounce((value) => {
        setSearchQuery(value);
    }, 300);

    function toggleTheme() {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md px-4 py-2 flex items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center flex-shrink-0">
                <h2 className="text-lg font-semibold text-black dark:text-white">NoteMate</h2>
            </div>

            {/* Center: Search */}
            <div className="mx-3 flex-grow flex justify-center">
                <div className="w-40 sm:w-64 md:w-80 mr-3">
                    {userInfo && (
                        <SearchBar
                            value={searchQuery}
                            onChange={({ target }) => {
                                setSearchQuery(target.value);
                                onSearch(target.value);
                            }}
                            handleSearch={handleSearch}
                            onClearSearch={onClearSearch}
                        />
                    )}
                </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3 flex-shrink-0">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full border border-gray-300 dark:border-gray-600 text-black dark:text-white flex-shrink-0"
                    aria-label="Toggle Dark Mode"
                >
                    {theme === "light" ? <MdDarkMode size={18} /> : <MdLightMode size={18} />}
                </button>

                <button
                    className="p-2 sm:hidden flex-shrink-0"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menu"
                >
                    <FaBars size={20} className="text-black dark:text-white" />
                </button>
            </div>
        </header>
    );
}

export default Navbar;