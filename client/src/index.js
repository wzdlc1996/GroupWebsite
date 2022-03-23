import React from 'react';
import { render } from 'react-dom';
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import './index.css';
import Board from './components/Board';
import Textin from './components/Textin'
import Navbar from "./components/RBNavbar"
import ReportUpload from "./components/ReportUpload"



function Homepage(props) {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="container">
                <Board />
                <Textin />
            </div>
        </div>
    )
}


function Report(props) {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="container">
                <Board />
                <Textin />
            </div>
        </div>
    )
}


function AddReport(props) {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="container">
                <ReportUpload />
            </div>
        </div>
    )
}


function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/report" element={<Report />} />
                <Route path="/upload" element={<AddReport />} />
            </Routes>
        </BrowserRouter>
    );
}

render(<App />, document.getElementById('root'));
