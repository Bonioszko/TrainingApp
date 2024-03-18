import { useState } from "react";
import { UserContext } from "../../../context/userContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import "./addTrainingBasedOnTemplate.css";
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
        template: "",
        date: "",
    });
    const trainingTemplate = props.trainingTemplate;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, date } = data;
        try {
            const response = await fetch("/api/trainingInstance", {
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
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("TrainingInstanceCreated");
                props.setTrainingInstance({
                    name: data.trainingInstance.name,
                    doneBy: data.trainingInstance.doneBy,
                    exercises: data.trainingInstance.exercises,
                    template: data.trainingInstance.template,
                    date: data.trainingInstance.date,
                });
                setTimeout(() => {
                    props.setTrigger(false);
                    props.setTrainingInstancePopup(true);
                    props.setRefresh(!props.refresh);
                }, 1000);
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
            <div className="popup-inner-template">
                <form
                    onSubmit={handleSubmit}
                    className="form-training-template"
                >
                    <h2>Add Training</h2>
                    <div className="form-field">
                        {" "}
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) =>
                                setData({ ...data, name: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-field">
                        {" "}
                        <label htmlFor="name">Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={data.date}
                            onChange={(e) =>
                                setData({ ...data, date: e.target.value })
                            }
                        />
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
