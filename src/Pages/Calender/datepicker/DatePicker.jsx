"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function DatePicker({
  unavailableDateRanges = [],
  initialSelectedDates = [],
  initialMonth = new Date(),
  onDateChange,
  onClear,
}) {
  const [currentDate, setCurrentDate] = useState(
    new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1)
  );
  const [selectedDates, setSelectedDates] = useState(initialSelectedDates);
  const [startDate, setStartDate] = useState(null);

  const unavailableDateRangesList = unavailableDateRanges;

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  // Get previous month's days
  const prevMonthLastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  ).getDate();
  const prevMonthDays = Array.from(
    { length: startingDayOfWeek },
    (_, i) => prevMonthLastDay - startingDayOfWeek + i + 1
  );

  // Current month days
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Next month days
  const totalCells = prevMonthDays.length + currentMonthDays.length;
  const nextMonthDays = Array.from(
    { length: 42 - totalCells },
    (_, i) => i + 1
  );

  const weekDays = ["MO", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const isDateUnavailable = (date) => {
    return unavailableDateRangesList.some(
      (range) => date >= range.start && date <= range.end
    );
  };

  const isDateSelected = (day, isCurrentMonth, isPrevMonth) => {
    let checkDate;
    if (isCurrentMonth) {
      checkDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
    } else if (isPrevMonth) {
      checkDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        day
      );
    } else {
      checkDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        day
      );
    }

    return selectedDates.some(
      (d) =>
        d.getFullYear() === checkDate.getFullYear() &&
        d.getMonth() === checkDate.getMonth() &&
        d.getDate() === checkDate.getDate()
    );
  };

  const isDateInRange = (day, isCurrentMonth, isPrevMonth) => {
    if (selectedDates.length === 0) return false;

    let checkDate;
    if (isCurrentMonth) {
      checkDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
    } else if (isPrevMonth) {
      checkDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        day
      );
    } else {
      checkDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        day
      );
    }

    const minDate = new Date(
      Math.min(...selectedDates.map((d) => d.getTime()))
    );
    const maxDate = new Date(
      Math.max(...selectedDates.map((d) => d.getTime()))
    );

    return checkDate >= minDate && checkDate <= maxDate;
  };

  const getDateCellClasses = (unavailable, selected, inRange, isPrevMonth) => {
    const baseClasses =
      "aspect-square flex items-center justify-center text-sm font-medium rounded-lg transition";

    if (unavailable) {
      return `${baseClasses} text-gray-400 line-through cursor-not-allowed`;
    }

    if (selected || inRange) {
      return `${baseClasses} bg-blue-600 text-white cursor-pointer`;
    }

    if (isPrevMonth) {
      return `${baseClasses} text-gray-300 hover:bg-gray-100 cursor-pointer`;
    }

    return `${baseClasses} text-gray-900 hover:bg-gray-100 cursor-pointer`;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day, isCurrentMonth, isPrevMonth) => {
    let clickedDate;
    if (isCurrentMonth) {
      clickedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
    } else if (isPrevMonth) {
      clickedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        day
      );
    } else {
      clickedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        day
      );
    }

    if (isDateUnavailable(clickedDate)) {
      console.log(
        "[v0] Cannot select unavailable date:",
        clickedDate.toDateString()
      );
      return;
    }

    if (startDate === null) {
      // First date selected
      setStartDate(clickedDate);
      const newDates = [clickedDate];
      setSelectedDates(newDates);
      onDateChange?.(newDates);
      console.log("[v0] First date selected:", clickedDate.toDateString());
    } else {
      // Second date selected - create range
      const min = startDate < clickedDate ? startDate : clickedDate;
      const max = startDate > clickedDate ? startDate : clickedDate;

      const range = [];
      const current = new Date(min);
      let hasUnavailable = false;
      while (current <= max) {
        if (isDateUnavailable(current)) {
          hasUnavailable = true;
          break;
        }
        range.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }

      if (hasUnavailable) {
        console.log("[v0] Cannot select range - contains unavailable dates");
        setStartDate(null);
        return;
      }

      setSelectedDates(range);
      setStartDate(null);
      onDateChange?.(range);
      console.log(
        "[v0] Date range selected:",
        range.map((d) => d.toDateString())
      );
    }
  };

  const handleClearDates = () => {
    setSelectedDates([]);
    setStartDate(null);
    onClear?.();
    console.log("[v0] Dates cleared");
  };

  return (
    <div className="w-96">
      <div className="bg-white rounded-3xl shadow-lg p-8">
        {/* Header with navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900">{monthName}</h2>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Next month"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-400 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2 mb-8">
          {/* Previous month days */}
          {prevMonthDays.map((day) => (
            <div
              key={`prev-${day}`}
              className="aspect-square flex items-center justify-center text-sm text-gray-300 font-medium"
            >
              {day}
            </div>
          ))}

          {/* Current month days */}
          {currentMonthDays.map((day) => {
            const checkDate = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day
            );
            const unavailable = isDateUnavailable(checkDate);
            const selected = isDateSelected(day, true, false);
            const inRange = isDateInRange(day, true, false);

            return (
              <button
                key={`current-${day}`}
                onClick={() => handleDateClick(day, true, false)}
                className={getDateCellClasses(
                  unavailable,
                  selected,
                  inRange,
                  false
                )}
                disabled={unavailable}
                aria-label={`${day} ${monthName}`}
              >
                {day}
              </button>
            );
          })}

          {/* Next month days */}
          {nextMonthDays.map((day) => {
            const checkDate = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              day
            );
            const unavailable = isDateUnavailable(checkDate);
            const selected = isDateSelected(day, false, false);
            const inRange = isDateInRange(day, false, false);

            return (
              <button
                key={`next-${day}`}
                onClick={() => handleDateClick(day, false, false)}
                className={getDateCellClasses(
                  unavailable,
                  selected,
                  inRange,
                  true
                )}
                disabled={unavailable}
                aria-label={`${day} next month`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Clear dates button */}
        <button
          onClick={handleClearDates}
          className="w-full flex items-center justify-center gap-2 py-3 text-gray-900 font-medium hover:bg-gray-50 rounded-lg transition"
          aria-label="Clear selected dates"
        >
          <X className="w-5 h-5" />
          Clear Dates
        </button>
      </div>
    </div>
  );
}
