import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
export async function GET() {
    const supabase = createClient(); 
    const data = await supabase.from('laundry_machines').select("*");

    function timeDifferenceInMinutes(time1: string, time2: string) {
        // Convert HH:MM:SS string to seconds

        function convertTimeToSeconds(timeString: string) {
          const [hours, minutes, seconds] = timeString.split(':').map(Number);
          return hours * 3600 + minutes * 60 + seconds;
        }
      
        // Convert the times to seconds
        const seconds1 = convertTimeToSeconds(time1);
        const seconds2 = convertTimeToSeconds(time2);
      
        // Calculate the absolute difference in seconds
        const timeDifferenceInSeconds = Math.abs(seconds1 - seconds2);
      
        // Convert the difference to minutes
        const differenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
      
        return differenceInMinutes;
      }
      
    //   // Example usage:
    //   const storedTime = "01:22:52";  // Stored in Supabase
    //   const currentTime = new Date().toTimeString().split(' ')[0];  // Current time in HH:MM:SS format
      
    //   const difference = timeDifferenceInMinutes(storedTime, currentTime);
    //   console.log(`Time difference: ${difference} minutes`);

    for(let i = 0; i < data!.data!.length; i++){
        const machine = data!.data![i];
        const now = new Date().toTimeString().split(' ')[0]


        if(machine.remaining_time > 0){
            const remaining_time =   machine.remaining_time -  timeDifferenceInMinutes(now, machine.time_start) ;
            console.log(remaining_time,machine.remaining_time);


            const availability =  remaining_time > 0 ? false: true;
            const rem_time = remaining_time < 0 ? 0 : remaining_time;
            const status =  availability ? "available" : "in_use";
            const time_start =  availability ? null : machine.time_start;


            const machine_update_data = {
                remaining_time: rem_time,
                status: status,
                time_start: time_start
            }
            
            if (machine.remaining_time !== remaining_time){
                const {data,error} = await supabase.from('laundry_machines').update(machine_update_data).eq('serial_number', machine.serial_number);
                if(error !== null){
                    throw error
                }
                console.log(data);
            }
           // const {data,error} = await supabase.from('laundry_machines').update(machine_update_data).eq('serial_number', machine.serial_number);
            // if(error !== null){
            //     throw error
            // }
            
            
        }
    }


    return NextResponse.json(data,{status:200});
}