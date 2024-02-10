import { useState } from "react";
import { UserContext } from "../../../context/userContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";

export default function AddTrainingBasedOnTemplate(props) {
    const { user, setUser } = useContext(UserContext);

    const [data, setData] = useState({
        name: "",
        date: "",
    });
    const [training, setTraining] = useState({
        name: "",
        doneBy: "",
        exercises: [],
        date: "",
    });
    const trainingTemplate = props.trainingTemplate;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, date } = data;
        try {
            const response = await fetch(
                import.meta.env.VITE_REACT_APP_URL_API + "/trainingInstance",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        date,
                        doneBy: user.email,
                        creator: trainingTemplate.creator,
                        nameTemplate: trainingTemplate.name,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                console.log(data.trainingInstance.name);
                toast.success("TrainingInstanceCreated");
                setTraining({
                    name: data.trainingInstance.name,
                    doneBy: data.trainingInstance.doneBy,
                    exercises: data.trainingInstance.exercises,
                    date: data.trainingInstance.date,
                });
                // props.setTrigger(false);
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
                    <label htmlFor="name">Name:</label>
                    <br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                        }
                    />
                    <br />
                    <label htmlFor="name">Name:</label>
                    <br />
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={data.date}
                        onChange={(e) =>
                            setData({ ...data, date: e.target.value })
                        }
                    />
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
