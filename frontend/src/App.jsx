import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import { useContext } from "react";
import { UserContext } from "../context/userContext.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
function App() {
    const { user, setUser } = useContext(UserContext);
    return <HomePage></HomePage>;
}

export default App;
