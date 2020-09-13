import React, { useState, useEffect } from 'react';

import './App.css';
import CommandList from './app/data/command-list';
import { Input, Help } from './components';


export default (props) => {
  const [command, setCommand] = useState(null);
  const [newChildren, setNewChildren] = useState(false);
  const [childrens, setChildrens] = useState([
    <Input key={ 1 } submit={ command => setCommand (command) }/>,
  ]);

  useEffect(() => {
    if (command) {
      const result = Object.values(CommandList).some(o => o.name === command);
      if (result) { console.log('Encontrou o comando ༼ つ ◕_◕ ༽つ') }
      setNewChildren(true);
      setCommand(null);
    }
  }, [command]);

  useEffect(() => {
    if (newChildren) {
      setNewChildren(false);
      setChildrens([...childrens, <Help key={ childrens.length + 1 } />, <Input key={ childrens.length + 2 } submit={ command => setCommand (command) }/>])
    }
  }, [childrens, newChildren])

  return (
    <div className="App">
      <p>Commandfolio [versão 0.1.0]<br/>(c) 2020 Erick Matheus. Todos os direitos reservados.</p>
      { childrens.map(c => c) }
    </div>
  )
}