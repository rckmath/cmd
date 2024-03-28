import React, { useState, useEffect, useRef } from "react";
import "./App.css";

import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import useWindowSize from "./hooks/UseWindowSize";

import SimpleTable from "./components/SimpleTable";
import ResumeModal from "./components/ResumeModal";

const commandDescriptions = {
  cd: 'Changes the directory. Usage: "cd [directory]" to navigate to a specific directory, or "cd .." to move up one directory level.',
  color: 'Changes the console foreground and background colors. Usage: "color [attr]" where attr is the color hex.',
  cls: "Clears the console screen of all previously entered commands and outputs.",
  help: 'Displays help information for available commands. Usage: "help" to list all commands.',
  exit: "Closes the command line interface.",
  about: "Displays information about the portfolio owner.",
  projects: "Lists all the projects in the portfolio.",
  contact: "Provides contact information.",
  skills: "Lists the skills and technologies the owner is proficient in.",
  time: "Displays the current system time.",
  date: "Displays the current system date.",
  resume: "Displays the resume (curriculum vitae) of the portfolio owner.",
  dir: "Displays the current directory and its content.",
  ver: 'Displays the "commandfolio" version number.',
  echo: 'Displays messages. Usage: "echo [message]" where message could be any text.',
  open: 'It opens the specified website. Usage: "open [url]" where url could be any valid URL like "google.com".',
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
      newPath = newPath.endsWith("\\") ? `${newPath}${argument}` : `${newPath}\\${argument}`;
    }
    setCurrentPath(newPath);
    return <></>;
  },
  color: (argument, _currentPath, _setCurrentPath, changeBackgroundColor) => {
    if (/^[0-9A-Fa-f]{2}$/.test(argument) && changeBackgroundColor(argument)) {
      return <>{`Background color changed to ${argument}`}</>;
    } else {
      return <>{'Invalid color code combination. Use the format "color 0A"'}</>;
    }
  },
  cls: (_argument, _currentPath, _setCurrentPath, _changeBackgroundColor, setLines) => setLines([]),
  help: () => {
    const rows = [];

    Object.entries(commandDescriptions).forEach(([command, description]) => {
      rows.push(
        <>
          <td>{command}</td>
          <td>{description}</td>
        </>
      );
    });

    return (
      <SimpleTable>
        {rows.map((r, i) => (
          <tr key={i}>{r}</tr>
        ))}
      </SimpleTable>
    );
  },
  exit: () => {
    const res = window.confirm("Do you really want to exit? :(");
    if (res) window.close();
    return <></>;
  },
  projects: () => <>W.I.P.</>,
  contact: () => <>W.I.P.</>,
  resume: (_argument, _currentPath, _setCurrentPath, _changeBackgroundColor, _setLines, setDisplayResume) => {
    setDisplayResume(true);
    return <></>;
  },
  about: () => <>W.I.P.</>,
  skills: () => <>W.I.P.</>,
  time: () => {
    const time = new Date().toLocaleTimeString();
    return <>{`The current time is ${time}`}</>;
  },
  date: () => {
    const date = new Date().toLocaleDateString();
    return <>{`Today's date is ${date}`}</>;
  },
  dir: (_argument, currentPath) => <>{`\nDirectory of ${currentPath}\n\nskills.exe\nsteam_account_password.txt`}</>,
  ver: () => <>Commandfolio Version 1.0.0 by Erick Matheus</>,
  echo: (argument) => <>{argument}</>,
  open: (argument) => {
    let url = argument;
    let commandOutput = <>Invalid URL</>;

    if (!url.includes("https://")) url = "https://" + url;

    const valid = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g.test(url);

    if (valid) {
      commandOutput = <></>;
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
  const theme = createTheme({
    typography: {
      allVariants: { fontFamily: "Consolas monospace" },
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
