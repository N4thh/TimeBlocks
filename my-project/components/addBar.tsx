'use client'
import { useState } from "react"

export default function AddBar() {
  const [open, setOpen] = useState(false)
  const [hour, setHours] = useState(0)

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState ({
    totalHours: 0, 
    title: ''
  });

const min = 0, max= 24, step =0.5; 
const increase = () => {
  setHours(h => {
    const val = Math.min(max, +(h + step).toFixed(1));
    setFormData(prev => ({ ...prev, totalHours: val }));
    return val;
  });
};

const decrease = () => {
  setHours(h => {
    const val = Math.max(min, +(h - step).toFixed(1));
    setFormData(prev => ({ ...prev, totalHours: val }));
    return val;
  });
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('')
    setSuccess('')

    try{
      const responese = await fetch("/api/bars", {
        method: 'POST',
        headers: {'Content-Type' : 'application'},
        body: JSON.stringify(formData)
      }); 

      const data = await responese.json(); 
      if(!responese.ok){
        setError(data.message || "Something went wrong");
        return; 
      }

      setSuccess("Creating new block successfully~")
      setFormData ({
        title: '',
        totalHours: 0
      })

    }catch(err){
      console.error("Have an error when creating new bar: ", err)
      setError("Something went wrong")
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
      const {name, value} = e.target; 
    setFormData(prev => ({
      ...prev, 
      [name] : value
    }));
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
                <div className = "flex items-center p-2 gap-1">
                    <label> Hours</label>
                    {/* button */}   
                        <button onClick={decrease}
                        disabled = {hour <= min}
                        className="ml-2 px-3 py-1 border rounded disabled:opacity-40">
                            -
                        </button>
                        
                        <input 
                        className="w-1/2 text-center border rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        name="hour"
                        value={formData.totalHours}
                        type="number"
                        onChange={(e) => {
                            const val = Number(e.target.value); 
                            if (val >= min && val <= max) { 
                                setHours(val); 
                                handleChange(e);
                            }
                        }}
                    />

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
                    className="border w-full rounded-2xl px-3 py-2"
                    type="text"
                    value={formData.title}
                    name = "title"
                    onChange={handleChange}
                   />
                </div>



            {/* close button */}
            <div className=" flex mt-auto p-2 justify-between">
              <button className="rounded p-2 bg-red-500"
              onClick={() => {
              setOpen(false)
              setHours(0)
              setSuccess('')
              setError('')
              }}>
                  Close
              </button>

              <button className="rounded p-2 bg-green-500"
              onClick= {(e) => {
              handleSubmit(e)}}
              > Submit</button>              
            </div>
            
            <div>
                {success && (
                        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                            {success}
                        </div>
                )}  
                {error && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                )}
            </div>
                          

          </div>

        </div>
      )}
    </>
  )
}
