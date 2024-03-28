import React from "react";

import Fragment from "../components/Fragment";
import SimpleText from "../components/SimpleText";
import SimpleTable from "../components/SimpleTable";

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

export const commandFunctions = {
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
