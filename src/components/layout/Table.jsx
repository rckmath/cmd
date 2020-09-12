import React from 'react';

const Table = (props) => {
  return (
    <table>
      <tbody>
        { props.children }
      </tbody>
    </table>
  )
}

export default Table;