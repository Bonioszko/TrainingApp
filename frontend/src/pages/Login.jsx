import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import Navbar from "../components/Navbar.jsx";
export default function Login() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });
            const responseData = await response.json();
            console.log(responseData);
            if (responseData.error) {
                toast.error(responseData.error);
            } else {
                toast.success(responseData.message);
                navigate("/");
                setUser();
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <Navbar></Navbar>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">email</label>
                <input
                    type="email"
                    placeholder="enter email"
                    value={data.email}
                    onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                    }
                />
                <label htmlFor="">password</label>
                <input
                    type="password"
                    placeholder="enter password"
                    value={data.password}
                    onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                    }
                />
                <button type="submit"> submit</button>
            </form>
            <ToastContainer />
        </div>
    );
}
