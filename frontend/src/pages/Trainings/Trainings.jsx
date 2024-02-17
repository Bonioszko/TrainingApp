import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext.jsx";
import { useContext } from "react";
import UserTrainigInstances from "../../components/UserTrainingInstances/UserTrainingInstances.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import TrainingTemplate from "../../components/TrainingsTemplates/TrainingTemplate.jsx";
import Calendar from "../../components/Calendar/Calendar.jsx";
import "./training.css";
export default function Trainings() {
    const { user, setUser } = useContext(UserContext);
    const [refresh, setRefresh] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    };
    return (
        <div className="main">
            <Navbar></Navbar>
            {user ? (
                <div className="page-trainings">
                    <div className="left">
                        <TrainingTemplate
                            refresh={refresh}
                            setRefresh={setRefresh}
                        ></TrainingTemplate>
                    </div>

                    <div className="trainings right">
                        {/* <Calendar
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        ></Calendar> */}
                        <input
                            className="date-training"
                            type="date"
                            onChange={(event) => {
                                const [year, month, day] =
                                    event.target.value.split("-");
                                setSelectedDate(new Date(year, month - 1, day));
                            }}
                        />
                        <UserTrainigInstances
                            refresh={refresh}
                            setRefresh={setRefresh}
                            selectedDate={selectedDate}
                        ></UserTrainigInstances>
                    </div>
                </div>
            ) : (
                <div className="page">
                    <h1>You must be logged in to access trainings</h1>{" "}
                </div>
            )}
        </div>
    );
}
//make there a refresh context to refresg bot list on update (change refresh property)
