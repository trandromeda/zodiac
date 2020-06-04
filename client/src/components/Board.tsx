import React, { useState } from 'react';
import {
    HexGrid,
    Layout,
    Hexagon,
    Text,
    GridGenerator,
} from '@trandromeda/react-hexgrid';
import { unionWith, isEqual } from 'lodash';

import './Board.scss';

const hexagons = GridGenerator.asymHexagon(3);
function Board() {
    const [exploredHexes, setExploredHexes] = useState<any[]>([]);

    const handleClick = (event: any, hex: any) => {
        event.preventDefault();
        const hexagon = {
            q: hex.props.q,
            r: hex.props.r,
            s: hex.props.s,
        };
        setExploredHexes(unionWith(exploredHexes, [hexagon], isEqual));
    };

    return (
        <div className="board">
            <HexGrid width={'100%'} height={'100%'} viewBox={'-50 -40 90 80'}>
                <Layout
                    size={{ x: 6, y: 6 }}
                    flat={false}
                    spacing={1.02}
                    origin={{ x: 0, y: 0 }}
                >
                    {hexagons.map((hex: any, i: number) => {
                        const isHighlighted = exploredHexes.some(
                            (exploredHex) =>
                                exploredHex.q === hex.q &&
                                exploredHex.r === hex.r &&
                                exploredHex.s === hex.s
                        );
                        return (
                            <Hexagon
                                key={i}
                                q={hex.q}
                                r={hex.r}
                                s={hex.s}
                                onClick={handleClick}
                                className={`${
                                    isHighlighted ? 'highlight' : ''
                                }`}
                            >
                                <Text>{`${hex.q} ${hex.r} ${hex.s}`}</Text>
                            </Hexagon>
                        );
                    })}
                </Layout>
            </HexGrid>
        </div>
    );
}

export default Board;
