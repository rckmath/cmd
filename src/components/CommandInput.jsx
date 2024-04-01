import React, { useState, useEffect, useRef } from "react";

const CommandInput = ({ backgroundColor, foregroundColor, currentPath, onCommandExecution }) => {
  const inputRef = useRef(null);

  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState([]);

  const toggleCursorBlinking = () => {
    inputRef.current?.value ? (inputRef.current.className = "") : (inputRef.current.className = "blinking-cursor");
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    const { keyCode } = e;
    if (keyCode === 13) {
      // Enter key
      if (input.trim()) {
        onCommandExecution(input);

        setInput("");
        setCommandHistory([...commandHistory, input]);
        setHistoryIndex(commandHistory.length);
      }
    } else if (keyCode === 38) {
      // Up arrow key
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, 0);
      if (commandHistory[newIndex]) {
        setInput(commandHistory[newIndex]);
        inputRef.current.value = commandHistory[newIndex];
        setHistoryIndex(newIndex);
      }
    } else if (keyCode === 40) {
      // Down arrow key
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);

      if (commandHistory[newIndex]) {
        setInput(commandHistory[newIndex]);
        inputRef.current.value = commandHistory[newIndex];
        setHistoryIndex(newIndex);
      } else if (newIndex >= commandHistory.length) {
        setInput("");
        setHistoryIndex(commandHistory.length);
      }
    }
  };

  useEffect(toggleCursorBlinking, [input]);

  useEffect(() => {
    inputRef.current.focus();
    document.body.style.backgroundColor = backgroundColor;
    if (inputRef.current) inputRef.current.style.color = foregroundColor;
  }, [backgroundColor, foregroundColor]);

  return (
    <div className="input-line">
      <span style={{ color: foregroundColor }}>{currentPath}&gt;</span>
      <div className="input-wrapper">
        <input
          type="text"
          value={input}
          ref={inputRef}
          placeholder="_"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="blinking-cursor"
          style={{ backgroundColor, color: foregroundColor }}
        />
      </div>
    </div>
  );
};

export default React.memo(CommandInput);
