import React from 'react';
import './App.css';

// import Canvas from "./components/Canvas";
import Memory from './components/Memory';
import Board from './components/Board';

function App() {
    return (
        <div className="App">
            {/* <Canvas /> */}
            <Board />
            <Memory />
        </div>
    );
}

export default App;
