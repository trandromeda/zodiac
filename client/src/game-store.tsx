import React, { createContext, useReducer } from 'react';

type Stage = 'lobby' | 'labyrinth-creation' | 'assignments' | undefined;
type Player = { name: string; playerUUID: string };

type InitialState = {
    stage: Stage;
    player?: Player;
};
type Payload = {
    stage?: Stage;
    player?: Player;
};

const initialState: InitialState = {
    stage: 'lobby',
    player: { name: '', playerUUID: '' },
};

interface IGameContext {
    gameState: InitialState;
    gameDispatch: React.Dispatch<{ type: string; payload: Payload }>;
}

const GameStore = createContext({} as IGameContext);

const GameStoreProvider = ({ children }: any) => {
    const [gameState, gameDispatch] = useReducer((state: InitialState, action: { type: string; payload: Payload }) => {
        switch (action.type) {
            case 'next-stage':
                const stage = action.payload.stage;
                return { ...state, stage };
            case 'set-player':
                const player = action.payload.player;
                return { ...state, player };
            default:
                throw new Error();
        }
    }, initialState);

    return <GameStore.Provider value={{ gameState, gameDispatch }}>{children}</GameStore.Provider>;
};

export { GameStore, GameStoreProvider };
