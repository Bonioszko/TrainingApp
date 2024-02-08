import React from "react";
import "./addExercise.css";
import { useState } from "react";
import { UserContext } from "../../../context/userContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
export default function AddExercise(props) {
    const { user, setUser } = useContext(UserContext);
    const [data, setdata] = useState({
        exerciseName: "",
        bodyPart: "",
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { exerciseName, bodyPart } = data;
        console.log(data);
        try {
            const response = await fetch("http://localhost:8000/exercise", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    exerciseName,
                    bodyPart,
                    email: user.email,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data);
                toast.success(data.message);
                setdata({
                    exerciseName: "",
                    bodyPart: "",
                });
            } else {
                console.log(data.error);
                toast.error(data.error);
            }
        } catch (error) {
            console.error("Error", error);
        }
    };
    return props.trigger ? (
        <div className="popup">
            <div className="popup-inner">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="exerciseName">Exercise Name:</label>
                    <br />
                    <input
                        type="text"
                        id="exerciseName"
                        name="exerciseName"
                        value={data.exerciseName}
                        onChange={(e) =>
                            setdata({ ...data, exerciseName: e.target.value })
                        }
                    />
                    <br />
                    <label htmlFor="bodyPart">Body Part:</label>
                    <br />
                    <select
                        id="bodyPart"
                        name="bodyPart"
                        value={data.bodyPart}
                        onChange={(e) =>
                            setdata({ ...data, bodyPart: e.target.value })
                        }
                    >
                        <option value="Arms">Arms</option>
                        <option value="Legs">Legs</option>
                        <option value="Chest">Chest</option>
                    </select>
                    <br />

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
