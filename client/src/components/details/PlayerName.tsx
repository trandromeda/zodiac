import React, { useState, FormEvent, useContext } from 'react';
import socket from 'src/utils/socket';
import { GameStore } from 'src/game-store';

type Props = {
    playerUUID: string;
};

function PlayerName(props: Props) {
    const [name, setName] = useState('');
    const { gameState, gameDispatch } = useContext(GameStore);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        localStorage.setItem('uuid', props.playerUUID);
        gameDispatch({ type: 'set-player', payload: { player: { name, playerUUID: props.playerUUID } } });
        socket.emit('joinGame', { name, playerUUID: props.playerUUID });
    };

    if (gameState.player?.name) {
        return <h2>Welcome, {gameState.player?.name}</h2>;
    } else {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                        <input type="submit" value="OK"></input>
                    </label>
                </form>
            </div>
        );
    }
}

export default PlayerName;
