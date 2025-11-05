"use client";

import { useState } from "react";
import DatePicker from "./datepicker/DatePicker";

export default function Main() {
  const [selectedDates, setSelectedDates] = useState([]);

  const unavailableDateRanges = [
    {
      start: new Date(2023, 1, 21), // February 21
      end: new Date(2023, 2, 18), // March 18
    },
    {
      start: new Date(2023, 2, 29), // March 29
      end: new Date(2023, 3, 23), // April 23
    },
  ];

  const initialSelectedDates = [
    new Date(2023, 1, 15),
    new Date(2023, 1, 16),
    new Date(2023, 1, 17),
    new Date(2023, 1, 18),
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <DatePicker
        unavailableDateRanges={unavailableDateRanges}
        initialSelectedDates={initialSelectedDates}
        initialMonth={new Date(2023, 1, 1)}
        onDateChange={(dates) => {
          setSelectedDates(dates);
          console.log("Selected dates updated:", dates);
        }}
        onClear={() => {
          setSelectedDates([]);
          console.log("Dates cleared from parent");
        }}
      />

      {/* Display selected dates */}
      {selectedDates.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 max-w-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Selected Dates:</h3>
          <div className="space-y-1">
            {selectedDates.map((date) => (
              <p key={date.toISOString()} className="text-sm text-gray-600">
                {date.toDateString()}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
