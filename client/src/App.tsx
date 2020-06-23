import React, { useState, useEffect } from 'react';
import localUUID from 'react-uuid';
import socket from './utils/socket';

import Details from './components/details/Details';
import Board from './components/board/Board';

import { GameStoreProvider } from 'src/game-store';

import './App.scss';

function App() {
    const [playerUUID, setPlayerUUID] = useState('');

    useEffect(() => {
        const uuid = localStorage.getItem('uuid');

        if (uuid) {
            setPlayerUUID(uuid);
            // TODO: Replace this with an API call
            // socket.emit('rejoin-game', uuid);
        } else {
            setPlayerUUID(localUUID());
        }

        // TODO: Find and repopulate player data upon disconnect or refresh
        // socket.emit('getPlayers', uuid);
        // TEMP: Use name instead of UUID so we can have multiple browser tabs open
        // const currentPlayer = currentPlayers.filter((player) => player.playerUUID === props.playerUUID)[0];
        // const currentPlayer = players.filter((player) => player.name === gameState.playerName)[0];
        // if (currentPlayer) setCurrentPlayer(currentPlayer);
    }, []);

    useEffect(() => {
        socket.on('restoreData', (data: { name: string; archetype: string; playerUUID: string }) => console.log(data));
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
