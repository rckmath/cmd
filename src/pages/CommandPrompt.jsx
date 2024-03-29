import React, { useState, useEffect, useRef } from "react";

import useWindowSize from "../hooks/UseWindowSize";

import ResumeModal from "../components/ResumeModal";
import InitialHeader from "../components/InitialHeader";
import DisplayCommand from "../components/DisplayCommand";

import { colorMap } from "../configs/mappings";

const CommandPrompt = () => {
  const [input, setInput] = useState("");
  const [displayResume, setDisplayResume] = useState(false);
  const [lines, setLines] = useState([{ type: "output", element: <InitialHeader /> }]);

  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentPath, setCurrentPath] = useState("C:\\Users\\rckmath");

  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [foregroundColor, setForegroundColor] = useState("#ffffff");

  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const { height } = useWindowSize();

  const toggleCursorBlinking = () => {
    inputRef.current?.value ? (inputRef.current.className = "") : (inputRef.current.className = "blinking-cursor");
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const onCommandExecution = (commandInput) => {
    setCommandHistory([...commandHistory, commandInput]);
    setHistoryIndex(commandHistory.length);

    setLines([
      ...lines,
      { type: "command", element: <>{currentPath + ">" + commandInput}</> },
      {
        type: "output",
        element: (
          <DisplayCommand
            setLines={setLines}
            currentPath={currentPath}
            commandInput={commandInput}
            setCurrentPath={setCurrentPath}
            setDisplayResume={setDisplayResume}
            changeBackgroundColor={changeBackgroundColor}
          />
        ),
      },
      { type: "output", element: <br /> },
    ]);

    setCommandHistory([...commandHistory, commandInput]);
    setHistoryIndex(commandHistory.length);
    setInput("");
  };

  const changeBackgroundColor = (colorCode) => {
    if (!/^[0-9A-Fa-f]{2}$/.test(colorCode)) {
      console.error("Invalid color code.");
      return;
    }

    const newBackgroundColor = colorMap[colorCode[0].toUpperCase()];
    const newForegroundColor = colorMap[colorCode[1].toUpperCase()];

    if (newBackgroundColor === newForegroundColor) return false;

    setBackgroundColor(newBackgroundColor);
    setForegroundColor(newForegroundColor);

    return true;
  };

  const handleKeyDown = (e) => {
    const { keyCode } = e;
    if (keyCode === 13) {
      // Enter key
      if (input.trim()) {
        onCommandExecution(input);
        setInput("");
        inputRef.current.value = "";
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
    if (containerRef.current) {
      const { scrollHeight, clientHeight } = containerRef.current;
      containerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [lines]);

  useEffect(() => {
    inputRef.current.focus();
    document.body.style.backgroundColor = backgroundColor;
    if (inputRef.current) inputRef.current.style.color = foregroundColor;
  }, [backgroundColor, foregroundColor]);

  return (
    <>
      <div
        ref={containerRef}
        className="cmd-container"
        style={{ backgroundColor, color: foregroundColor, maxHeight: height }}
      >
        {lines.map((line, index) => (
          <div
            key={index}
            style={{ color: foregroundColor }}
            className={line.type === "command" ? "input-line" : "output-line"}
          >
            {line.element}
          </div>
        ))}
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
      </div>
      <ResumeModal open={displayResume} setOpen={setDisplayResume} />
    </>
  );
};

export default CommandPrompt;
