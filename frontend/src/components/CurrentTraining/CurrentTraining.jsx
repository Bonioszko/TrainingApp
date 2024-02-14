import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext.jsx";
import CloseButton from "../CloseButton/CloseButton.jsx";
import SetsInList from "../SetsInList/SetsInList.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
// export default function CurrentTraining({
//     trainingInstance,
//     setTrainingInstancePopup,
// }) {
//     const [trainingChanged, setTrainingChanged] = useState(trainingInstance);
//     console.log(trainingChanged);
//     return (
//         <div className="popup">
//             <div className="popup-inner">
//                 <CloseButton
//                     onClick={() => setTrainingInstancePopup(false)}
//                 ></CloseButton>
//                 {trainingChanged.name}
//                 <div>
//                     {trainingChanged.exercises.map((exercise, index) => (
//                         <div key={index}>{exercise.name}</div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }
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
            const response = await fetch(
                import.meta.env.VITE_REACT_APP_URL_API + "/trainingInstance",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        date: date,
                        exercises: exercises,
                    }),
                }
            );
            const data = await response.json();
            if (response.ok) {
                setRefresh(!refresh);
                toast.success("training added");
                setTrainingInstancePopup(false);
                setTrainingChanged(null);
            }
        } catch (error) {
            console.error("Error", error);
            toast.error("training not added");
        }
    };
    const addSet = (exerciseIndex) => {
        const exercise = { ...trainingChanged.exercises[exerciseIndex] };
        exercise.sets.push(sets[exerciseIndex]);

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
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <CloseButton
                    onClick={() => setTrainingInstancePopup(false)}
                ></CloseButton>
                {trainingChanged.name}
                <div>
                    {trainingChanged.exercises.map((exercise, index) => (
                        <div key={index}>
                            {exercise.name}
                            <h1>previuos Sets</h1>
                            {exercise.sets.map((set, setIndex) => (
                                <div key={setIndex}>
                                    {/* <div>Kilograms: {set.kilograms}</div>
                                    <div>Repetitions: {set.repetitions}</div> */}
                                    <SetsInList set={set}></SetsInList>
                                </div>
                            ))}
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
                                                      kilograms: e.target.value,
                                                  }
                                                : set
                                        )
                                    )
                                }
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
                            />
                            <button onClick={() => addSet(index)}>
                                Add Set
                            </button>
                        </div>
                    ))}
                </div>
                <button onClick={handleSubmit}>submit</button>
            </div>
            <ToastContainer />
        </div>
    );
}

//add support for if user refresh page what to do
