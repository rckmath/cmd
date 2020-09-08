import React, { useRef } from 'react';


const Input = () => {
  const input = useRef(null);

  const toggleBlink = () => {
    input.current.value
      ? input.current.className = "input"
      : input.current.className = "input blink"
  }

  const handleSubmit = (event) => {
    if (event.key === 'Enter') { console.log('Kamehameha') }
  }

  return (
    <div>
      <label htmlFor="input">C:\Users\erick{'>'}</label>
      <input
        className="input blink"
        id="input"
        key="input"
        ref={ input }
        autoComplete="false"
        autoFocus
        type="text"
        placeholder="_"
        onChange={ toggleBlink }
        onKeyPress={ handleSubmit }
      />
    </div>
  )
}

export default Input;