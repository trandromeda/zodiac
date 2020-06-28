import React, { useState, useEffect, useContext } from 'react';
import socket from 'src/utils/socket';
import { find } from 'lodash';

import { archetypesData } from 'src/data/archetypes.data';
import ArchetypeClass from 'src/components/details/archetype/archetype.model';

import './Archetype.scss';
import { GameStore } from 'src/game-store';

const Archetype = () => {
    const [playerArchetype, setArchetype] = useState<ArchetypeClass | undefined>(undefined);
    const { gameState } = useContext(GameStore);

    useEffect(() => {
        const archetypeObj = find(archetypesData, (arc) => arc.id === gameState.player?.archetype);
        if (archetypeObj) {
            const archetype = new ArchetypeClass(archetypeObj);
            setArchetype(archetype);
        } else {
            setArchetype(undefined);
        }
    }, [gameState.player?.archetype]);

    if (playerArchetype) {
        const { id, name, description, flavour, charges, turnType } = playerArchetype;
        return (
            <div className="archetype">
                <p className="archetype__name">{name}</p>
                <img src={require(`../../../assets/${id}.jpg`)} alt={`${name}: ${description}`} />
                <p className="archetype__description">{description}</p>
                <div className="archetype__footer">
                    <p className="footer__charges">{charges}</p>
                    <p className="footer__turn">{turnType}</p>
                    <p className="footer__flavour">{flavour}</p>
                </div>
            </div>
        );
    } else return <div></div>;
};

export default Archetype;
