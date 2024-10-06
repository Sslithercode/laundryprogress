import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
export async function POST(req: Request) {
    const supabase = createClient(); 
    const body = await req.json(); 
    const currentTimeStamp = new Date().toTimeString().split(' ')[0]
    const {data, error} = await supabase.from('laundry_machines').update({
        remaining_time: body.remaining_time,
        time_start: currentTimeStamp

    }).eq('serial_number', body.serial_number)
    if( error !== null){
        throw error
    }


    return NextResponse.json(data,{status:200})
}