import { UserContext } from "../../../context/userContext.jsx";
import { useContext } from "react";
export default function LogoutButton() {
    const { user, setUser } = useContext(UserContext);
    const handleLogout = async () => {
        // Make a request to your server's logout endpoint
        const response = await fetch(
            import.meta.env.VITE_REACT_APP_URL_API + "/auth/logout",
            {
                method: "POST",
                credentials: "include",
            }
        );

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
        <button onClick={handleLogout} className="logout">
            Logout
        </button>
    );
}
