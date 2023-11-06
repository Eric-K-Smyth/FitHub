// MonthlyCalendar.js
import { useState } from 'react';
import './Calendar.css';

const MonthlyCalendar = () => {
  const [activeDays, setActiveDays] = useState([]);
  const today = new Date().getDate();

  const toggleDay = (day) => {
    setActiveDays((prevActiveDays) =>
      prevActiveDays.includes(day)
        ? prevActiveDays.filter((d) => d !== day)
        : [...prevActiveDays, day]
    );
  };

  const startWorkout = () => {
    toggleDay(today); // Mark today as completed when the workout starts
  };

  const totalDaysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

  const days = Array.from({ length: totalDaysInMonth }, (_, index) => index + 1);
//Add onClick to workout page and link path to Calendar component to activate
  return (
    <div className="monthly-calendar">
      <div className="calendar-header">
        <h2>{new Date().toLocaleDateString('default', { month: 'long' })}</h2>
      </div>
      <div className="calendar-grid">
        {days.map((day) => (
          <div
            key={day}
            className={`calendar-day ${activeDays.includes(day) ? 'active' : ''} ${
              day === today ? 'today' : ''
            }`}
            onClick={() => toggleDay(day)}
          >
            {day}
          </div>
        ))}
      </div>
      <button onClick={startWorkout}>Start Workout</button>
    </div>
  );
};

export default MonthlyCalendar;

