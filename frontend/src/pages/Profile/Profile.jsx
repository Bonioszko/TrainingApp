import Navbar from "../../components/Navbar/Navbar";
import { UserContext } from "../../../context/userContext.jsx";
import { useContext, useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown/Dropdown.jsx";
import ButtonPlus from "../../components/ButtonPlus/ButtonPlus.jsx";
import AddExercise from "../../components/AddExercise/AddExercise.jsx";
import DeleteButton from "../../components/DeleteButton/DeleteButton.jsx";
import AddTrainingBasedOnTemplate from "../../components/AddTrainingBasedOnTemplate/AddTrainingBasedOnTemplate.jsx";
import Popup from "../../components/Popup/Popup.jsx";
import AddTrainingTemplate from "../../components/AddTrainingTemplate.jsx/AddTrainngTemplate.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import "./profile.css";
export default function Profile() {
    const { user, setUser } = useContext(UserContext);
    const [userExercises, setUserExercises] = useState([]);
    const [userTrainingTemplate, setUserTrainingTemplate] = useState([]);
    const [exercisePopup, setExercisePopup] = useState(false);
    const [trainingPopup, setTrainingPopup] = useState(false);
    const [currentTraining, setCurrentTraining] = useState({});
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchExercises = async () => {
            const response = await fetch(`/api/exercise/${user.email}`);
            const data = await response.json();

            if (response.ok) {
                setUserExercises(data.exercises_list);
            } else {
                console.error(data.error);
            }
        };

        if (user) {
            fetchExercises();
        } else {
            setUserExercises([]);
        }
    }, [user, exercisePopup, refresh]);
    //not optimal one render when poping up a window
    useEffect(() => {
        const fetchTrainingTemplates = async () => {
            const response = await fetch(`/api/training/${user.email}`);
            const data = await response.json();

            if (response.ok) {
                setUserTrainingTemplate(data.trainingTemplates_list);
            } else {
                console.error(data.error);
            }
        };
        if (user) {
            fetchTrainingTemplates();
        } else {
            setUserTrainingTemplate([]);
        }
    }, [user, trainingPopup, refresh]);
    // const handleSubmit = async (e) => {};
    const handleDelete = async (exerciseName) => {
        const response = await fetch(`/api/exercise`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                exerciseName: exerciseName,
                email: user.email,
            }),
        });

        if (response.ok) {
            toast.success("Exercise Deleted");
            setRefresh((prevRefresh) => !prevRefresh);
        } else {
            console.error("Failed to delete exercise");
        }
    };
    const handleDeleteTemplate = async (templateName) => {
        const response = await fetch(`/api/training`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: templateName,
                email: user.email,
            }),
        });
        if (response.ok) {
            setRefresh((prevRefresh) => !prevRefresh);
            toast.success("Template deleted");
        } else {
            console.error("Failed to delete template");
        }
    };
    return (
        <div className="main">
            <Navbar></Navbar>
            {user ? (
                <div className="page-profile">
                    <div className="top">
                        <h1>welcome {user.name}</h1>
                    </div>
                    <div className="bottom">
                        {" "}
                        <div className="left-profile">
                            <h1>Exercises</h1>
                            {userExercises.length > 0 ? (
                                userExercises.map((exercise, index) => (
                                    <div key={index} className="exercise-list">
                                        <h1>{exercise.name}</h1>
                                        {exercise.creator ? (
                                            <DeleteButton
                                                onClick={() =>
                                                    handleDelete(exercise.name)
                                                }
                                            ></DeleteButton>
                                        ) : null}
                                    </div>
                                ))
                            ) : (
                                <p>No exercises found</p>
                            )}
                            <div
                                className="plus"
                                onClick={() => setExercisePopup(true)}
                            >
                                Add Exercise
                            </div>

                            <AddExercise
                                trigger={exercisePopup}
                                setTrigger={setExercisePopup}
                            ></AddExercise>
                        </div>
                        <div className="right-profile">
                            <h1>Training templates</h1>
                            {userTrainingTemplate.length > 0 ? (
                                userTrainingTemplate.map((training, index) => (
                                    <div
                                        key={index}
                                        className="trainig-template-instance"
                                    >
                                        <h1>{training.name}</h1>
                                        <DeleteButton
                                            onClick={() =>
                                                handleDeleteTemplate(
                                                    training.name
                                                )
                                            }
                                        ></DeleteButton>
                                    </div>
                                ))
                            ) : (
                                <p>No training templates found</p>
                            )}
                            <div
                                className="plus"
                                onClick={() => {
                                    setTrainingPopup(true);
                                }}
                            >
                                Add Template
                            </div>
                            <AddTrainingTemplate
                                trigger={trainingPopup}
                                setTrigger={setTrainingPopup}
                                userExercises={userExercises}
                            ></AddTrainingTemplate>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="page">
                    <h1>You must be logged in to access Profile</h1>
                </div>
            )}
        </div>
    );
}
//if user is not logeed in do nto display it
