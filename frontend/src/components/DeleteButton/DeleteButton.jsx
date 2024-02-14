import "./deleteButton.css";
export default function DeleteButton({ onClick }) {
    return (
        <a className="my-button" href="#" onClick={onClick}>
            <span></span>
        </a>
    );
}
