import React, { useEffect, useState } from "react";

const MiniCalendar = ({ startDate, endDate, selectedDates, onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [days, setDays] = useState([]);

  useEffect(() => {
    generateCalendar(currentMonth);
  }, [currentMonth, startDate, endDate, selectedDates]);

  const generateCalendar = (month) => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const totalDays = lastDay.getDate();
    const startDay = firstDay.getDay();

    const monthDays = [];
    // Add empty slots for days from previous month
    for (let i = 0; i < startDay; i++) {
      monthDays.push(null);
    }
    // Add actual days
    for (let i = 1; i <= totalDays; i++) {
      monthDays.push(i);
    }
    setDays(monthDays);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (date) => {
    if (date >= startDate && date <= endDate) {
      onDateClick(date);
    } else {
      alert("Selected date is out of range.");
    }
  };

  const renderDays = () => {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 text-center font-bold text-gray-700 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="p-2">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`p-2 h-16 flex items-center justify-center border border-gray-200 cursor-pointer ${
              day ? "" : "opacity-0"
            }`}
          >
            <span
              className={`block w-full h-full flex items-center justify-center rounded-full ${
                selectedDates.includes(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    day
                  ).toDateString()
                )
                  ? "bg-blue-400 text-white"
                  : ""
              } ${
                isToday(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    day
                  )
                )
                  ? "bg-yellow-200"
                  : ""
              }`}
              onClick={() =>
                day &&
                handleDateClick(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    day
                  )
                )
              }
            >
              {day}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="text-gray-500 hover:text-gray-700"
        >
          Prev
        </button>
        <h2 className="font-semibold text-lg">
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </h2>
        <button
          onClick={handleNextMonth}
          className="text-gray-500 hover:text-gray-700"
        >
          Next
        </button>
      </div>
      {renderDays()}
    </div>
  );
};

export default MiniCalendar;
