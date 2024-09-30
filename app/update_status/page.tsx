/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Cam from "@/components/ui/utils/webcam_stream"
export default function Product() {
 return (
  <div>
    <h1 className="font-bold text-black mb-4 mt-8 text-center text-4xl md:text-6xl">Take a Picture of Your Machine</h1>
    <Cam />
  </div>
 );
}