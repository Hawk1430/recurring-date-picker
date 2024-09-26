import React, { useState } from "react";
import DatePicker from "./components/DatePicker";
import MiniCalendar from "./components/MiniCalendar";

const App = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [recurrencePattern, setRecurrencePattern] = useState("");
  const [recurringDates, setRecurringDates] = useState([]);

  const calculateRecurringDates = (recurrenceDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let dates = [];

    if (recurrencePattern === "Daily") {
      let currentDate = new Date(recurrenceDate);
      while (currentDate <= end) {
        if (currentDate >= start) dates.push(currentDate.toDateString());
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else if (recurrencePattern === "Weekly") {
      let currentDate = new Date(recurrenceDate);
      while (currentDate <= end) {
        if (currentDate >= start) dates.push(currentDate.toDateString());
        currentDate.setDate(currentDate.getDate() + 7);
      }
    } else if (recurrencePattern === "Monthly") {
      let currentDate = new Date(recurrenceDate);
      while (currentDate <= end) {
        if (currentDate >= start) dates.push(currentDate.toDateString());
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    } else if (recurrencePattern === "Yearly") {
      let currentDate = new Date(recurrenceDate);
      while (currentDate <= end) {
        if (currentDate >= start) dates.push(currentDate.toDateString());
        currentDate.setFullYear(currentDate.getFullYear() + 1);
      }
    }

    setRecurringDates(dates);
  };

  return (
    <div className="app max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Recurring Date Picker
      </h1>
      <DatePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setRecurrencePattern={setRecurrencePattern}
        calculateRecurringDates={calculateRecurringDates}
      />
      <MiniCalendar
        startDate={startDate}
        endDate={endDate}
        selectedDates={recurringDates} // Use recurringDates for selected dates
        onDateClick={(date) => {
          // Handle the date selection here
          console.log(date);
        }}
      />
    </div>
  );
};

export default App;
