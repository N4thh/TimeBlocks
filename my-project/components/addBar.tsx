'use client'
import { useState } from "react"

export default function AddBar() {
  const [open, setOpen] = useState(false)
  const [hour, setHours] = useState(0)

  const min = 0, max= 24, step =0.5; 
  const increase = () =>{
    setHours( h => Math.min(max, + (h + step).toFixed(1)));
  }
  const decrease = () =>{
    setHours( h=> Math.max(min, + (h - step).toFixed(1)));
  }


  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-2 bg-blue-600 text-white rounded  "
      >
        Open
      </button>

      {open && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 rounded-2xl">

          <div className="bg-white rounded-xl w-[80%] h-[80%] p-5 flex flex-col">
                {/* hours */}
                <div className = "flex items-center">
                    <label> Hours</label>
                    {/* button */}
                   
                        <button onClick={decrease}
                        disabled = {hour <= min}
                        className="ml-2 px-3 py-1 border rounded disabled:opacity-40">
                            -
                        </button>
                        
                        <span className="w-1/2 text-center">{hour}</span>

                        <button onClick={increase}
                        disabled = {hour >= max}
                        className="px-3 py-1 border rounded disabled:opacity-40">
                            +
                        </button>                        
                </div>
         
                {/* title */}
                <div className=" mt-[2vh] flex items-center gap-4 p-2">
                    <label>Title</label>
                    <input placeholder="Enter tilte"
                    className="border w-full rounded-2xl px-3 py-2"/>
                </div>



            {/* close button */}
            <button className="ml-auto mt-auto rounded p-2 bg-red-500"
            onClick={() => {
             setOpen(false)
             setHours(0)}}>
                 Close
            </button>


          </div>

        </div>
      )}
    </>
  )
}
