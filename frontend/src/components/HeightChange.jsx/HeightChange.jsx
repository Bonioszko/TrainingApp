import { UserContext } from "../../../context/userContext.jsx";
import { useContext } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import "./heightChange.css";
export default function HeightChange() {
    const { user, setUser } = useContext(UserContext);
    const [isHeightInputDisplayed, setIsHeightInputDisplayed] = useState(false);
    // Add a new state variable for storing the new height
    const [newHeight, setNewHeight] = useState(user.height || 0);

    const handleHeightChange = async () => {
        const response = await fetch(`/api/auth/profile`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                height: newHeight,
            }),
        });
        if (response.ok) {
            setUser();
        }
    };

    return isHeightInputDisplayed ? (
        <input
            type="number"
            value={newHeight}
            onChange={(e) => setNewHeight(e.target.value)}
            onBlur={() => setIsHeightInputDisplayed(false)}
            onKeyPress={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    handleHeightChange();
                    setIsHeightInputDisplayed(false);
                }
            }}
            autoFocus
        />
    ) : (
        <div className="edit-property">
            {" "}
            <p>Your height is {user.height || 0}</p>{" "}
            <FontAwesomeIcon
                icon={faSquarePen}
                className="icon-displayed"
                onClick={() => setIsHeightInputDisplayed(true)}
            />
        </div>
    );
}
