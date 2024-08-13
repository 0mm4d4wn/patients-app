import React, { useState, useContext, useEffect } from "react";
import API_URLS from '../config/apiConfig';
import useFetch from '../config/useFetch';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const { data, error, isPending } = useFetch(API_URLS.getUsers);

    useEffect(() => {
        if (isPending) {
            console.log("Loading users...");
        }

        if (error) {
            console.error("Error fetching users:", error);
        }

        if (data) {
            console.log("Fetched users:", data);
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                console.error("Data fetched is not an array:", data);
            }
        }
    }, [data, error, isPending]);

    const handleLogin = () => {
        console.log("Attempting login with:", { email, password });

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedPassword = password.trim();

        console.log("Normalized email:", normalizedEmail);
        console.log("Normalized password:", normalizedPassword);

        const user = users.find(
            user =>
                user.username.trim().toLowerCase() === normalizedEmail &&
                user.password.trim() === normalizedPassword
        );

        if (user) {
            console.log("Login successful", user);
            login(user);
            navigate('/patient-list');
        } else {
            console.error("Login failed: Invalid credentials");
        }
    };

    return (
        <div id="login" className="w-1/2">
            <div className="w-1/1 bg-gray-50 p-8 flex flex-col justify-center">
                <h2 className="text-xl font-semibold mb-6 text-center">Sign In</h2>
                <form>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="w-1/1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleLogin}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
