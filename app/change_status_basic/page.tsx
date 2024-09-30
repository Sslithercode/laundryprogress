'use client'
import { useState } from "react"

export default function ChangeStatus() {
    const [time, setTime] = useState<string>("");
    const [machine_number, setMachineNumber] = useState<string>("");

    const submitTime = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WASH_API_URL}/machines/${machine_number}/start_wash`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                minutes: parseInt(time),
              }),
            }
          )
        const data = await response.json();
        console.log(data);
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">


        <h1 className="text-4xl font-bold mb-4">Change Status</h1>
        <form className="flex flex-col items-center justify-center">
            <label htmlFor="time" className="text-xl font-bold mb-2">Time:</label>
            <input className="border border-gray-300 rounded-md py-2 px-3 mb-4" type="number" id="time" value={time} onChange={(e) => e.target.value?setTime(e.target.value):null} />
            <label htmlFor="machine_number" className="text-xl font-bold mb-2">Machine Number:</label>
            <input className="border border-gray-300 rounded-md py-2 px-3 mb-4" type="number" id="machine_number" value={machine_number} onChange={(e) => setMachineNumber(e.target.value)} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={(e) => { e.preventDefault();submitTime();}}>Submit</button>
        </form>

        </div>

    );

}