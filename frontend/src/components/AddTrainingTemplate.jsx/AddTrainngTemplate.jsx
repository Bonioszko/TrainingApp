import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../../../context/userContext.jsx";
import { useContext, useEffect, useState } from "react";
export default function AddTrainingTemplate(props) {
    const { user, setUser } = useContext(UserContext);
    const { trainingTemplate, setTrainingTemplate } = useState({
        name: "",
        creator: "",
        exercises: [],
    });
    return props.trigger ? (
        <div className="popup">
            <div className="popup-inner">
                <button
                    className="close-btn"
                    onClick={() => props.setTrigger(false)}
                >
                    close{" "}
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
