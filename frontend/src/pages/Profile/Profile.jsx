import Navbar from "../../components/Navbar/Navbar";
import { UserContext } from "../../../context/userContext.jsx";
import { useContext, useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown/Dropdown.jsx";
import ButtonPlus from "../../components/ButtonPlus/ButtonPlus.jsx";
import AddExercise from "../../components/AddExercise/AddExercise.jsx";
import DeleteButton from "../../components/DeleteButton/DeleteButton.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
export default function Profile() {
    const { user, setUser } = useContext(UserContext);
    const [userExercises, setUserExercises] = useState([]);
    const [userTrainingTemplate, setUserTrainingTemplate] = useState([]);
    const [exercisePopup, setExercisePopup] = useState(false);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        const fetchExercises = async () => {
            const response = await fetch(
                import.meta.env.VITE_REACT_APP_URL_API +
                    `/exercise/${user.email}`
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
    }, [user, exercisePopup, refresh]);
    //not optimal one render when poping up a window
    useEffect(() => {
        const fetchTrainingTemplates = async () => {
            const response = await fetch(
                import.meta.env.VITE_REACT_APP_URL_API + `/${user.email}`
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
    }, [user, exercisePopup, refresh]);
    // const handleSubmit = async (e) => {};
    const handleDelete = async (exerciseName) => {
        const response = await fetch(
            import.meta.env.VITE_REACT_APP_URL_API + `/exercise`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    exerciseName: exerciseName,
                    email: user.email,
                }),
            }
        );

        if (response.ok) {
            setRefresh((prevRefresh) => !prevRefresh);
            toast.success("Exercise Deleted");
        } else {
            console.error("Failed to delete exercise");
        }
    };
    return (
        <div className="main">
            <Navbar></Navbar>
            <div className="page">
                <button>sadasdsd</button>
                <div>
                    {userExercises.length > 0 ? (
                        userExercises.map((exercise, index) => (
                            <div key={index}>
                                <h2>{exercise.name}</h2>
                                <DeleteButton
                                    onClick={() => handleDelete(exercise.name)}
                                ></DeleteButton>
                            </div>
                        ))
                    ) : (
                        <p>No exercises found</p>
                    )}

                    <Dropdown
                        name="exercise"
                        listItems={userExercises}
                    ></Dropdown>
                    <ButtonPlus
                        onClick={() => setExercisePopup(true)}
                    ></ButtonPlus>

                    <AddExercise
                        trigger={exercisePopup}
                        setTrigger={setExercisePopup}
                    ></AddExercise>
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
            <ToastContainer />
        </div>
    );
}
