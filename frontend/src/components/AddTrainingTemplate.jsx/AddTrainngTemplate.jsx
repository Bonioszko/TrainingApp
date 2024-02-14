import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../../../context/userContext.jsx";
import { useContext, useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown.jsx";
import ButtonPlus from "../ButtonPlus/ButtonPlus.jsx";
import DeleteButton from "../DeleteButton/DeleteButton.jsx";
export default function AddTrainingTemplate(props) {
    const { user, setUser } = useContext(UserContext);
    const [trainingTemplate, setTrainingTemplate] = useState({
        name: "",
        creator: "",
        exercises: [],
    });
    const [selectedExercise, setSelectedExercise] = useState("");

    const handleExerciseChange = (newExercise) => {
        setSelectedExercise(newExercise);
    };
    const handleSubmit = async (e) => {
        setTrainingTemplate({ ...trainingTemplate, creator: user.email });
        e.preventDefault();
        const { creator, name, exercises } = trainingTemplate;

        try {
            const response = await fetch(
                import.meta.env.VITE_REACT_APP_URL_API + "/training",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email: creator, exercises }),
                }
            );
            const responseData = await response.json();

            // Handle response data as needed
            console.log(responseData);
            if (responseData.error) {
                toast.error(responseData.error);
            } else {
                toast.success("Training Saved");
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };
    const handleExerciseAdd = (event) => {
        event.preventDefault();
        if (
            selectedExercise !== "" &&
            !trainingTemplate.exercises.includes(selectedExercise)
        ) {
            const newExercises = [
                ...trainingTemplate.exercises,
                selectedExercise,
            ];
            setTrainingTemplate((prevState) => ({
                ...prevState,
                exercises: newExercises,
            }));
        }
    };
    const handleExerciseDelete = (exercise) => {
        const newExercises = trainingTemplate.exercises.filter(
            (e) => e !== exercise
        );
        setTrainingTemplate((prevState) => ({
            ...prevState,
            exercises: newExercises,
        }));
    };
    return props.trigger ? (
        <div className="popup">
            <div className="popup-inner">
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="enter name"
                            value={trainingTemplate.name}
                            onChange={(e) =>
                                setTrainingTemplate({
                                    ...trainingTemplate,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="form-field">
                        <Dropdown
                            name="exercise"
                            listItems={props.userExercises}
                            onValueChange={handleExerciseChange}
                        ></Dropdown>
                        <ButtonPlus
                            type="button"
                            onClick={handleExerciseAdd}
                        ></ButtonPlus>
                        {trainingTemplate.exercises.map((exercise, index) => (
                            <div key={index}>
                                {exercise}
                                <DeleteButton
                                    onClick={() =>
                                        handleExerciseDelete(exercise)
                                    }
                                ></DeleteButton>
                            </div>
                        ))}
                    </div>
                    <button type="submit"> submit</button>
                </form>

                <button
                    className="close-btn"
                    onClick={() => props.setTrigger(false)}
                >
                    close
                </button>
                {props.children}
            </div>
            <ToastContainer />
        </div>
    ) : (
        ""
    );
}
//add lsit of exercises to choose from add on button, can delete them before posting, submit button fetchung
