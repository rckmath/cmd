import './index.css'; 
import React from 'react';
import ReactDOM from 'react-dom';

import Input from './components/input';

class App extends React.Component{
  
}

ReactDOM.render(
  <div className="top">
    <h4>Portfolio [versão 0.1.0]</h4>
    <p>(c) 2020 Erick Matheus. Todos os direitos reservados.</p>
    <Input/>
  </div>,
  document.getElementById('root')
)

