"use client"
import { useState, useEffect } from "react";
import { CheckIcon } from "lucide-react";

interface TimePickerProps {
  hours: number;
  minutes: number;
  onHoursChange: (hours: number) => void;
  onMinutesChange: (minutes: number) => void;
  onConfirm?: () => void;
  className?: string;
}

export const TimePicker = ({ 
  hours, 
  minutes, 
  onHoursChange, 
  onMinutesChange, 
  onConfirm,
  className = "" 
}: TimePickerProps) => {
  const [tempHours, setTempHours] = useState(hours);
  const [tempMinutes, setTempMinutes] = useState(minutes);

  useEffect(() => {
    setTempHours(hours);
    setTempMinutes(minutes);
  }, [hours, minutes]);

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const clampedValue = Math.max(0, Math.min(23, value));
    setTempHours(clampedValue);
    onHoursChange(clampedValue);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const clampedValue = Math.max(0, Math.min(59, value));
    setTempMinutes(clampedValue);
    onMinutesChange(clampedValue);
  };

  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Hours Field */}
      <div className="relative">
        <div className="bg-gray-100 rounded-lg px-4 py-3 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={tempHours}
              onChange={handleHoursChange}
              className="w-8 text-center font-bold text-black bg-transparent border-none outline-none text-lg"
              min="0"
              max="23"
            />
            <span className="text-gray-500 text-sm">Hr.</span>
          </div>
        </div>
      </div>

      {/* Minutes Field */}
      <div className="relative">
        <div className="bg-gray-100 rounded-lg px-4 py-3 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={tempMinutes}
              onChange={handleMinutesChange}
              className="w-8 text-center font-bold text-black bg-transparent border-none outline-none text-lg"
              min="0"
              max="59"
            />
            <span className="text-gray-500 text-sm">Min.</span>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        className="bg-gray-100 rounded-lg p-3 shadow-sm border border-gray-200 hover:bg-gray-200 transition-colors"
      >
        <CheckIcon className="w-5 h-5 text-black" />
      </button>
    </div>
  );
};
