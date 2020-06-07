import React, { useState, useEffect, useContext } from 'react';
import socket from 'src/utils/socket';
import './Details.scss';

import PlayerName from './PlayerName';
import Archetype from 'src/components/archetype/Archetype';
import { GameStore } from 'src/game-store';
import { IArchetype } from '../archetype/archetype.model';

type Props = {
    archetypes: any;
};

function Details(props: Props) {
    const [players, setPlayers] = useState([{ playerName: '', id: '' }]);
    const { gameState, gameDispatch } = useContext(GameStore);

    const handleEnterPreparationPhase = () => {
        gameDispatch({ type: 'next-stage', payload: 'preparation' });
    };

    useEffect(() => {
        socket.on('currentPlayers', (playerNames: { playerName: string; id: string }[]) => {
            if (playerNames.length) setPlayers(playerNames);
        });
    }, []);

    useEffect(() => console.log(gameState));

    return (
        <div className="details">
            <h2>Phase: {gameState.stage}</h2>
            <div className="details__player-name">
                <PlayerName />
            </div>
            <div className="details__players-list">
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
            <div className="details__prepare">
                <button onClick={handleEnterPreparationPhase}>All players ready</button>
            </div>
            <div>
                {props.archetypes.map((archetype: IArchetype) => {
                    return <Archetype key={archetype.id} archetype={archetype} />;
                })}
            </div>
        </div>
    );
}

export default Details;
