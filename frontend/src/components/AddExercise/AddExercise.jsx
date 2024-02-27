import React from "react";
import "./addExercise.css";
import { useState } from "react";
import { UserContext } from "../../../context/userContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
export default function AddExercise(props) {
    const { user, setUser } = useContext(UserContext);
    const [data, setData] = useState({
        exerciseName: "",
        bodyPart: "",
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { exerciseName, bodyPart } = data;

        try {
            const response = await fetch("/api/exercise", {
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
                toast.success(data.message);
                setData({
                    exerciseName: "",
                    bodyPart: "",
                });
            } else {
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
                    <div className="form-field">
                        {" "}
                        <label htmlFor="exerciseName">Exercise Name:</label>
                        <input
                            type="text"
                            id="exerciseName"
                            name="exerciseName"
                            value={data.exerciseName}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    exerciseName: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="bodyPart">Body Part:</label>

                        <select
                            id="bodyPart"
                            name="bodyPart"
                            value={data.bodyPart}
                            onChange={(e) =>
                                setData({ ...data, bodyPart: e.target.value })
                            }
                        >
                            {" "}
                            <option value=""></option>
                            <option value="Biceps">Biceps</option>
                            <option value="Triceps">Triceps</option>
                            <option value="Legs">Legs</option>
                            <option value="Chest">Chest</option>
                            <option value="Back">Back</option>
                            <option value="Shoulders">Shoulders</option>
                            <option value="Abs">Abs</option>
                        </select>
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
