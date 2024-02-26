import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!user) {
            fetch(import.meta.env.VITE_REACT_APP_URL_API + "auth/profile", {
                credentials: "include", // Include this line
            })
                .then((response) => response.json())
                .then((data) => setUser(data));
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
