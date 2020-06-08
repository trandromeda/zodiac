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
            <p className="archetype__name">{name}</p>
            <img src={require(`../../assets/${id}.jpg`)} />
            <p className="archetype__description">{description}</p>
            <div className="archetype__footer">
                <p className="footer__charges">{charges}</p>
                <p className="footer__turn">{turnType}</p>
                <p className="footer__flavour">{flavour}</p>
            </div>
        </div>
    );
};

export default Archetype;
