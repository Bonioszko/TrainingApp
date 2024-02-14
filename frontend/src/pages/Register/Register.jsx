import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
export default function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = data;

        try {
            const response = await fetch(
                import.meta.env.VITE_REACT_APP_URL_API + "/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password }),
                }
            );

            const responseData = await response.json();

            // Handle response data as needed
            console.log(responseData);
            if (responseData.error) {
                toast.error(responseData.error);
            } else {
                toast.success(responseData.message);
                navigate("/login");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <div className="main">
            <Navbar></Navbar>
            <div className="page">
                <form onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <div className="form-field">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="enter name"
                            value={data.name}
                            onChange={(e) =>
                                setData({ ...data, name: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="">email</label>
                        <input
                            type="email"
                            placeholder="enter email"
                            value={data.email}
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="">password</label>
                        <input
                            type="password"
                            placeholder="enter password"
                            value={data.password}
                            onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                            }
                        />
                    </div>
                    <button type="submit"> submit</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}
