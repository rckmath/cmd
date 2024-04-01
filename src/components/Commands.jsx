import { Fragment } from "react";

import SimpleText from "./base/SimpleText";
import SimpleTable from "./base/SimpleTable";

import { commandDescriptionMap } from "../configs/mappings";

const changePath = (argument, currentPath) => {
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
  return newPath;
};

const Commands = {
  cd: (argument, currentPath, setCurrentPath) => {
    const newPath = changePath(argument, currentPath);
    setCurrentPath(newPath);
    return <Fragment />;
  },
  color: (argument, _, __, changeBackgroundColor) => {
    const isValidColor = /^[0-9A-Fa-f]{2}$/.test(argument);
    if (isValidColor && changeBackgroundColor(argument)) {
      return <SimpleText content={`Background color changed to ${argument}`} />;
    }
    return <SimpleText content={'Invalid color code combination. Use the format "color 0A"'} />;
  },
  help: () => {
    const rows = Object.entries(commandDescriptionMap).map(([command, description]) => (
      <>
        <td>{command}</td>
        <td>{description}</td>
      </>
    ));

    return (
      <SimpleTable>
        {rows.map((row, index) => (
          <tr key={index}>{row}</tr>
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
  resume: (_, __, ___, ____, setDisplayResume) => {
    setDisplayResume(true);
    return <Fragment />;
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
  dir: (_, currentPath) => (
    <SimpleText content={`\nDirectory of ${currentPath}\n\nskills.exe\nsteam_account_password.txt`} />
  ),
  ver: () => <SimpleText content="Commandfolio Version 1.0.0 by Erick Matheus" />,
  echo: (argument) => <SimpleText content={argument} />,
  open: (url) => {
    const INVALID_URL_MESSAGE = <SimpleText content="Invalid URL" />;
    const HTTP_PROTOCOL = "https://";

    if (!url.includes(HTTP_PROTOCOL)) url = `${HTTP_PROTOCOL}${url}`;

    const urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g;
    const isValidUrl = urlPattern.test(url);

    if (!isValidUrl) return INVALID_URL_MESSAGE;

    window.open(url);
    return <Fragment />;
  },
};

export default Commands;
