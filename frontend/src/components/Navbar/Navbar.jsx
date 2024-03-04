import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faDumbbell,
    faSignInAlt,
    faSignOutAlt,
    faPen,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../../../context/userContext";
import { useContext, useState } from "react";
import "./navbar.css";
import LogoutButton from "../LogoutButton/LogoutButton";
export default function Navbar() {
    const { user, setUser } = useContext(UserContext);

    return (
        <nav>
            <Link to="/register" className="link register">
                <FontAwesomeIcon icon={faPen} className="icon" />
                <span className="text">Register</span>
                <span className="small-text">Register</span>
            </Link>

            <Link to="/trainings" className="link">
                <FontAwesomeIcon icon={faDumbbell} className="icon" />
                <span className="text">Trainings</span>
                <span className="small-text">Trainings</span>
            </Link>
            {user ? <h1 className="text">Welcome {user.name}</h1> : ""}
            <Link to="/profile" className="link">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <span className="text">Profile</span>
                <span className="small-text">Profile</span>
            </Link>

            <Link to="/login" className="link login" id="login">
                <FontAwesomeIcon icon={faUserPlus} className="icon" />
                <span className="text">Login</span>
                <span className="small-text">Login</span>
            </Link>

            {user && (
                <LogoutButton
                    text={
                        <>
                            <FontAwesomeIcon
                                icon={faSignInAlt}
                                className="icon"
                            />
                            <span className="text">Logout</span>
                            <span className="small-text">Logout</span>
                        </>
                    }
                >
                    <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
                </LogoutButton>
            )}
        </nav>
    );
}
