import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Board from './components/Board';
import Textin from './components/Textin'
import Navbar from "./components/Navbar"

function Mainpage(props) {
    return (
        <div>
            <div>
            ::before
                <Navbar />
            </div>
            
            <div className="container">
            ::before
                <Board />
                <Textin />
            </div>
        </div>
    );
}

ReactDOM.render(<Mainpage />, document.getElementById('root'));
