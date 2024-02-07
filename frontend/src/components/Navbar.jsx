import { Link } from "react-router-dom";

import { UserContext } from "../../context/userContext";
import { useContext } from "react";
export default function Navbar() {
    const { user, setUser } = useContext(UserContext);
    const handleLogout = async () => {
        // Make a request to your server's logout endpoint
        const response = await fetch("http://localhost:8000/logout", {
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
            <Link to="/register">register</Link>
            <Link to="/login">login</Link>
            <p>Welcome {user ? user.name : ""}</p>
            <Link to="/">home</Link>
            {user && <button onClick={handleLogout}>Logout</button>}
        </nav>
    );
}
