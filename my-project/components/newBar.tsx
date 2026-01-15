'use client'

import React, { useEffect, useState } from 'react'
import AddPart from './addPart';

interface BarItem{ 
    id: number; 
    title: string; 
    totalHours: number; 
    createAt: string;
}

export const NewBar = () => {
  const [data, setData] = useState<BarItem[]> ([])
  const [activeBarId, setActiveBarId] = useState<number | null>(null)

  useEffect(() =>{
    async function fetchData (){
        try{
            const response = await fetch ('/api/bars',{
                method: 'GET'
            });
            
            const result = await response.json(); 
            const bar = result.data || result; 

            setData(bar); 
        }catch(err){
            console.error("Error fetching bars: ", err)
        }
    }
    fetchData();        
  }, []);

   if (data.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Chưa có TimeBlock nào. Hãy thêm mới!
      </div>
    );
  }

  return (
    <div>
      {data.map((item) =>{
          return(
            <div key={item.id}
            className='relative'>
                 <div className='mt-3'>

                  <label>{item.title}</label>
                  
                  <div className='border rounded-xs h-[5vh]'
                    style={{width: `${item.totalHours * 10}vh`}}
                    onClick={() => setActiveBarId( activeBarId === item.id ? null : item.id )} 
                    >
                  </div>
                </div> 

              {activeBarId == item.id && (
                <div className='absolute top-0 right-0'>
                  <AddPart barId={item.id} />
                </div>
              )}

            </div>

          );

      })}
    </div>
  )
}

export default NewBar;