import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Board from './components/Board';
import Textin from './components/Textin'

function Mainpage(props) {
    return (
        <div>
        <Board />
        <Textin />
        </div>
    );
}

ReactDOM.render(<Mainpage />, document.getElementById('root'));
