import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link } from "react-router-dom";
import { useState } from "react";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSignUp(e) {
        e.preventDefault();
        if (!name) {
            setError("Please enter a name");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
        if (!password) {
            setError("Please enter the password");
            return;
        }
        setError("");
        try {
            const response = await axiosInstance.post("/create-account", {
                fullName: name,
                email,
                password
            });
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    }

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white dark:bg-gray-800 px-7 py-10">
                    <form onSubmit={handleSignUp}>
                        <h4 className="text-2xl mb-7 text-gray-800 dark:text-gray-100">Sign Up</h4>
                        <input
                            type="text"
                            placeholder="Name"
                            className="input-box"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            className="input-box"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
                        <button type="submit" className="btn-primary">
                            Sign Up
                        </button>
                        <p className="text-sm text-center mt-4">
                            Already have an account?{" "}
                            <Link to="/" className="font-medium text-primary underline">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;