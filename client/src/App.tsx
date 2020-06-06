import React, { useState, useEffect } from 'react';

import Details from './components/details/Details';
import Board from './components/board/Board';

import Archetype from 'src/components/archetype/archetype.model';
import { archetypes } from 'src/data/archetypes';

import './App.scss';

function generateArchetypes() {
    return archetypes.map((archetype) => new Archetype(archetype));
}

function App() {
    const [archetypes] = useState(generateArchetypes());

    return (
        <div className="app">
            <h1>Zodiac</h1>
            {/* <Canvas /> */}

            <div className="app__board">
                <Board />
            </div>
            <div className="app__details">
                <Details archetypes={archetypes} />
            </div>
        </div>
    );
}

export default App;
