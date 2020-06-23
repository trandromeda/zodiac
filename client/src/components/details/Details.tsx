import React, { useState, useEffect, useContext } from 'react';
import socket from 'src/utils/socket';
import './Details.scss';

import PlayerList from './player-list/PlayerList';
import PlayerName from './PlayerName';
import Archetype from 'src/components/details/archetype/Archetype';
import Role from 'src/components/details/role/Role';
import Coordinates from 'src/components/details/coordinates/Coordinates';

import { GameStore } from 'src/game-store';
import { IMemoryHex } from 'src/utils/BoardUtils';

type Props = {
    playerUUID: string;
};

interface Player {
    name: string;
    playerUUID: string;
    archetype?: string;
    role?: string;
    coordinates?: IMemoryHex[];
}

function Details(props: Props) {
    const [players, setPlayers] = useState([{ name: '', playerUUID: '', archetype: '' }]);
    const { gameState, gameDispatch } = useContext(GameStore);

    const handleEnterPreparationPhase = () => {
        gameDispatch({ type: 'next-stage', payload: { stage: 'labyrinth-creation' } });
    };

    const dealArchetypes = () => {
        socket.emit('dealArchetypes');
    };

    /** Listen for new players */
    useEffect(() => {
        const updatePlayersList = (currentPlayers: { name: string; playerUUID: string }[]) => {
            if (currentPlayers.length) {
                const playersWithIds = currentPlayers.map((player) => {
                    return {
                        name: player.name,
                        playerUUID: player.playerUUID,
                        archetype: '',
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

    /** Listen for card deal */
    useEffect(() => {
        socket.on('dealtArchetype', (data: { archetype: string; role: string; coordinates: IMemoryHex[] }) => {
            // const archetypeObj = find(archetypesData, (arc) => arc.id === data.archetype);
            // if (archetypeObj) {
            //     const archetype = new ArchetypeClass(archetypeObj);
            //     setArchetype(archetype);
            // } else {
            //     setArchetype(undefined);
            // }
        });
    }, []);

    return (
        <div className="details">
            <h2>Phase: {gameState.stage}</h2>
            <div className="details__player-name">
                <PlayerName playerUUID={props.playerUUID} />
            </div>
            <PlayerList players={players} />
            <div className="details__prepare">
                <button onClick={handleEnterPreparationPhase}>All players ready</button>
            </div>
            <div>
                <button onClick={dealArchetypes}>Deal Archetypes</button>
            </div>
            <Role />
            <Coordinates />
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
