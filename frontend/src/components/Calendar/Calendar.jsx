import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export default function Calendar({ selectedDate, setSelectedDate }) {
    const [startDate, setStartDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            visible
        />
    );
}
