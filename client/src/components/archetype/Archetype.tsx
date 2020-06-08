import React, { useState, useEffect } from 'react';

import './Archetype.scss';
import { IArchetype } from 'src/components/archetype/archetype.model';

interface Props {
    archetype: IArchetype;
}

const Archetype = ({ archetype }: Props) => {
    const { id, name, description, flavour, charges, turnType } = archetype;

    return (
        <div className="archetype">
            <p>{name}</p>
            <img src={require(`../../assets/${id}.jpg`)} />
            <p>{description}</p>
            <p>{flavour}</p>
            <p>{charges}</p>
            <p>{turnType}</p>
        </div>
    );
};

export default Archetype;
