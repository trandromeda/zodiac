import React, { useState, useEffect } from 'react';

import './Archetype.scss';
import { IArchetype } from 'src/components/archetype/archetype.model';

interface Props {
    archetype: IArchetype;
}

const Archetype = ({ archetype }: Props) => {
    useEffect(() => console.log(archetype));
    const { name, description, flavour, imageUrl, charges, turnType } = archetype;

    return (
        <div className="archetype">
            <p>{name}</p>
            <p>{description}</p>
            <p>{flavour}</p>
            <img src={require(`${imageUrl}`)} />
        </div>
    );
};

export default Archetype;
