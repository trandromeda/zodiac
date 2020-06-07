import { useReducer } from 'react';
import { filter, cloneDeep, difference } from 'lodash';
import { Hex, GridGenerator } from '@trandromeda/react-hexgrid';

import { IHex, IMemoryHex, BoardUtils } from 'src/utils/BoardUtils';
import { memories } from 'src/data/memories';
const hexagons = GridGenerator.asymHexagon(3);

type State = {
    hexesWithMemories: Array<IMemoryHex>;
    hexes: Array<IHex>;
    memories: Array<string>;
};

interface Action {
    type: 'reset-memories' | 'add-memories-to-hexes' | 'add-hex-with-memory' | 'remove-hex-with-memory';
    payload?: {
        memory?: string;
        hex?: IMemoryHex;
        numberOfMemories?: number;
    };
}

const initialState = {
    hexesWithMemories: [],
    hexes: [...cloneDeep(hexagons)],
    memories: [...cloneDeep(memories)],
};

function* generateHexesToBePlayed(start: any, end: any, currentHex: IHex, baseHexes: IHex[] = [], existingHexes: IHex[] = []): any {
    if (start > end) {
        return;
    }

    const nextHex = BoardUtils.getNextHex(currentHex, existingHexes, baseHexes);
    existingHexes.push(nextHex);
    yield nextHex;
    yield* generateHexesToBePlayed(start + 1, end, nextHex, baseHexes, existingHexes);
}

function getNewMemory(memories: string[], hexesWithMemories: IMemoryHex[]): string {
    const existingMemories = hexesWithMemories.map((hexWithMemory) => hexWithMemory.memory || '');
    const unusedMemories = difference(memories, existingMemories);
    return unusedMemories[Math.floor(Math.random() * unusedMemories.length)];
}

function boardReducer(state: State, action: Action) {
    switch (action.type) {
        case 'reset-memories':
            return { ...state, memories: [...BoardUtils.shuffle(state.memories)] };
        case 'add-memories-to-hexes':
            const firstHex = new Hex(0, -1, 1);
            const baseHexes = state.hexes;
            const hexesToBePlayed: IHex[] = Array.from(
                generateHexesToBePlayed(0, (action.payload?.numberOfMemories || 18) - 1, firstHex, baseHexes)
            );
            const shuffledMemories: string[] = [...BoardUtils.shuffle(state.memories)];

            const hexesWithMemories = hexesToBePlayed.map((hex, i) => {
                return {
                    ...hex,
                    memory: shuffledMemories[i],
                };
            });

            return { ...state, hexesWithMemories };

        case 'add-hex-with-memory':
            const memory = getNewMemory(state.memories, state.hexesWithMemories);
            const existingHex = action.payload?.hex || { q: 0, r: 0, s: 0 };
            const hexWithMemory: IMemoryHex = {
                ...existingHex,
                memory,
            };

            return {
                ...state,
                hexesWithMemories: [...state.hexesWithMemories, hexWithMemory],
            };
        case 'remove-hex-with-memory':
            const filteredHexes = filter(state.hexesWithMemories, (hex: IMemoryHex) => {
                if (hex.q === action.payload?.hex?.q && hex.r === action.payload?.hex?.r) {
                    return false;
                }

                return true;
            });
            return { ...state, hexesWithMemories: filteredHexes };
        default:
            return state;
    }
}

export function useBoardReducer() {
    return useReducer(boardReducer, initialState);
}
