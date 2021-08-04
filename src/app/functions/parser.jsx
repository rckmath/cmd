import { calc, misc } from './index';
import React from 'react';

import { IpAddress, Help, Social, Repositories } from '../../components';
import CommandList from '../data/command-list';
import Command from '../enum/command';
import about from './about';

const select = (input) => {
  const [command, attr] = input.split(' ');

  const result = Object.values(CommandList).find(o => (o.name === command ? o.id : false));

  if (!result) {
    return (
      <div>
        '{ command }' não é reconhecido como um comando interno ou externo, um programa operável ou um arquivo em lotes.
        <br/>
        Digite 'help' para listar os comandos existentes.
        <br/>
        <br/>
      </div>
    )
  }
  
  switch (result.id) {
    case Command.ABOUT:
      return (
        <div dangerouslySetInnerHTML={{ __html: about() }} />
      );
    
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