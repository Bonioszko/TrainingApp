import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext.jsx";
import CloseButton from "../CloseButton/CloseButton.jsx";
import SetsInList from "../SetsInList/SetsInList.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./currentTraining.css";
import DeleteButton from "../DeleteButton/DeleteButton.jsx";
import Stopwatch from "../stopwatch/Stopwatch.jsx";
export default function CurrentTraining({
    trainingInstance,
    setTrainingInstancePopup,
    refresh,
    setRefresh,
}) {
    const [trainingChanged, setTrainingChanged] = useState(trainingInstance);
    const [sets, setSets] = useState(
        trainingInstance.exercises.map(() => ({
            kilograms: "",
            repetitions: "",
        }))
    );
    const handleSubmit = async () => {
        const { name, date, exercises } = trainingChanged;
        try {
            const response = await fetch("/api/trainingInstance", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    date: date,
                    exercises: exercises,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setRefresh(!refresh);

                setTrainingInstancePopup(false);
                setTrainingChanged(null);
                toast.success("training added");
            }
        } catch (error) {
            console.error("Error", error);
            toast.error("training not added");
        }
    };
    const addSet = (exerciseIndex) => {
        const set = sets[exerciseIndex];
        if (set.kilograms > 0 && set.repetitions > 0) {
            const exercise = { ...trainingChanged.exercises[exerciseIndex] };
            exercise.sets.push(set);

            setTrainingChanged({
                ...trainingChanged,
                exercises: trainingChanged.exercises.map((ex, index) =>
                    index === exerciseIndex ? exercise : ex
                ),
            });

            setSets(
                sets.map((set, index) =>
                    index === exerciseIndex
                        ? { kilograms: "", repetitions: "" }
                        : set
                )
            );
        } else {
            toast.warn("Kilograms and repetitions must be greater than 0");
        }
    };
    const deleteSet = (exerciseIndex, setIndex) => {
        const exercise = { ...trainingChanged.exercises[exerciseIndex] };
        exercise.sets.splice(setIndex, 1);

        setTrainingChanged({
            ...trainingChanged,
            exercises: trainingChanged.exercises.map((ex, index) =>
                index === exerciseIndex ? exercise : ex
            ),
        });
    };
    return (
        <div className="popup-training">
            <div className="popup-inner-training">
                <h1>{trainingChanged.name}</h1>
                <Stopwatch></Stopwatch>
                <div className="exercise">
                    {trainingChanged.exercises.map((exercise, index) => (
                        <div key={index} className="exercise-instance">
                            <h1 className="exercise-name">{exercise.name}</h1>
                            <h3>previuos Sets</h3>
                            {exercise.sets.map((set, setIndex) => (
                                <div key={setIndex}>
                                    {/* <div>Kilograms: {set.kilograms}</div>
                                    <div>Repetitions: {set.repetitions}</div> */}
                                    <div className="sets-with-button">
                                        {" "}
                                        <SetsInList set={set}></SetsInList>
                                        <DeleteButton
                                            onClick={() =>
                                                deleteSet(index, setIndex)
                                            }
                                        ></DeleteButton>
                                    </div>
                                </div>
                            ))}
                            <div className="input-sets">
                                {" "}
                                <input
                                    type="number"
                                    placeholder="Kilograms"
                                    value={sets[index].kilograms}
                                    onChange={(e) =>
                                        setSets(
                                            sets.map((set, setIndex) =>
                                                setIndex === index
                                                    ? {
                                                          ...set,
                                                          kilograms:
                                                              e.target.value,
                                                      }
                                                    : set
                                            )
                                        )
                                    }
                                    className="input-current-training"
                                />
                                <input
                                    type="number"
                                    placeholder="Repetitions"
                                    value={sets[index].repetitions}
                                    onChange={(e) =>
                                        setSets(
                                            sets.map((set, setIndex) =>
                                                setIndex === index
                                                    ? {
                                                          ...set,
                                                          repetitions:
                                                              e.target.value,
                                                      }
                                                    : set
                                            )
                                        )
                                    }
                                    className="input-current-training"
                                />
                                <button onClick={() => addSet(index)}>
                                    Add Set
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="buttons">
                    {" "}
                    <CloseButton
                        className="close"
                        onClick={() => setTrainingInstancePopup(false)}
                    ></CloseButton>
                    <button onClick={handleSubmit} className="submit">
                        submit
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

//add support for if user refresh page what to do
