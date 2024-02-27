import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!user) {
            console.log();
            fetch("/api/auth/profile", {
                credentials: "include", // Include this line
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setUser(data);
                });
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
