import React, { useState, useEffect, useContext } from 'react';
import socket from 'src/utils/socket';
import './Details.scss';

import PlayerName from './PlayerName';
import Archetype from 'src/components/archetype/Archetype';
import Role from 'src/components/role/Role';

import { GameStore } from 'src/game-store';

type Props = {
    playerUUID: string;
};

function Details(props: Props) {
    const [players, setPlayers] = useState([{ name: '', playerUUID: '' }]);
    const [currentPlayer, setCurrentPlayer] = useState({ name: '', playerUUID: '' });
    const { gameState, gameDispatch } = useContext(GameStore);

    const handleEnterPreparationPhase = () => {
        gameDispatch({ type: 'next-stage', payload: { stage: 'labyrinth-creation' } });
    };

    const dealArchetypes = () => {
        socket.emit('dealArchetypes');
    };

    useEffect(() => {
        const updatePlayersList = (currentPlayers: { name: string; playerUUID: string }[]) => {
            if (currentPlayers.length) {
                const playersWithIds = currentPlayers.map((player) => {
                    return {
                        name: player.name,
                        playerUUID: player.playerUUID,
                    };
                });
                setPlayers(playersWithIds);
            }
        };
        socket.on('currentPlayers', updatePlayersList);

        return () => {
            socket.off('currentPlayers', updatePlayersList);
        };
    }, []);

    useEffect(() => {
        // TEMP: Use name instead of UUID so we can have multiple browser tabs open
        // const currentPlayer = currentPlayers.filter((player) => player.playerUUID === props.playerUUID)[0];
        const currentPlayer = players.filter((player) => player.name === gameState.playerName)[0];
        if (currentPlayer) setCurrentPlayer(currentPlayer);
    }, [gameState.playerName, players]);

    return (
        <div className="details">
            <h2>Phase: {gameState.stage}</h2>
            <div className="details__player-name">
                <PlayerName currentPlayer={currentPlayer} playerUUID={props.playerUUID} />
            </div>
            <div className="details__players-list">
                {players[0].name && (
                    <div className="details">
                        <p>Players:</p>
                        <ul>
                            {players.map((player) => {
                                return <li key={player.name}>{player.name}</li>;
                            })}
                        </ul>
                    </div>
                )}
            </div>
            <div className="details__prepare">
                <button onClick={handleEnterPreparationPhase}>All players ready</button>
            </div>
            <div>
                <button onClick={dealArchetypes}>Deal Archetypes</button>
            </div>
            <Role />
            <Archetype />
            {/* <div>
                {props.archetypes.map((archetype: IArchetype) => {
                    return <Archetype key={archetype.id} archetype={archetype} />;
                })}
            </div> */}
        </div>
    );
}

export default Details;
