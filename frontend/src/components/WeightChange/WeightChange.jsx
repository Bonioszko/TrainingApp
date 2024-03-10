import { UserContext } from "../../../context/userContext.jsx";
import { useContext } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
export default function WeightChange() {
    const { user, setUser } = useContext(UserContext);
    const [isWeightInputDisplayed, setIsWeightInputDisplayed] = useState(false);
    // Add a new state variable for storing the new weight
    const [newWeight, setNewWeight] = useState(user.weight || 0);

    return isWeightInputDisplayed ? (
        <input
            type="number"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            onBlur={() => setIsWeightInputDisplayed(false)}
            onKeyPress={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    // TODO: Send a PATCH request to update the weight
                    setIsWeightInputDisplayed(false);
                }
            }}
            autoFocus
        />
    ) : (
        <>
            {" "}
            <p>your weight is {user.weight || 0}</p>{" "}
            <FontAwesomeIcon
                icon={faSquarePen}
                className="icon-displayed"
                onClick={() => setIsWeightInputDisplayed(true)}
            />
        </>
    );
}
