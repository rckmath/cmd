import { calc, color, misc } from './index';
import React from 'react';

import { IpAddress, Help, Social, Repositories } from '../../components';
import CommandList from '../data/command-list';
import Command from '../enum/command';

const select = (input) => {
  const [command, attr] = input.split(' ');

  const result = Object.values(CommandList).find(o => (o.name === command ? o.id : false));

  if (!result) {
    return (
      <div>
        '{ command }' não é reconhecido como um comando interno ou externo, um programa operável ou um arquivo em lotes.
        <br/>
        <br/>
      </div>
    )
  }
  
  switch (result.id) {
    case Command.ABOUT:
      return (
        <div>
          Nome: Erick M. L. Pacheco<br/>
          De: Campinas<br/>
          Idade: 20<br/>
          Tipo: Nerd<br/>
          Descrição: Graduando em Engenharia de Software pela PUC Campinas e atuando como desenvolvedor backend. ༼ つ ◕_◕ ༽つ<br/>
          <br/>
          <strong>Linguagens</strong><br/>
          <br/>
          VHDL: ■◧□□□□□□□□ 15%<br/>
          Assembly 8086: ■■□□□□□□□□ 20%<br/>
          PHP: ■■□□□□□□□□ 20%<br/>
          React.js: ■■◧□□□□□□□ 25%<br/>
          C/C++: ■■■■□□□□□□ 40%<br/>
          Java: ■■■■□□□□□□ 40%<br/>
          Node.js: ■■■■■□□□□□ 50%<br/>
          <br/>
        </div>
      )
    
    case Command.CALC:
      return (
        <div>
          { calc(input) }
          <br/>
          <br/>
        </div>
      )

    case Command.OPEN:
      const res = misc.open(attr);
      return (
        <div>
          { res }
          { res && <br/> }
          <br/>
        </div>
      )

    case Command.DATE:
      return (
        <div>
          { misc.date() }
          <br/>
          <br/>
        </div>
      )

    case Command.TIME:
      return (
        <div>
          { misc.time() }
          <br/>
          <br/>
        </div>
      )

    case Command.HELP:
      return (
        <div>
          <Help/>
          <br/>
        </div>
      );

    case Command.PROJECTS:
      return (
        <div>
          <Repositories/>
          <br/>
        </div>
      )

    case Command.SOCIAL:
      return (
        <div>
          <Social/>
          <br/>
        </div>
      )
    
    case Command.COLOR:
      color(attr);
      return (
        <br/>
      )

    case Command.CLS:
      return;

    case Command.SHUTDOWN:
      return (
        <>
          { misc.shutdown() }
          <br/>
        </>
      )

    case Command.IP:
      return (
        <div>
          <IpAddress/>
          <br/>
          <br/>
        </div>
      )

    default:
      return;
  }
}

export default function (input) {
  return select(input);
}