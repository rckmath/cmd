import React, { useState, useEffect } from "react";

import Fragment from "./base/Fragment";
import SimpleText from "./base/SimpleText";
import SimpleTable from "./base/SimpleTable";

import { commandDescriptionMap } from "../configs/mappings";

const commandFunctions = {
  cd: (argument, currentPath, setCurrentPath) => {
    let newPath = currentPath;
    if (argument === "..") {
      const pathParts = newPath.split("\\").filter(Boolean);
      if (pathParts.length > 1) {
        pathParts.pop();
        newPath = pathParts.join("\\");
        if (newPath.length > 2) newPath = newPath + "\\";
      }
    } else if (argument && argument !== ".") {
      newPath = newPath.endsWith("\\") ? `${newPath}${argument}` : `${newPath}\\${argument}`;
    }

    setCurrentPath(newPath);

    return <Fragment />;
  },
  color: (argument, _currentPath, _setCurrentPath, changeBackgroundColor) => {
    if (/^[0-9A-Fa-f]{2}$/.test(argument) && changeBackgroundColor(argument)) {
      return <SimpleText content={`Background color changed to ${argument}`} />;
    } else {
      return <SimpleText content={'Invalid color code combination. Use the format "color 0A"'} />;
    }
  },
  cls: (_argument, _currentPath, _setCurrentPath, _changeBackgroundColor, setLines) => setLines([]),
  help: () => {
    const rows = [];

    Object.entries(commandDescriptionMap).forEach(([command, description]) => {
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
    return <Fragment />;
  },
  projects: () => <SimpleText content="W.I.P." />,
  contact: () => <SimpleText content="W.I.P." />,
  resume: (_argument, _currentPath, _setCurrentPath, _changeBackgroundColor, _setLines, setDisplayResume) => {
    setDisplayResume(true);
    return <></>;
  },
  about: () => <SimpleText content="W.I.P." />,
  skills: () => <SimpleText content="W.I.P." />,
  time: () => {
    const time = new Date().toLocaleTimeString();
    return <SimpleText content={`The current time is ${time}`} />;
  },
  date: () => {
    const date = new Date().toLocaleDateString();
    return <SimpleText content={`Today's date is ${date}`} />;
  },
  dir: (_argument, currentPath) => (
    <SimpleText content={`\nDirectory of ${currentPath}\n\nskills.exe\nsteam_account_password.txt`} />
  ),
  ver: () => <SimpleText content="Commandfolio Version 1.0.0 by Erick Matheus" />,
  echo: (argument) => <SimpleText content={argument} />,
  open: (argument) => {
    let url = argument;
    let commandOutput = <SimpleText content="Invalid URL" />;

    if (!url.includes("https://")) url = "https://" + url;

    const valid = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g.test(url);

    if (valid) {
      commandOutput = <Fragment />;
      window.open(url);
    }

    return commandOutput;
  },
};

const DisplayCommand = ({
  setLines,
  currentPath,
  commandInput,
  setCurrentPath,
  setDisplayResume,
  changeBackgroundColor,
}) => {
  const [commandElement, setCommandElement] = useState(<Fragment />);

  const executeCommandAndGetElement = () => {
    let [mainCommand, ...args] = commandInput.trim().split(/\s+/);
    const argument = args.join(" ");

    mainCommand = mainCommand.toLowerCase();

    return commandFunctions[mainCommand.toLowerCase()] ? (
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
  };

  useEffect(() => {
    setCommandElement(executeCommandAndGetElement());
  }, []);

  return commandElement;
};

function commandInputAreEqual(prev, next) {
  return prev.commandInput === next.commandInput;
}

export default React.memo(DisplayCommand, commandInputAreEqual);
