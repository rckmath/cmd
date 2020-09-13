import React, { useRef, useEffect, useCallback } from 'react';

const Input = ({ submit }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [submit]);

  const toggleBlink = () => {
    inputRef.current?.value
      ? inputRef.current.className = "input"
      : inputRef.current.className = "input blink"
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (inputRef.current?.value) { inputRef.current.disabled = true };
    submit(inputRef.current?.value.toLowerCase());
  }, [submit]);

  return (
    <div>
      <form onSubmit={ handleSubmit } autoComplete="off">
        <label htmlFor="input">C:\Users\erick{'>'}</label>
        <input
          className="input blink"
          id="input"
          key="input"
          ref={ inputRef }
          type="text"
          placeholder="_"
          onChange={ toggleBlink }
        />
      </form>
    </div>
  )
}

export default Input;