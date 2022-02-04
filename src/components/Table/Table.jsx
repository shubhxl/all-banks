import React from 'react';
import './Table.css'

function Table(props) {
  return <div className='table'>
      {props.children}
  </div>;
}

export default Table;
