import React from 'react';

export default () =>
  <div className="form">
    <form action="#">
      <label for="input">C:\Users\erick{'>'}</label>
      <input
        autoFocus
        type="text"
        id="input"
        className="input blink_me"
        defaultValue="_"
      />
    </form>
  </div>