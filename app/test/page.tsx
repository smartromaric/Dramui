"use client"
import { DateSelector } from "../components/DateSelector"
import { DurationPicker } from "../components/DurationPicker"
import { TimePicker } from "../components/TimePicker"
import { useState } from "react";
import StepIndicator from "../components/StepIndicator";
import FilterDiscloture from "../components/FilterDiscloture";

const Test =()=>{
    const [date, setDate] = useState<Date | null>(null);
    const [hours, setHours] = useState(17);
    const [minutes, setMinutes] = useState(23);
    const [timeHours, setTimeHours] = useState(12);
    const [timeMinutes, setTimeMinutes] = useState(23);

    return(
        <div className="w-full h-screen p-4 bg-white flex flex-col items-center justify-center gap-8 rounded-xl shadow-sm border border-gray-100">
            {/* <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Sélection de durée</h2>
                <DurationPicker 
                    hours={hours}
                    minutes={minutes}
                    onHoursChange={setHours}
                    onMinutesChange={setMinutes}
                />
            </div> */}
            {/* <StepIndicator /> */}
            <FilterDiscloture />

            

            {/* <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Sélection de date</h2>
                <DateSelector label="Sélectionner une date" date={date} setSelectedDate={setDate} />
            </div> */}
        </div>
    )
}

export default Test;