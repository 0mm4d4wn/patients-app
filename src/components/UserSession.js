import React, { useContext } from 'react';
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

const UserSession = () => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="flex items-center">
            {user ? (
                <>
                    <span className="mr-4">Welcome, {user.username}!</span>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </>
            ) : (
                <span>Please log in.</span>
            )}
        </div>
    );
};

export default UserSession;
