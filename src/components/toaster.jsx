import React from 'react'
import '../styles/toaster.css'
const Toaster = ({ message }) => {

  return (
    <div className='toaster'>
      {message}
    </div>
  )
}

export default Toaster