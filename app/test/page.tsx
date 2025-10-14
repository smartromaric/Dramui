"use client"
import { DateSelector } from "../components/DateSelector"
import { DurationPicker } from "../components/DurationPicker"
import { TimePicker } from "../components/TimePicker"
import { useState,useTransition,useActionState } from "react";
import StepIndicator from "../components/StepIndicator";
import FilterDiscloture from "../components/FilterDiscloture";
import FeatureTour from "../components/FeatureTour";
import SetStatus from "../components/SetStatus";
import EditBadge from "../components/EditBadge";
import InlineOverflow from "../components/InlineOverflow";

const Test =()=>{
    const [date, setDate] = useState<Date | null>(null);
    const [hours, setHours] = useState(17);
    const [minutes, setMinutes] = useState(23);
    const [timeHours, setTimeHours] = useState(12);
    const [timeMinutes, setTimeMinutes] = useState(23);
    const [showTour, setShowTour] = useState(true);
    const [name, setName] = useState('');
    // const [isPending, startTransition] = useTransition();

    const [error, SubmitAction, pending] = useActionState(async(prevState: string, NewName: string) => {
        const result = await SubmitSimulation(NewName);
        return result;
    }, '');


    // const HandleSubmit = () =>{
    //     startTransition(async () => {
    //       // Simuler une opération asynchrone
    //       await new Promise((resolve) => setTimeout(resolve, 3000));
    //       alert("Submitted successfully!");
    //     });
    // }
    const SubmitSimulation = async (name: string) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        if(name === ""){
            return 'Le nom est requis'
        }
        return ''  // Pas d'erreur si succès
    }

    const HandleSubmit = () =>{
        SubmitAction(name);
    }

    return(
        <div className="w-full h-screen p-4 bg-white flex flex-col items-center justify-center gap-8">
            <div className="flex flex-col gap-2">
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 px-4 py-2 rounded-lg"
                    placeholder="Entrez votre nom"
                />
                <button 
                    onClick={HandleSubmit}
                    disabled={pending}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        pending 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                >
                    {pending ? "Submitting..." : "Submit"}
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            {/* <button 
                onClick={() => setShowTour(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
                Ouvrir le Feature Tour
            </button> */}
            {/* <SetStatus /> */}
            {/* <EditBadge /> */}
            {/* <InlineOverflow /> */}
            {/* {showTour && <FeatureTour onClose={() => setShowTour(false)} />} */}

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
            {/* <FilterDiscloture /> */}

                

            {/* <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Sélection de date</h2>
                <DateSelector label="Sélectionner une date" date={date} setSelectedDate={setDate} />
            </div> */}


            

        </div>
    )
}

export default Test;