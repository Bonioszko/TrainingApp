import Navbar from "../../components/Navbar/Navbar";
import { UserContext } from "../../../context/userContext.jsx";
import { useContext, useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown/Dropdown.jsx";
export default function Profile() {
    const { user, setUser } = useContext(UserContext);
    const [userExercises, setUserExercises] = useState([]);
    const [userTrainingTemplate, setUserTrainingTemplate] = useState([]);
    const [fetchAgain, setFetchAgain] = useState(false);
    useEffect(() => {
        const fetchExercises = async () => {
            const response = await fetch(
                `http://localhost:8000/exercise/${user.email}`
            );
            const data = await response.json();

            if (response.ok) {
                setUserExercises(data.exercises_list);
            } else {
                console.error(data.error);
            }
        };

        if (user) {
            fetchExercises();
            console.log(userExercises);
        } else {
            setUserExercises([]);
        }
    }, [user]);

    useEffect(() => {
        const fetchTrainingTemplates = async () => {
            const response = await fetch(
                `http://localhost:8000/training/${user.email}`
            );
            const data = await response.json();

            if (response.ok) {
                setUserTrainingTemplate(data.trainingTemplates_list);
            } else {
                console.error(data.error);
            }
        };
        if (user) {
            fetchTrainingTemplates();
            console.log(userTrainingTemplate);
        } else {
            setUserTrainingTemplate([]);
        }
    }, [user]);
    // const handleSubmit = async (e) => {};

    return (
        <div className="main">
            <Navbar></Navbar>
            <div className="page">
                <div>
                    {userExercises.length > 0 ? (
                        userExercises.map((exercise, index) => (
                            <div key={index}>
                                <h2>{exercise.name}</h2>
                                <p>{exercise.bodyPart}</p>
                            </div>
                        ))
                    ) : (
                        <p>No exercises found</p>
                    )}
                    <Dropdown
                        name="exercise"
                        listItems={userExercises}
                    ></Dropdown>
                </div>
                <div>
                    {userTrainingTemplate.length > 0 ? (
                        userTrainingTemplate.map((training, index) => (
                            <div key={index}>
                                <h2>{training.name}</h2>
                                {/* Add any other fields you want to display */}
                            </div>
                        ))
                    ) : (
                        <p>No training templates found</p>
                    )}
                    <Dropdown
                        name="training"
                        listItems={userTrainingTemplate}
                    ></Dropdown>
                </div>
            </div>
        </div>
    );
}
