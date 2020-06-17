import React, { useState, useEffect } from 'react';
import socket from 'src/utils/socket';
import { IMemoryHex } from 'src/utils/BoardUtils';

const Coordinates = () => {
    const [coordinates, setCoordinates] = useState<IMemoryHex[] | undefined>(undefined);
    useEffect(() => {
        socket.on('dealtArchetype', (data: { archetype: string; role: string; coordinates: IMemoryHex[] }) => {
            if (data.coordinates) setCoordinates(data.coordinates);
        });
    }, []);

    useEffect(() => console.log(coordinates));

    if (coordinates) {
        return (
            <div className="role">
                Coordinates: {coordinates[0].memory}, {coordinates[1].memory}
            </div>
        );
    } else {
        return <div>Coordinates: </div>;
    }
};

export default Coordinates;
