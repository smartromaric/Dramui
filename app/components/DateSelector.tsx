"use client"
import React, { useState } from "react";
import { DatePicker } from "../components/DatePicker";

export interface DateSelectorProps {
  label?: string;
  date: Date | null;
  setSelectedDate: (time: Date) => void;
  color?: string;
  startMonth?: Date | null;
  disablePastDates?: boolean;
}

export function DateSelector({
  label,
  date,
  setSelectedDate,
  color = "green",
  startMonth = null,
  disablePastDates = false,
}: DateSelectorProps) {
  const [showDatePicker, setDatePicker] = useState<boolean>(false);
  const dayToString = date?.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="">
     <button
  type="button"
  onClick={() => setDatePicker(!showDatePicker)}
  className="cursor-pointer bg-blue/10 rounded-lg flex items-center justify-center py-2 px-5"
>
  <span className="text-blue text-sm rounded-xl font-medium">
    {date
      ? date.toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : label || "Sélectionner une date"}
  </span>
</button>

<div className="absolute z-50 bg-white min-w-[320px] max-w-xs mt-2 mx-[-200px] shadow-lg rounded-2xl">
  <DatePicker
    startMonth={startMonth}
    label={label}
    color={color}
    selectedDate={date}
    setSelectedDate={setSelectedDate}
    showDatePicker={showDatePicker}
    setShowDatePicker={setDatePicker}
    disablePastDates={disablePastDates}
  />
</div>
    </div>
  );
}