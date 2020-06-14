import React, { useState, useEffect } from 'react';
import localUUID from 'react-uuid';

import Details from './components/details/Details';
import Board from './components/board/Board';

import { GameStoreProvider } from 'src/game-store';

import './App.scss';

function App() {
    const [playerUUID, setPlayerUUID] = useState('');

    useEffect(() => {
        const uuid = localStorage.getItem('uuid') || localUUID();

        setPlayerUUID(uuid);

        // socket.emit('getPlayers', uuid);
    }, []);

    return (
        <GameStoreProvider>
            <div className="app">
                <div className="app__board">
                    <Board />
                </div>
                <div className="app__details">
                    <Details playerUUID={playerUUID} />
                </div>
            </div>
        </GameStoreProvider>
    );
}

export default App;
