import React, { useEffect, useState, FormEvent } from 'react';
import socket from '../utils/socket';

function PlayerName() {
    const [name, setName] = useState('');
    const [showName, setShowName] = useState(false);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        socket.emit('newPlayer', name, (playerName: string) => {
            if (playerName) setShowName(true);
        });
    };
    if (showName) {
        return <h2>Player: {name}</h2>;
    } else {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                        <input type="submit" value="OK"></input>
                    </label>
                </form>
            </div>
        );
    }
}

export default PlayerName;
