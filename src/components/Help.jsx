import React from 'react';

import CommandList from '../app/data/command-list';

const Help = () => {
  
  return (
    <table>
      <tbody>
        {
          CommandList.map(command => (
            <tr key={ command.id }>
              <td>{ command.syntax }</td>
              <td>{ command.description }</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default Help;