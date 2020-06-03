import React from 'react';
import './App.scss';

// import Canvas from "./components/Canvas";
import Memory from './components/Memory';
import Details from './components/Details';

function App() {
    return (
        <div className="app">
            <h1>Zodiac</h1>
            {/* <Canvas /> */}
            <div className="app__details">
                <Details />
            </div>

            <div className="app__board">
                <Memory />
            </div>
        </div>
    );
}

export default App;
