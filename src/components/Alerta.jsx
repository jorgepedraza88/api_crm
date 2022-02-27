import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className='text-center text-sm my-2 text-red-500 font-semibold p-3'>
        {`* ${children}`}
    </div>
  )
}

export default Alerta