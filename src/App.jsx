import React, { useState, useEffect } from 'react';

import './App.css';
import CommandList from './app/data/command-list';
import { Input } from './components';


export default (props) => {
  const [command, setCommand] = useState(null);
  const [childrens, setChildrens] = useState([
    <Input submit={ command => setCommand (command) }/>,
  ]);

  useEffect(() => {
    if (command) {
      const result = Object.values(CommandList).some(o => o.name === command);
      if (result) { console.log('Encontrou o comando (¬‿¬)') }
    }
  }, [childrens, command]);
 
  return (
    <div className="App">
      <p>Commandfolio [versão 0.1.0]<br/>(c) 2020 Erick Matheus. Todos os direitos reservados.</p>
      { childrens }
    </div>
  )
}