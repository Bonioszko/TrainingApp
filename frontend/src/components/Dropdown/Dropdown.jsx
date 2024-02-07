import "./dropdown.css";
export default function Dropdown({ name, listItems }) {
    console.log(listItems);
    const listItemsSelect = listItems.map((exercise, index) => (
        <option key={index} value={exercise.name}>
            {exercise.name}
        </option>
    ));

    return (
        <>
            <select name={name} id={name}>
                {listItemsSelect}
            </select>
        </>
    );
}
