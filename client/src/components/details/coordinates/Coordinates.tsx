import React, { useState, useEffect, useContext } from 'react';
import { IMemoryHex } from 'src/utils/BoardUtils';

import { EventsService } from 'src/utils/EventsService';

import './Coordinates.scss';
import { GameStore } from 'src/game-store';

const Coordinates = () => {
    const [coordinates, setCoordinates] = useState<IMemoryHex[] | undefined>(undefined);
    const { gameState } = useContext(GameStore);

    useEffect(() => {
        setCoordinates(gameState.player?.coordinates);
    }, [gameState.player?.coordinates]);

    const handleMouseEnter = (coordinates: IMemoryHex[]) => {
        EventsService.highlightCoordinates(coordinates);
    };

    if (coordinates?.length) {
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
