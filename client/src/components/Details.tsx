import React, { useState, useEffect } from 'react';
import socket from '../utils/socket';

import PlayerName from './PlayerName';
import './Details.scss';

function Details() {
    const [players, setPlayers] = useState([{ playerName: '', id: '' }]);

    useEffect(() => {
        socket.on(
            'currentPlayers',
            (playerNames: { playerName: string; id: string }[]) => {
                if (playerNames.length) setPlayers(playerNames);
            }
        );
    }, []);

    return (
        <div className="details">
            <div className="details__player-name">
                <PlayerName />
            </div>
            {players[0].playerName && (
                <div className="details">
                    <p>Players:</p>
                    <ul>
                        {players.map((player) => {
                            return <li key={player.id}>{player.playerName}</li>;
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Details;
