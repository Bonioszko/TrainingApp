import "./setsInList.css";
export default function SetsInList({ set }) {
    return (
        <div className="sets">
            <div>Kilograms: {set.kilograms}</div>
            <div>Repetitions: {set.repetitions}</div>
        </div>
    );
}
