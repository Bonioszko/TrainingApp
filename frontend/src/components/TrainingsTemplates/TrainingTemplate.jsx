import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext.jsx";
import AddTrainingBasedOnTemplate from "../AddTrainingBasedOnTemplate/AddTrainingBasedOnTemplate.jsx";
import ButtonPlus from "../ButtonPlus/ButtonPlus.jsx";
import CurrentTraining from "../CurrentTraining/CurrentTraining.jsx";
import Dropdown from "../Dropdown/Dropdown";

export default function TrainingTemplate() {
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
        <div>
            {userTrainingTemplate.length > 0 ? (
                userTrainingTemplate.map((training, index) => (
                    <div key={index}>
                        <h2>{training.name}</h2>
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
            <Dropdown
                name="training"
                listItems={userTrainingTemplate}
            ></Dropdown>
            {trainingInstance.name}
            {trainingPopup && (
                <AddTrainingBasedOnTemplate
                    trigger={trainingPopup}
                    setTrigger={setTrainingPopup}
                    trainingTemplate={currentTraining}
                    trainingInstance={trainingInstance}
                    setTrainingInstance={setTrainingInstance}
                    setTrainingInstancePopup={setTrainingInstancePopup}
                ></AddTrainingBasedOnTemplate>
            )}
            {trainingInstancePopup && (
                <CurrentTraining
                    trainingInstance={trainingInstance}
                    setTrainingInstancePopup={setTrainingInstancePopup}
                ></CurrentTraining>
            )}
        </div>
    );
}
