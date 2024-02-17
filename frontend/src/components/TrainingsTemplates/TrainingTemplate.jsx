import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext.jsx";
import AddTrainingBasedOnTemplate from "../AddTrainingBasedOnTemplate/AddTrainingBasedOnTemplate.jsx";
import ButtonPlus from "../ButtonPlus/ButtonPlus.jsx";
import CurrentTraining from "../CurrentTraining/CurrentTraining.jsx";
import Dropdown from "../Dropdown/Dropdown";
import DeleteButton from "../DeleteButton/DeleteButton.jsx";
import "./trainingTemplate.css";
export default function TrainingTemplate({ refresh, setRefresh }) {
    const [userTrainingTemplate, setUserTrainingTemplate] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const [trainingPopup, setTrainingPopup] = useState(false);
    const [currentTraining, setCurrentTraining] = useState({});
    const [trainingInstance, setTrainingInstance] = useState({
        name: "",
        doneBy: "",
        exercises: [],
        date: "",
    });
    const [trainingInstancePopup, setTrainingInstancePopup] = useState(false);
    useEffect(() => {
        const fetchTrainingTemplates = async () => {
            const response = await fetch(
                import.meta.env.VITE_REACT_APP_URL_API +
                    `/training/${user.email}`
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
        } else {
            setUserTrainingTemplate([]);
        }
    }, [user, trainingPopup]);

    return (
        <div className="training-template">
            <h1>Training Templates</h1>
            {userTrainingTemplate.length > 0 ? (
                userTrainingTemplate.map((training, index) => (
                    <div
                        className="trainig-template-instance"
                        key={index}
                        onClick={() => {
                            setTrainingPopup(true);
                            setCurrentTraining(training);
                        }}
                    >
                        <h1>{training.name}</h1>{" "}
                        <ButtonPlus
                            onClick={() => {
                                setTrainingPopup(true);
                                setCurrentTraining(training);
                            }}
                        ></ButtonPlus>
                    </div>
                ))
            ) : (
                <p>No training templates found</p>
            )}
            {/* <Dropdown
                name="training"
                listItems={userTrainingTemplate}
            ></Dropdown> */}

            {trainingPopup && (
                <AddTrainingBasedOnTemplate
                    trigger={trainingPopup}
                    setTrigger={setTrainingPopup}
                    trainingTemplate={currentTraining}
                    trainingInstance={trainingInstance}
                    setTrainingInstance={setTrainingInstance}
                    setTrainingInstancePopup={setTrainingInstancePopup}
                    refresh={refresh}
                    setRefresh={setRefresh}
                ></AddTrainingBasedOnTemplate>
            )}
            {trainingInstancePopup && (
                <CurrentTraining
                    trainingInstance={trainingInstance}
                    setTrainingInstancePopup={setTrainingInstancePopup}
                    refresh={refresh}
                    setRefresh={setRefresh}
                ></CurrentTraining>
            )}
        </div>
    );
}
