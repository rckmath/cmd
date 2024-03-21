import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const commandDescriptions = {
  cd: 'Changes the directory. Usage: "cd [directory]" to navigate to a specific directory, or "cd .." to move up one directory level.',
  color:
    'It changes the console foreground and background colors. Usage: "color [attr]" where attr specifies the color attribute of console output.',
  cls: "Clears the console screen of all previously entered commands and outputs.",
  help: 'Displays help information for available commands. Usage: "help" to list all commands, "help [command]" for detailed information about a specific command.',
  exit: "Closes the command line interface.",
  about: "Displays information about the portfolio owner.",
  projects: "Lists all the projects in the portfolio.",
  contact: "Provides contact information.",
  skills: "Lists the skills and technologies the owner is proficient in.",
  time: "Displays the current system time.",
  date: "Displays the current system date.",
  resume: "Displays the resume of the portfolio owner.",
  dir: "Displays the current directory and its content.",
  ver: "Displays the commandfolio version number.",
  echo: 'Displays messages. Usage: "echo [<message>]" where message could be any text.',
  open: 'It opens the specified website. Usage: "open [<url>]" where url could be any valid URL like "google.com".',
};

const commandFunctions = {
  cd: (argument, currentPath, setCurrentPath) => {
    let newPath = currentPath;
    if (argument === "..") {
      const pathParts = newPath.split("\\").filter(Boolean);
      if (pathParts.length > 1) {
        // Ensure not at root
        pathParts.pop();
        newPath = pathParts.join("\\");
        if (newPath.length > 2) newPath = newPath + "\\"; // Add back the trailing slash unless at root
      }
    } else if (argument && argument !== ".") {
      newPath = newPath.endsWith("\\")
        ? `${newPath}${argument}`
        : `${newPath}\\${argument}`;
    }
    setCurrentPath(newPath);
    return "";
  },
  color: (argument, _currentPath, _setCurrentPath, changeBackgroundColor) => {
    if (/^[0-9A-Fa-f]{2}$/.test(argument)) {
      changeBackgroundColor(argument);
      return `Background color changed to ${argument}`;
    } else {
      return 'Invalid color code. Use the format "color 0A"';
    }
  },
  cls: (
    _argument,
    _currentPath,
    _setCurrentPath,
    _changeBackgroundColor,
    setLines
  ) => {
    setLines([]);
  },
  help: () => {
    return Object.entries(commandDescriptions)
      .map(([command, description]) => `${command}: ${description}`)
      .join("\n");
  },
  exit: () => {
    const res = window.confirm("Do you really want to exit? :(");
    if (res) window.close();
    return "";
  },
  projects: () => "W.I.P.",
  contact: () => "W.I.P.",
  resume: () => "W.I.P.",
  about: () => "W.I.P.",
  skills: () => "W.I.P.",
  time: () => {
    const time = new Date().toLocaleTimeString();
    return `The current time is ${time}`;
  },
  date: () => {
    const date = new Date().toLocaleDateString();
    return `Today's date is ${date}`;
  },
  dir: (_argument, currentPath) =>
    `\nDirectory of ${currentPath}\n\nskills.exe\nsteam_account_password.txt`,
  ver: () => "Commandfolio Version 1.0.0 by Erick Matheus",
  echo: (argument) => argument,
  open: (argument) => {
    let url = argument;
    let commandOutput = "Invalid URL";

    if (!url.includes("https://")) url = "https://" + url;

    const valid =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g.test(
        url
      );

    if (valid) {
      commandOutput = "";
      window.open(url);
    }

    return commandOutput;
  },
};

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
  const [currentPath, setCurrentPath] = useState("C:\\Users\\rckmath");

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

  const executeCommand = (commandInput) => {
    let commandOutput = "";

    setCommandHistory([...commandHistory, commandInput]);
    setHistoryIndex(commandHistory.length);

    const [mainCommand, ...args] = commandInput.trim().split(/\s+/);
    const argument = args.join(" "); // Combine arguments back into a string if necessary

    commandOutput += commandFunctions[mainCommand.toLowerCase()]
      ? commandFunctions[mainCommand.toLowerCase()](
          argument,
          currentPath,
          setCurrentPath,
          changeBackgroundColor,
          setLines
        )
      : `'${mainCommand}' is not recognized as an internal or external command, operable program, or batch file.`;

    if (mainCommand.toLowerCase() !== "cls") {
      setLines([
        ...lines,
        { type: "command", text: currentPath + ">" + commandInput },
        { type: "output", text: commandOutput },
        { type: "output", text: "\n" },
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
  );
};

export default App;
