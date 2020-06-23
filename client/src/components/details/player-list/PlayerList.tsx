import React, { useState, FormEvent, useContext } from 'react';
import socket from 'src/utils/socket';
import { GameStore } from 'src/game-store';

type Props = {
    players: { name: string; playerUUID: string }[];
};

function PlayerList(props: Props) {
    return (
        <div className="details__players-list">
            {props.players[0].name && (
                <div className="details">
                    <p>Players:</p>
                    <ul>
                        {props.players.map((player) => {
                            return <li key={player.name}>{player.name}</li>;
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default PlayerList;
