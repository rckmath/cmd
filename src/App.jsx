import React, { useState, useEffect, useRef } from "react";
import "./App.css";

import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import useWindowSize from "./hooks/UseWindowSize";

import ResumeModal from "./components/ResumeModal";

import { colorMap } from "./utils/colors";
import { commandFunctions } from "./core/Commands";

const App = () => {
  const theme = createTheme({
    typography: {
      allVariants: { fontFamily: "Consolas" },
    },
  });

  const initialHeader = (
    <Typography>
      {"Microsoft Windows [Version 10.0.19041.685]\n"}
      {"(c) 2024 Microsoft Corporation. All rights reserved.\n"}
      {"Welcome to Commandfolio v1.0.0 by Erick Matheus\n\n"}
    </Typography>
  );

  const [input, setInput] = useState("");
  const [displayResume, setDisplayResume] = useState(false);
  const [lines, setLines] = useState([{ type: "output", element: initialHeader }]);

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

  const executeCommand = (commandInput) => {
    let commandOutput = <></>;

    setCommandHistory([...commandHistory, commandInput]);
    setHistoryIndex(commandHistory.length);

    const [mainCommand, ...args] = commandInput.trim().split(/\s+/);
    const argument = args.join(" "); // Combine arguments back into a string if necessary

    commandOutput = commandFunctions[mainCommand.toLowerCase()] ? (
      commandFunctions[mainCommand.toLowerCase()](
        argument,
        currentPath,
        setCurrentPath,
        changeBackgroundColor,
        setLines,
        setDisplayResume
      )
    ) : (
      <>{`'${mainCommand}' is not recognized as an internal or external command, operable program, or batch file.\nType and enter 'help' for the command list.`}</>
    );

    if (mainCommand.toLowerCase() !== "cls") {
      setLines([
        ...lines,
        { type: "command", element: <>{currentPath + ">" + commandInput}</> },
        { type: "output", element: commandOutput },
        { type: "output", element: <br /> },
      ]);
    }

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
        executeCommand(input);
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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default App;
