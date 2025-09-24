"use client"
import { useState, useEffect } from "react";
import { Edit2, Check } from "lucide-react";

interface DurationPickerProps {
  hours: number;
  minutes: number;
  onHoursChange: (hours: number) => void;
  onMinutesChange: (minutes: number) => void;
  className?: string;
}

export const DurationPicker = ({ 
  hours, 
  minutes, 
  onHoursChange, 
  onMinutesChange, 
  className = "" 
}: DurationPickerProps) => {
  const [isEditing, setIsEditing] = useState(false);
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
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const clampedValue = Math.max(0, Math.min(59, value));
    setTempMinutes(clampedValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleConfirm = () => {
    onHoursChange(tempHours);
    onMinutesChange(tempMinutes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempHours(hours);
    setTempMinutes(minutes);
    setIsEditing(false);
  };

  return (
    <div className={`relative ${className}`}>
      {!isEditing ? (
        // Mode affichage - Une seule pillule
        <div className="bg-gray-100 rounded-full px-6 py-3 flex items-center gap-4 min-w-[200px] transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-1">
            <span className="w-8 text-center font-bold text-black text-lg">{hours}</span>
            <span className="text-gray-500 text-sm">Hr.</span>
          </div>
          
          <div className="flex items-center gap-1">
            <span className="w-8 text-center font-bold text-black text-lg">{minutes}</span>
            <span className="text-gray-500 text-sm">Min.</span>
          </div>

          <button
            onClick={handleEdit}
            className="ml-auto p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Edit2 className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      ) : (
        // Mode édition - Deux pillules séparées
        <div className="flex items-center gap-3 transition-all duration-300 ease-in-out">
          {/* Pillule des heures */}
          <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm border border-gray-200 transition-all duration-300 ease-in-out">
            <input
              type="text"
              value={tempHours}
              onChange={handleHoursChange}
              className="w-8 text-center font-bold text-black bg-transparent border-none outline-none text-lg"
              min="0"
              max="23"
              autoFocus
            />
            <span className="text-gray-500 text-sm">Hr.</span>
          </div>

          {/* Pillule des minutes */}
          <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm border border-gray-200 transition-all duration-300 ease-in-out">
            <input
              type="text"
              value={tempMinutes}
              onChange={handleMinutesChange}
              className="w-8 text-center font-bold text-black bg-transparent border-none outline-none text-lg"
              min="0"
              max="59"
            />
            <span className="text-gray-500 text-sm">Min.</span>
          </div>

          {/* Bouton de validation */}
          <button
            onClick={handleConfirm}
            className="bg-gray-100 rounded-full p-3 shadow-sm border border-gray-200 hover:bg-gray-200 transition-all duration-200 ease-in-out hover:scale-105"
          >
            <Check className="w-4 h-4 text-gray-700" />
          </button>

          {/* Bouton d'annulation (optionnel) */}
          {/* <button
            onClick={handleCancel}
            className="bg-gray-100 rounded-full p-3 shadow-sm border border-gray-200 hover:bg-gray-200 transition-all duration-200 ease-in-out hover:scale-105"
          >
            <span className="w-4 h-4 text-gray-700 text-sm font-bold">×</span>
          </button> */}
        </div>
      )}
    </div>
  );
};
