import { Fragment } from "react";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import SimpleText from "./base/SimpleText";
import SimpleTable from "./base/SimpleTable";

import { getAge } from "../configs/utils";
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
  contact: () => {
    return (
      <>
        <Typography align="justify" maxWidth="600px">
          Where to find me:
        </Typography>
        <span>- E-mail: </span>
        <Link href="mailto:ericklopes02@gmail.com" underline="none" target="_blank" rel="noopener" color="inherit">
          {"ericklopes02@gmail.com"}
        </Link>
        <br />
        <span>- LinkedIn: </span>
        <Link
          href="https://www.linkedin.com/in/rckmath"
          underline="none"
          target="_blank"
          rel="noopener"
          color="inherit"
        >
          {"https://www.linkedin.com/in/rckmath/"}
        </Link>
        <br />
        <span>- Steam: </span>
        <Link
          href="https://steamcommunity.com/id/BossBR/"
          underline="none"
          target="_blank"
          rel="noopener"
          color="inherit"
        >
          {"https://steamcommunity.com/id/BossBR/"}
        </Link>
      </>
    );
  },
  resume: (_, __, ___, ____, setDisplayResume) => {
    setDisplayResume(true);
    return <Fragment />;
  },
  about: () => (
    <SimpleText
      content={
        `Erick Matheus Lopes Pacheco, ${getAge()} years old.\n` +
        `Graduate software engineer with over four years of experience as a back-end developer, well-versed in developing and integrating RESTful and SOAP APIs, especially using JavaScript and .NET. Experienced with many projects, front-end development and providing infrastructure (DevOps) support. Currently acting as a full-stack engineer, eager to specialize in Blockchain, Web3, and smart contracts development over the next three years.`
      }
    />
  ),
  skills: () => (
    <SimpleText
      content={
        `Used to work with the best practices of the programming and software architecture like:\n` +
        `- Design Patterns, SOLID, TDD/BDD, Git Flow and more.\n\n` +
        `Already worked with:\n` +
        `- Node.js, TypeScript, React.js, React Native, AngularJS, Jest;\n` +
        `- C# .NET 8.0, .NET Framework, Entity Framework (EF);\n` +
        `- AWS, Nginx, Docker, Docker Compose;\n` +
        `- PostgreSQL, SQLite, MS-SQL Server, Firebase;\n` +
        `- SCRUM, Jira, IBM Maximo, API integration and more.\n\n` +
        `Also touched and had a hands on:\n` +
        `- Solidity, Web3.js, Ethers, Truffle;\n` +
        `- Java, C/C++, Flutter, vanilla PHP;\n` +
        `- MySQL, MongoDB;\n` +
        `- Trello and more.`
      }
    />
  ),
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
