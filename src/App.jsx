import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const colorMap = {
  0: "#000000",
  1: "#090974",
  2: "#135f35",
  3: "#27eef0",
  4: "#a81618",
  5: "#d047e8",
  6: "#c56e1b",
  7: "#ffffff",
  8: "#827f7f",
  9: "#0202ef",
  A: "#17f527",
  B: "#d7f6f7",
  C: "#d4514a",
  D: "#f1a8ee",
  E: "#eff05f",
  F: "#f8fbf9",
};

const App = () => {
  const initialHeader =
    "Microsoft Windows [Version 10.0.19041.685]\n(c) 2024 Microsoft Corporation. All rights reserved.\n\nWelcome to Commandfolio Version 1.0.0 by Erick Matheus\n\n";

  const [input, setInput] = useState("");
  const [lines, setLines] = useState([{ type: "output", text: initialHeader }]);

  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState([]);

  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [foregroundColor, setForegroundColor] = useState("#ffffff");

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    document.body.style.backgroundColor = backgroundColor;
    if (inputRef.current) inputRef.current.style.color = foregroundColor;
  }, [backgroundColor, foregroundColor]);

  useEffect(() => {
    toggleCursorBlinking();
  }, [input]);

  const toggleCursorBlinking = () => {
    inputRef.current?.value
      ? (inputRef.current.className = "")
      : (inputRef.current.className = "blinking-cursor");
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const executeCommand = (input) => {
    setCommandHistory([...commandHistory, input]);
    setHistoryIndex(commandHistory.length);

    const parts = input.trim().split(/\s+/); // Split input into parts by whitespace
    const mainCommand = parts[0].toLowerCase(); // Main command is the first part
    const argument = parts.slice(1).join(" "); // Join the rest as argument

    let outputLines = [`C:\\Users\\rckmath>${input}`];

    switch (mainCommand) {
      case "cls":
        setLines([]); // Clears the screen
        return;
      case "color":
        if (/^[0-9A-Fa-f]{2}$/.test(argument)) {
          changeBackgroundColor(argument);
          outputLines.push(`Background color changed to ${argument}`);
        } else {
          outputLines.push('Invalid color code. Use the format "color 0A"');
        }
        break;
      case "bio":
        outputLines.push("My biography soon...");
        break;
      case "skills":
        outputLines.push("My skills soon...");
        break;
      case "help":
        outputLines.push(
          "Available commands: cls, color, bio, skills, help, time, date, dir, cd, exit, echo, ver"
        );
        break;
      case "time":
        const time = new Date().toLocaleTimeString();
        outputLines.push(`The current time is ${time}`);
        break;
      case "date":
        const date = new Date().toLocaleDateString();
        outputLines.push(`Today's date is ${date}`);
        break;
      case "dir":
        outputLines.push(
          "Directory of C:\\Users\\rckmath\\commandfolio",
          "\nskills.exe",
          "steam_account_password.txt"
        );
        break;
      case "cd":
        outputLines.push(`Changed directory to ${argument}`);
        break;
      case "exit":
        window.close();
        break;
      case "echo":
        outputLines.push(argument);
        break;
      case "ver":
        outputLines.push("Commandfolio Version 1.0.0 by Erick Matheus");
        break;
      default:
        outputLines.push(
          `'${mainCommand}' is not recognized as an internal or external command, operable program, or batch file.`
        );
        break;
    }

    const newLines = [
      ...lines,
      ...outputLines.map((text) => ({ type: "output", text })),
      { type: "output", text: "\n" },
    ];

    setLines(newLines);
    setCommandHistory([...commandHistory, input]);
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

    setBackgroundColor(newBackgroundColor);
    setForegroundColor(newForegroundColor);
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

      console.log(newIndex, commandHistory.length);

      if (commandHistory[newIndex]) {
        setInput(commandHistory[newIndex]);
        inputRef.current.value = commandHistory[newIndex];
        setHistoryIndex(newIndex);
      } else if (newIndex >= commandHistory.length) {
        console.log("alou");
        setInput("");
        setHistoryIndex(commandHistory.length);
      }
    }
  };

  return (
    <div
      className="cmd-container"
      ref={containerRef}
      style={{ backgroundColor, color: foregroundColor }}
    >
      {lines.map((line, index) => (
        <div
          key={index}
          style={{ color: foregroundColor }}
          className={line.type === "command" ? "input-line" : "output-line"}
        >
          {line.text}
        </div>
      ))}
      <div className="input-line">
        <span style={{ color: foregroundColor }}>C:\Users\rckmath&gt;</span>
        <div className="input-wrapper">
          <input
            type="text"
            value={input}
            ref={inputRef}
            placeholder="_"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="blinking-cursor"
            style={{ color: foregroundColor, backgroundColor }} 
          />
        </div>
      </div>
    </div>
  );
};

export default App;
