import React, { MouseEvent, useState, useEffect, FormEvent } from 'react';

import PlayerName from './PlayerName';

function Board() {
    return (
        <div>
            <h1>Welcome to Zodiac</h1>
            <PlayerName />
        </div>
    );
}

export default Board;
