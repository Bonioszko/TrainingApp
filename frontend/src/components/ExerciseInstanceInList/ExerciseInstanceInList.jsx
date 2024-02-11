import SetsInList from "../SetsInList/SetsInList";

export default function ExerciseInstanceInList({ exercise }) {
    return (
        <div>
            <h3>{exercise.name}</h3>
            {exercise.sets.map((set, setIndex) => (
                <div key={setIndex}>
                    <SetsInList set={set}></SetsInList>
                </div>
            ))}
        </div>
    );
}
