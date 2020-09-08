import React from 'react';

import CommandList from '../app/data/command-list';

const Help = () => {
  
  return (
    <table>
      {
        CommandList.map(command => (
          <>
            <tr key={ command.id }>
              <td>{ command.syntax }</td>
              <td>{ command.description }</td>
            </tr>
          </>
        ))
      }
    </table>
  )
}

export default Help;