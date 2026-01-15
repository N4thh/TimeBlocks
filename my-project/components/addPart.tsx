import React from 'react'
interface BarItem{ 
    barId: number
}

const AddPart = ({barId}: BarItem) => {
  return (
    <div className='absolute'>
        addPart {barId}</div>
  )
}

export default AddPart