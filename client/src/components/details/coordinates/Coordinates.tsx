import React, { useState, useEffect } from 'react';
import socket from 'src/utils/socket';
import { IMemoryHex } from 'src/utils/BoardUtils';

import { EventsService } from 'src/utils/EventsService';

import './Coordinates.scss';

const Coordinates = () => {
    const [coordinates, setCoordinates] = useState<IMemoryHex[] | undefined>(undefined);
    useEffect(() => {
        socket.on('dealtArchetype', (data: { archetype: string; role: string; coordinates: IMemoryHex[] }) => {
            if (data.coordinates) setCoordinates(data.coordinates);
        });
    }, []);

    const handleMouseEnter = (coordinates: IMemoryHex[]) => {
        EventsService.highlightCoordinates(coordinates);
    };

    if (coordinates) {
        return (
            <div className="coordinates">
                Coordinates:{' '}
                <span onMouseDown={() => handleMouseEnter(coordinates)}>
                    {coordinates[0].memory}, {coordinates[1].memory}
                </span>
            </div>
        );
    } else {
        return <div>Coordinates: </div>;
    }
};

export default Coordinates;
