import React, { useState, useReducer } from 'react';
import { HexGrid, Layout, Hexagon, Text, GridGenerator } from '@trandromeda/react-hexgrid';
import { find, filter, cloneDeep } from 'lodash';

import { IHex, IMemoryHex, BoardUtils } from '../utils/BoardUtils';

import memories from '../data/memories';
import './Board.scss';

const hexagons = GridGenerator.asymHexagon(3);
function Board() {
    const [memoryHexes, setMemoryHexes] = useState<IMemoryHex[]>([]);
    const [shuffledMemories, setShuffledMemories] = useState(BoardUtils.shuffle(cloneDeep(memories)));

    /** The outcome of handleClick will depend on game state */
    const handleClick = (event: any, hex: any) => {
        event.preventDefault();
        const hexagon: IMemoryHex = {
            q: hex.props.q,
            r: hex.props.r,
            s: hex.props.s,
            memory: hex.props.memory,
        };

        if (hexagon.memory) {
            const filteredMemories = filter(memoryHexes, (memoryHex) => {
                if (memoryHex.q === hexagon.q && memoryHex.r === hexagon.r && memoryHex.s === hexagon.s) {
                    return false;
                }

                return true;
            });

            setMemoryHexes(filteredMemories);
        } else {
            const shiftedMemory = shuffledMemories.shift();
            setMemoryHexes([
                ...memoryHexes,
                {
                    ...hexagon,
                    memory: shiftedMemory,
                },
            ]);
            setShuffledMemories([...shuffledMemories, shiftedMemory]);
        }
    };

    const handleSetMemories = () => {
        let firstHex = { q: 0, r: -1, s: 1 };
        let existingHexes: IHex[] = [firstHex];
        const numberOfMemories = 21;
        setShuffledMemories(BoardUtils.shuffle(cloneDeep(memories))); // replenish memories every time we shuffle

        function* createMemories(start: any, end: any, currentHex: IHex): any {
            if (start > end) {
                return;
            }

            const nextHex = BoardUtils.getNextHex(currentHex, existingHexes, hexagons);
            existingHexes.push(nextHex);
            yield nextHex;
            yield* createMemories(start + 1, end, nextHex);
        }
        const hexes: IHex[] = Array.from(createMemories(0, numberOfMemories - 1, firstHex));
        const hexesWithMemories = hexes.map((hex, i) => {
            return {
                ...hex,
                memory: shuffledMemories.shift(),
            };
        });

        setMemoryHexes(hexesWithMemories);
    };

    return (
        <div className="board">
            <div className="board__grid">
                <HexGrid width={'100%'} height={'100%'} viewBox={'-50 -40 90 80'}>
                    <Layout size={{ x: 7, y: 7 }} flat={false} spacing={1.02} origin={{ x: 0, y: 0 }}>
                        {hexagons.map((hex: IHex, i: number) => {
                            const memory = find(memoryHexes, (memoryHex) => memoryHex.q === hex.q && memoryHex.r === hex.r);
                            return (
                                <Hexagon
                                    key={i}
                                    q={hex.q}
                                    r={hex.r}
                                    s={hex.s}
                                    onClick={handleClick}
                                    memory={memory && memory.memory}
                                    className={`${memory ? 'highlight' : ''}`}
                                >
                                    <Text>{memory && memory.memory}</Text>
                                </Hexagon>
                            );
                        })}
                    </Layout>
                </HexGrid>
            </div>
            <div className="board__details">
                <button onClick={handleSetMemories}>Randomize Memories</button>
            </div>
        </div>
    );
}

export default Board;
