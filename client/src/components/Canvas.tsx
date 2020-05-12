import React, { useState, useEffect } from 'react';
import Phaser from 'phaser';
import Game from './Game';

function Canvas() {
    const [config] = useState(() => {
       return {
            type: Phaser.AUTO,
            width: 500,
            height: 500,
            parent: 'phaser-canvas',
            scene: [
                Game
            ]
        }}
    )

    useEffect(() => {
        new Phaser.Game(config);
    }, [config])

    return (
        <div id="phaser-canvas"></div>
    )
}

export default Canvas;