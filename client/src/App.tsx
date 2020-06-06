import React from 'react';

import Details from './components/Details';
import Board from './components/board/Board';

import './App.scss';

function App() {
    return (
        <div className="app">
            <h1>Zodiac</h1>
            {/* <Canvas /> */}

            <div className="app__board">
                <Board />
            </div>
            <div className="app__details">
                <Details />
            </div>
        </div>
    );
}

export default App;
