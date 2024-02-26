import { useState, useRef } from "react";
import "./stopwatch.css";
export default function Stopwatch() {
    const [currentState, setCurrentState] = useState("");
    const [currentTime, setCurrentTime] = useState(0);
    const intervalRef = useRef();
    const onStart = () => {
        if (currentState === "START") return;
        setCurrentState("START");
        intervalRef.current = setInterval(() => {
            setCurrentTime((currentTime) => currentTime + 50);
        }, 50);
    };

    const onStop = () => {
        if (currentState === "STOP") return;
        setCurrentState("STOP");
        clearInterval(intervalRef.current);
    };

    const onReset = () => {
        if (currentState === "RESET") return;
        setCurrentTime(0);
        setCurrentState("STOP");
        clearInterval(intervalRef.current);
    };

    const sec = Math.floor(currentTime / 1000);
    const min = Math.floor(sec / 60);

    const millis = (currentTime % 1000).toString().padStart(3, "0");
    const seconds = (sec % 60).toString().padStart(2, "0");
    const minutes = (min % 60).toString().padStart(2, "0");

    return (
        <div className="stopwatch">
            <button onClick={onStart}>Start</button>

            <button onClick={onReset}>Reset</button>
            <div className="timer">
                <span>{minutes}</span>:<span>{seconds}</span>:
                <span>{millis}</span>
            </div>
        </div>
    );
}
