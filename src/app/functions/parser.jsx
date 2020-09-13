import { calc, color, misc } from './index';
import React from 'react';

import { Input, Help, Social, Repositories } from '../../components';
import CommandList from '../data/command-list';

const select = (input) => {
  const [command, ] = input.split(' ');

  const result = Object.values(CommandList).some(o => o.name === command);

  if (!result) { return <>'{ command }' não é reconhecido como um comando interno
  ou externo, um programa operável ou um arquivo em lotes.<br/></> }

  console.log('Encontrou o comando ༼ つ ◕_◕ ༽つ')
  
  switch (command) {
    case 'help':
      return <Help/>;

    case 'cls':
      return null;

    default:
      break;
  }
}

export default function (input) {
  return select(input);
}