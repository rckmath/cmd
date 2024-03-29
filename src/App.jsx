import React, { useState, useEffect } from 'react';

import './App.css';
import parser from './app/functions/parser';
import color from './app/functions/color';
import { Input } from './components';


export default (props) => {
  const [command, setCommand] = useState(null);
  const [newChild, setNewChild] = useState(false);
  const [colors, setColors] = useState({
    backgroundColor: "#000",
    color: "#faebd7",
  });
  const [childCounter, setChildCounter] = useState(1);
  const [child, setChild] = useState(undefined);
  const [children, setChildren] = useState([
    <Input key={ childCounter } submit={ command => setCommand(command) }/>,
  ]);

  useEffect(() => {
    if (command) {
      if (command.includes('color')) {
        const [, attr] = command.split(' ');
        if ((attr && attr.length === 2) && attr[0] !== attr[1]) {
          setColors(color.get(attr));
        }
      }

      setNewChild(true);
      setChildCounter(childCounter + 1);
      setChild(parser(command));
      setCommand(null);
    }
  }, [childCounter, command]);

  useEffect(() => {
    if (newChild) {
      if (child) {
        setChildren([...children, child, <Input key={ childCounter } submit={ command => setCommand(command) }/>])
      } else {
        setChildren([<Input key={ childCounter } submit={ command => setCommand(command) }/>])
      }
      setNewChild(false);
    }
  }, [child, childCounter, children, newChild])

  useEffect(() => {
    color.change(colors);
  }, [colors, children]);

  return (
    <div className="App">
      <p>Commandfolio [versão 0.2.0]<br/>(c) 2021 Erick Matheus. Todos os direitos reservados.</p>
      { children.map(c => c) }
    </div>
  )
}