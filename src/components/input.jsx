import React, { useRef } from 'react';


const Input = () => {
  const input = useRef(null);

  const handleInputChange = (text) => {
    input.current.value
      ? input.current.className = "input"
      : input.current.className = "input blink"
  }

  const handleSubmit = (event) =>{
    if (event.key === 'Enter') { console.log('Kamehameha') }
  }

  return (
    <div className="form">
      <label htmlFor="input">C:\Users\erick{'>'}</label>
      <input
        ref={ input }
        autoFocus
        type="text"
        id="input"
        key="input"
        placeholder="_"
        className="input blink"
        onKeyPress={ handleSubmit }
        onChange={ handleInputChange }
      />
    </div>
  )
}

export default Input;