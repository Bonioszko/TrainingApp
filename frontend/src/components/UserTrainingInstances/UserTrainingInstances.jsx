import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext.jsx";
import ExerciseInstanceInList from "../ExerciseInstanceInList/ExerciseInstanceInList.jsx";
import "./userTrainingInstances.css";
export default function UserTrainigInstances({ refresh, setRefresh }) {
    const { user, setUser } = useContext(UserContext);
    const [trainingInstances, setTrainingInstances] = useState([]);
    useEffect(() => {
        const fetchUserTrainingInstances = async () => {
            const response = await fetch(
                import.meta.env.VITE_REACT_APP_URL_API +
                    `/trainingInstance/${user.email}`
            );
            const data = await response.json();
            if (response.ok) {
                setTrainingInstances(data.trainings_list);
            } else {
                console.error(data.error);
            }
        };
        if (user) {
            fetchUserTrainingInstances();
        }
    }, [user, refresh]);

    return (
        <div className="trainingInstance">
            {trainingInstances.length > 0 ? (
                trainingInstances.map((training, index) => (
                    <div key={index}>
                        <div className="training-header">
                            <h2>{training.name}</h2>
                            <a>
                                {new Date(training.date).toLocaleDateString()}
                            </a>
                        </div>

                        {training.exercises.map((exercise, indexInner) => (
                            <div key={indexInner}>
                                {/* <h3>{exercise.name}</h3>
                                {exercise.sets.map((set, setIndex) => (
                                    <div key={setIndex}>
                                        <div>Kilograms: {set.kilograms}</div>
                                        <div>
                                            Repetitions: {set.repetitions}
                                        </div>
                                    </div>

                                ))} */}
                                <ExerciseInstanceInList
                                    exercise={exercise}
                                ></ExerciseInstanceInList>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p> no training found</p>
            )}
        </div>
    );
}
//refactor this int separate components
