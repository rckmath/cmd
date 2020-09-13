import React, { useState, useEffect } from 'react';

import './App.css';
import parser from './app/functions/parser';
import { Input } from './components';


export default (props) => {
  const [command, setCommand] = useState(null);
  const [newChild, setNewChild] = useState(false);
  const [child, setChild] = useState(undefined);
  const [children, setChildren] = useState([
    <Input key={ 1 } submit={ command => setCommand(command) }/>,
  ]);

  useEffect(() => {
    if (command) {
      setNewChild(true);
      setChild(parser(command))
      setCommand(null);
    }
  }, [command]);

  useEffect(() => {
    if (newChild) {
      if (child) {
        setChildren([...children, child, <Input key={ children.length + 2 } submit={ command => setCommand(command) }/>])
      } else {
        setChildren([<Input key={ 1 } submit={ command => setCommand(command) }/>])
      }
      setNewChild(false);
    }
  }, [child, children, newChild])

  return (
    <div className="App">
      <p>Commandfolio [versão 0.1.0]<br/>(c) 2020 Erick Matheus. Todos os direitos reservados.</p>
      { children.map(c => c) }
    </div>
  )
}