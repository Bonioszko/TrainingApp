import { Link } from "react-router-dom";

import { UserContext } from "../../../context/userContext";
import { useContext, useState } from "react";
import "./navbar.css";
import LogoutButton from "../LogoutButton/LogoutButton";
export default function Navbar() {
    const { user, setUser } = useContext(UserContext);
    const { showMenu, setShowMenu } = useState(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    const closeMenuOnMobile = () => {
        if (window.innerWidth <= 1150) {
            setShowMenu(false);
        }
    };
    const handleLogout = async () => {
        // Make a request to your server's logout endpoint
        const response = await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        if (response.ok) {
            // If the logout was successful, clear the user context
            setUser(null);
            document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } else {
            // Handle any errors
            console.error("Logout failed");
        }
    };
    return (
        <nav>
            <Link to="/register" className="link register">
                register
            </Link>

            <Link to="/trainings" className="link">
                trainings
            </Link>
            <p>Welcome {user ? user.name : ""}</p>

            <Link to="/profile" className="link">
                Profile
            </Link>
            <Link to="/login" className="link login" id="login">
                login
            </Link>
            {user && (
                // <button onClick={handleLogout} className="logout">
                //     Logout
                // </button>
                <LogoutButton></LogoutButton>
            )}
        </nav>
    );
}
