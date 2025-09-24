"use client"
import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

export interface DatePickerProps {
  label?: string;
  showDatePicker: boolean;
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  setShowDatePicker: (date: boolean) => void;
  startMonth?: Date | null;
  disablePastDates?: boolean;
  color?: string;
}

export function DatePicker({
  label,
  selectedDate,
  setSelectedDate,
  showDatePicker,
  setShowDatePicker,
  startMonth = null,
  disablePastDates = false,
  color = "blue",
}: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(startMonth || selectedDate || new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0); // On ignore l'heure pour la comparaison

  const isPast = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = startMonth ? startMonth.getMonth() : date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    for (let i = 0; i < startOffset; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const handleDayClick = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    setSelectedDate(newDate);
    day && setShowDatePicker(!showDatePicker);
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth()
    );
  };

  return (
    showDatePicker && (
      <div className="flex w-full flex-col border rounded-xl py-3 px-5 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="flex items-center space-x-4">
          <div className={`flex justify-center items-center rounded-full bg-blue  p-2 text-white`}>
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-gray-600 text-sm italic">
              {label || "Sélectionner une date"}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={handlePrevMonth}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <span className="font-semibold">
              {currentMonth.toLocaleDateString("fr-FR", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              onClick={handleNextMonth}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <motion.div
            key={currentMonth.getMonth()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-7 gap-1">
              {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => (
                <span key={`day-${index}`} className="text-center text-xs text-gray-500">
                  {day}
                </span>
              ))}
              {days.map((dayObj, index) =>
                dayObj ? (
                  <motion.button
                    key={index}
                    onClick={() => {
                      if (!disablePastDates || !isPast(dayObj.day)) handleDayClick(dayObj.day);
                    }}
                    className={`text-center py-1 rounded-full 
                      ${isSelected(dayObj.day) ? `bg-blue text-white` : ""}
                      ${dayObj.isCurrentMonth ? "text-gray-800" : "text-gray-400"}
                      ${disablePastDates && isPast(dayObj.day) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:bg-blue/30"}
                      transition-colors duration-200`}
                    whileHover={!disablePastDates || !isPast(dayObj.day) ? { scale: 1.1 } : {}}
                    disabled={disablePastDates && isPast(dayObj.day)}
                  >
                    {dayObj.day}
                  </motion.button>
                ) : (
                  <div key={index} className="text-center py-1 opacity-0">
                    00
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    )
  );
}