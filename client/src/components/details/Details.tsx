import React, { useState, useEffect, useContext } from 'react';
import socket from 'src/utils/socket';
import './Details.scss';

import PlayerName from './PlayerName';
import Archetype from 'src/components/archetype/Archetype';
import { GameStore } from 'src/store';
import { IArchetype } from '../archetype/archetype.model';

type Props = {
    archetypes: any;
};

function Details(props: Props) {
    const [players, setPlayers] = useState([{ playerName: '', id: '' }]);
    const [gameState, gameDispatch] = useContext(GameStore);
    console.log(gameState);

    useEffect(() => {
        socket.on('currentPlayers', (playerNames: { playerName: string; id: string }[]) => {
            if (playerNames.length) setPlayers(playerNames);
        });
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
            <div>
                {props.archetypes.map((archetype: IArchetype) => {
                    return <Archetype key={archetype.id} archetype={archetype} />;
                })}
            </div>
        </div>
    );
}

export default Details;
