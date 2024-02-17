import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext.jsx";
import ExerciseInstanceInList from "../ExerciseInstanceInList/ExerciseInstanceInList.jsx";
import "./userTrainingInstances.css";
export default function UserTrainigInstances({
    refresh,
    setRefresh,
    selectedDate,
}) {
    const { user, setUser } = useContext(UserContext);
    const [trainingInstances, setTrainingInstances] = useState([]);
    useEffect(() => {
        const fetchUserTrainingInstances = async () => {
            selectedDate.setHours(selectedDate.getHours() + 1);
            const date = selectedDate.toISOString();

            const response = await fetch(
                import.meta.env.VITE_REACT_APP_URL_API +
                    `/trainingInstance/${user.email}/${date}`
            );
            const data = await response.json();
            selectedDate.setHours(selectedDate.getHours() - 1);
            if (response.ok) {
                setTrainingInstances(data.trainings_list);
            } else {
                console.error(data.message);
            }
        };
        if (user && selectedDate) {
            fetchUserTrainingInstances();
        }
    }, [user, refresh, selectedDate]);
    //change it to something prettier
    return (
        <div className="trainingInstance">
            {trainingInstances.length > 0 ? (
                trainingInstances.map((training, index) => (
                    <div key={index}>
                        <div className="training-header">
                            <h1>{training.name}</h1>
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
                <p> no trainings found</p>
            )}
        </div>
    );
}
//refactor this int separate components
