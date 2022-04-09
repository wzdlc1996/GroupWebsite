import React from 'react';
import { render } from 'react-dom';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'

import './index.css';
import Board from './components/Board';
import Textin from './components/Textin'
import Navbar from "./components/RBNavbar"
import ReportUpload from "./components/ReportUpload"
import PastRepList from "./components/PastReports"



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

function PastRep(props) {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="container">
                <PastRepList />
            </div>
        </div>
    )
}


function App(props) {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/report" element={<Report />} />
                <Route exact path="/upload" element={<AddReport />} />
                <Route exact path="/archive" element={<PastRep />} />
            </Routes>
        </Router>
    );
}

render(<App />, document.getElementById('root'));
