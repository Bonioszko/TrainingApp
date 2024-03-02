import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import { useContext } from "react";
import { UserContext } from "../context/userContext.jsx";
function App() {
    const { user, setUser } = useContext(UserContext);
    return (
        <div className="main">
            <Navbar></Navbar>
            <div className="page">
                {!user ? (
                    <h1>Welcome to our app, to access content please login</h1>
                ) : (
                    <>
                        <h1>Welcome {user.name} </h1>
                        <h1>Get your workout done </h1>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
