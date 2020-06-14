import React, { useState, useEffect } from 'react';
import socket from 'src/utils/socket';
import { find } from 'lodash';

import { archetypesData } from 'src/data/archetypes.data';
import ArchetypeClass from 'src/components/archetype/archetype.model';

import './Archetype.scss';

const Archetype = () => {
    const [playerArchetype, setArchetype] = useState<ArchetypeClass | undefined>(undefined);

    useEffect(() => {
        socket.on('dealtArchetype', (data: { archetype: string; role: string }) => {
            const archetypeObj = find(archetypesData, (arc) => arc.id === data.archetype);
            if (archetypeObj) {
                const archetype = new ArchetypeClass(archetypeObj);
                setArchetype(archetype);
            } else {
                setArchetype(undefined);
            }
        });
    }, []);

    if (playerArchetype) {
        const { id, name, description, flavour, charges, turnType } = playerArchetype;
        return (
            <div className="archetype">
                <p className="archetype__name">{name}</p>
                <img src={require(`../../assets/${id}.jpg`)} alt={`${name}: ${description}`} />
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
