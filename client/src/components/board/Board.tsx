import React, { useEffect, useState } from 'react';
import { HexGrid, Layout, Hexagon, Text } from '@trandromeda/react-hexgrid';
import { find } from 'lodash';
import { debounceTime, tap } from 'rxjs/operators';

import { useBoardReducer } from 'src/components/board/board-reducer';
import { IHex, IMemoryHex } from 'src/utils/BoardUtils';

import './Board.scss';
import socket from 'src/utils/socket';

import { EventsService } from 'src/utils/EventsService';

function Board() {
    const [state, dispatch] = useBoardReducer();
    const [highlightedCoordinates, setHighlightedCoordinates] = useState<IMemoryHex[] | undefined>(undefined);

    useEffect(() => {
        const syncHexesWithMemories = (hexes: IMemoryHex[]) => dispatch({ type: 'sync-hexes-with-memories', payload: { hexes } });
        socket.on('newLabyrinth', syncHexesWithMemories);
        return () => {
            socket.off('newLabyrinth', syncHexesWithMemories);
        };
    }, [dispatch]);

    useEffect(() => {
        const subscription = EventsService.onHighlightCoordinates()
            .pipe(
                tap((res) => setHighlightedCoordinates(res)),
                debounceTime(2500)
            )
            .subscribe(() => {
                console.log('hovering');
                setHighlightedCoordinates(undefined);
            });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    /** The outcome of handleClick will depend on game state */
    const handleClick = (event: MouseEvent, hexagon: any) => {
        event.preventDefault();
        const hex: IMemoryHex = {
            q: hexagon.props.q,
            r: hexagon.props.r,
            s: hexagon.props.s,
            memory: hexagon.props.memory,
        };

        if (hex.memory) {
            dispatch({ type: 'remove-hex-with-memory', payload: { hex } });
        } else {
            dispatch({ type: 'add-hex-with-memory', payload: { hex } });
        }
    };

    const handleGenerateLabyrinth = () => {
        const numberOfMemories = 18;
        dispatch({ type: 'add-memories-to-hexes', payload: { numberOfMemories } });
    };

    return (
        <div className="board">
            <div className="board__grid">
                <HexGrid width={'100%'} height={'100%'} viewBox={'-46 -40 80 80'}>
                    <Layout size={{ x: 7, y: 7 }} flat={false} spacing={1.02} origin={{ x: 0, y: 0 }}>
                        {state.hexes.map((hex: IHex, i: number) => {
                            const memoryHex = find(
                                state.hexesWithMemories,
                                (memoryHex: IMemoryHex) => memoryHex.q === hex.q && memoryHex.r === hex.r
                            );
                            const highlightedHex = find(
                                highlightedCoordinates,
                                (coord: IMemoryHex) => coord?.q === hex.q && coord?.r === hex.r
                            );

                            return (
                                <Hexagon
                                    key={i}
                                    q={hex.q}
                                    r={hex.r}
                                    s={hex.s}
                                    onClick={handleClick}
                                    memory={memoryHex?.memory}
                                    className={`${memoryHex ? 'highlight' : ''} ${highlightedHex ? 'hover-highlight' : ''}`}
                                >
                                    <Text>{memoryHex?.memory}</Text>
                                </Hexagon>
                            );
                        })}
                    </Layout>
                </HexGrid>
            </div>
            <div className="board__details">
                <button onClick={handleGenerateLabyrinth}>Generate Labyrinth</button>
            </div>
        </div>
    );
}

export default Board;
