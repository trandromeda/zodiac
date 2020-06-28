import React, { useState, useEffect, useContext } from 'react';
import { GameStore } from 'src/game-store';

const Role = () => {
    const [role, setRole] = useState<string | undefined>('');
    const { gameState } = useContext(GameStore);

    useEffect(() => {
        setRole(gameState.player?.role);
    }, [gameState.player?.role]);

    return <div className="role">Role: {role}</div>;
};

export default Role;
