import React from 'react';

type Props = {
    players: { name: string; playerUUID: string; archetype?: string }[];
};

function PlayerList(props: Props) {
    return (
        <div className="details__players-list">
            {props.players[0].name && (
                <div className="details">
                    <p>Players:</p>
                    <ul>
                        {props.players.map((player) => {
                            return (
                                <li key={player.name}>
                                    {player.name}{' '}
                                    {player.archetype
                                        ? `(The ${player.archetype.charAt(0).toUpperCase() + player.archetype.slice(1)})`
                                        : ''}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default PlayerList;
