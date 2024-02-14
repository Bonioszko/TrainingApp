import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext.jsx";
import { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import LogoutButton from "../../components/LogoutButton/LogoutButton.jsx";
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
            const response = await fetch(
                import.meta.env.VITE_REACT_APP_URL_API + "/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ email, password }),
                }
            );
            const responseData = await response.json();
            console.log(responseData);
            if (responseData.error) {
                toast.error(responseData.error);
            } else {
                toast.success("You are logged as: " + responseData.name);
                setTimeout(() => {
                    navigate("/profile");
                    setUser();
                }, 1000);
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="main">
            <Navbar></Navbar>

            <div className="page">
                {!user ? (
                    <form onSubmit={handleSubmit}>
                        <h2>LOGIN</h2>

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
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <button type="submit"> submit</button>
                    </form>
                ) : (
                    <div>
                        {" "}
                        <h1>You are already logged in</h1>
                        <LogoutButton></LogoutButton>
                    </div>
                )}
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
}
