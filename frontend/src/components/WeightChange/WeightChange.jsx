import { UserContext } from "../../../context/userContext.jsx";
import { useContext } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import "./weightChange.css";
export default function WeightChange() {
    const { user, setUser } = useContext(UserContext);
    const [isWeightInputDisplayed, setIsWeightInputDisplayed] = useState(false);
    // Add a new state variable for storing the new weight
    const [newWeight, setNewWeight] = useState(user.weight || 0);

    const handleWeightChange = async () => {
        const response = await fetch(`/api/auth/profile`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                weight: newWeight,
            }),
        });
        if (response.ok) {
            setUser();
        }
    };

    return isWeightInputDisplayed ? (
        <input
            type="number"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            onBlur={() => setIsWeightInputDisplayed(false)}
            onKeyPress={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    handleWeightChange();
                    setIsWeightInputDisplayed(false);
                }
            }}
            autoFocus
        />
    ) : (
        <div className="edit-property">
            {" "}
            <p>your weight is {user.weight || 0}</p>{" "}
            <FontAwesomeIcon
                icon={faSquarePen}
                className="icon-displayed"
                onClick={() => setIsWeightInputDisplayed(true)}
            />
        </div>
    );
}
