import React from 'react';

import CommandList from '../app/data/command-list';
import Table from './layout/Table';

const Help = () => {
  
  return (
    <Table>
      {
        CommandList.map(command => (
          <tr key={ command.id }>
            <td>{ command.syntax }</td>
            <td>{ command.description }</td>
          </tr>
        ))
      }
    </Table>
  )
}

export default Help;