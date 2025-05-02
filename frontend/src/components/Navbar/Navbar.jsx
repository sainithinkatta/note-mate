import { useState, useEffect } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function Navbar({ userInfo, onSearchNote }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [theme, setTheme] = useState("light");
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
        <header className="bg-white dark:bg-gray-800 shadow-md">
            <div className="flex items-center justify-between px-6 py-3">
                <h2 className="text-xl font-medium text-black dark:text-white">
                    NoteMate
                </h2>
                <div className="flex items-center gap-4">
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
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full border border-gray-300 dark:border-gray-600 text-black dark:text-white"
                        aria-label="Toggle Dark Mode"
                    >
                        {theme === "light" ? <MdDarkMode size={18} /> : <MdLightMode size={18} />}
                    </button>
                </div>
                <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
            </div>
        </header>
    );
}

export default Navbar;