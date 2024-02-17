export default function CloseButton({ onClick, className }) {
    return (
        <button onClick={onClick} className={className}>
            Close
        </button>
    );
}
