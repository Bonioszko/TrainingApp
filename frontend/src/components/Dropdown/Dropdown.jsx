import "./dropdown.css";
export default function Dropdown({ name, listItems, onValueChange }) {
    // console.log(listItems);
    const handleChange = (event) => {
        onValueChange(event.target.value);
    };
    const listItemsSelect = listItems.map((exercise, index) => (
        <option key={index} value={exercise.name}>
            {exercise.name}
        </option>
    ));

    return (
        <>
            <select name={name} id={name} onChange={handleChange}>
                <option value="">Select an option</option>
                {listItemsSelect}
            </select>
        </>
    );
}
