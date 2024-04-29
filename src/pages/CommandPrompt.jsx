import React, { useState, useEffect, useRef, Fragment } from "react";
import Box from "@mui/material/Box";

import useWindowSize from "../hooks/UseWindowSize";

import Commands from "../components/Commands";
import CommandInput from "../components/CommandInput";
import SimpleText from "../components/base/SimpleText";
import InitialHeader from "../components/InitialHeader";
import CommandDisplay from "../components/CommandDisplay";

import { colorMap } from "../configs/mappings";

const CommandPrompt = () => {
  const [lines, setLines] = useState([{ type: "output", element: <InitialHeader /> }]);

  const [currentPath, setCurrentPath] = useState("C:\\Users\\rckmath");

  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [foregroundColor, setForegroundColor] = useState("#ffffff");

  const containerRef = useRef(null);
  const { height } = useWindowSize();

  const cls = () => {
    setLines([]);
  };

  const onCommandExecution = (commandInput) => {
    let [mainCommand, ...args] = commandInput.trim().split(/\s+/);
    mainCommand = mainCommand.toLowerCase();
    const argument = args.join(" ");
    let component = <Fragment />;

    if (mainCommand === "cls") return cls();

    const commandFn = Commands[mainCommand];

    if (!commandFn) {
      component = (
        <SimpleText
          content={`'${mainCommand}' is not recognized as an internal or external command, operable program, or batch file.\nType and enter 'help' for the command list.`}
        />
      );
    } else {
      component = commandFn(argument, currentPath, setCurrentPath, changeBackgroundColor);
    }

    setLines([
      ...lines,
      { type: "command", element: <Fragment>{currentPath + ">" + commandInput}</Fragment> },
      { type: "output", element: <CommandDisplay key={Date.now()}>{component}</CommandDisplay> },
      { type: "output", element: <br /> },
    ]);
  };

  const changeBackgroundColor = (colorCode) => {
    const newBackgroundColor = colorMap[colorCode[0].toUpperCase()];
    const newForegroundColor = colorMap[colorCode[1].toUpperCase()];

    if (newBackgroundColor === newForegroundColor) return false;

    setBackgroundColor(newBackgroundColor);
    setForegroundColor(newForegroundColor);

    return true;
  };

  useEffect(() => {
    if (containerRef.current) {
      const { scrollHeight, clientHeight } = containerRef.current;
      containerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [lines]);

  return (
    <>
      <Box
        ref={containerRef}
        className="cmd-container"
        sx={{ backgroundColor, color: foregroundColor, maxHeight: height }}
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
        <CommandInput
          currentPath={currentPath}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          onCommandExecution={onCommandExecution}
        />
      </Box>
    </>
  );
};

export default CommandPrompt;
