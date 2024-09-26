import React, { useState } from "react";

const DatePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setRecurrencePattern,
  calculateRecurringDates,
}) => {
  const [selectedRecurrenceDate, setSelectedRecurrenceDate] = useState("");

  const handleRecurrencePatternChange = (e) => {
    setRecurrencePattern(e.target.value);
  };

  const handleRecurrenceDateSelect = (date) => {
    setSelectedRecurrenceDate(date);
    calculateRecurringDates(
      new Date(startDate.getFullYear(), startDate.getMonth(), date)
    );
  };

  const handleDateChange = (e, isEndDate = false) => {
    const selectedDate = new Date(e.target.value);
    if (isEndDate) {
      if (selectedDate <= startDate) {
        alert("End date must be greater than start date.");
      } else {
        setEndDate(selectedDate);
      }
    } else {
      setStartDate(selectedDate);
    }
  };

  return (
    <div className="mb-6">
      <input
        type="date"
        onChange={(e) => handleDateChange(e)}
        className="border rounded-md p-2 mr-2"
      />
      <input
        type="date"
        onChange={(e) => handleDateChange(e, true)}
        className="border rounded-md p-2 mr-2"
      />
      <select
        onChange={handleRecurrencePatternChange}
        className="border rounded-md p-2 mr-2"
      >
        <option value="">Select Recurrence Pattern</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
      {startDate && (
        <div>
          <h3 className="mt-4 mb-2">Select Recurrence Date:</h3>
          <div className="grid grid-cols-7 gap-1">
            {[...Array(31).keys()].map((i) => (
              <button
                key={i + 1}
                onClick={() => handleRecurrenceDateSelect(i + 1)}
                className="border rounded-md p-2 hover:bg-gray-300"
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
