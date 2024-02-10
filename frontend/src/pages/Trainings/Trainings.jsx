import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext.jsx";
import { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import TrainingTemplate from "../../components/TrainingsTemplates/TrainingTemplate.jsx";
export default function Trainings() {
    const { user, setUser } = useContext(UserContext);
    return (
        <div className="main">
            <Navbar></Navbar>
            <div className="page">
                <TrainingTemplate></TrainingTemplate>
            </div>
        </div>
    );
}
