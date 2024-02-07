import Navbar from "../../components/Navbar/Navbar";
import { UserContext } from "../../../context/userContext.jsx";
import { useContext, useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown/Dropdown.jsx";
export default function Profile() {
    const { user, setUser } = useContext(UserContext);
    const [userExercises, setUserExercises] = useState([]);
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
        }
    }, [user]);

    // const handleSubmit = async (e) => {};

    return (
        <div className="main">
            <Navbar></Navbar>
            <div className="page">
                <div>
                    {userExercises.map((exercise, index) => (
                        <div key={index}>
                            <h2>{exercise.name}</h2>
                            <p>{exercise.bodyPart}</p>
                        </div>
                    ))}
                    <Dropdown
                        name="exercise"
                        listItems={userExercises}
                    ></Dropdown>
                </div>
            </div>
        </div>
    );
}
