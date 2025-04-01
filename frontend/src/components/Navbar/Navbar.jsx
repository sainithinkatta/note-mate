import { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import { debounce } from 'lodash';

function Navbar({ userInfo, onSearchNote }) {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    function onLogout() {
        localStorage.clear();
        navigate("/");
    }

    function handleSearch() {
        if (searchQuery) {
            onSearchNote(searchQuery)
        }
    }

    function onClearSearch() {
        setSearchQuery("");
    }

    const onSearch = debounce((value) => {
        setSearchQuery(value);
    }, 300);

    return (
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
            <h2 className="text-xl font-medium text-black py-2">NoteMate</h2>

            {
                userInfo ? (
                    <SearchBar
                        value={searchQuery}
                        onChange={({ target }) => {
                            setSearchQuery(target.value);
                            onSearch(target.value);
                        }}
                        handleSearch={handleSearch}
                        onClearSearch={onClearSearch}
                    />
                ) : null
            }

            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
    );
}

export default Navbar;