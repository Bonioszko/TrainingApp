import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext.jsx";
import CloseButton from "../CloseButton/CloseButton.jsx";

export default function CurrentTraining({
    trainingInstance,
    setTrainingInstancePopup,
}) {
    const [trainingChanged, setTrainingChanged] = useState(trainingInstance);
    console.log(trainingChanged);
    return (
        <div className="popup">
            <div className="popup-inner">
                <CloseButton
                    onClick={() => setTrainingInstancePopup(false)}
                ></CloseButton>
                {trainingChanged.name}
                <div>
                    {trainingChanged.exercises.map((exercise, index) => (
                        <div key={index}>{exercise.name}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}
