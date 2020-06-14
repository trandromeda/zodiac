import React, { createContext, useReducer } from 'react';

type Stage = 'lobby' | 'labyrinth-creation' | 'assignments' | undefined;
type InitialState = {
    stage: Stage;
    playerName?: string;
};
type Payload = {
    stage?: Stage;
    playerName?: string;
};

const initialState: InitialState = {
    stage: 'lobby',
    playerName: '',
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
                const playerName = action.payload.playerName;
                return { ...state, playerName };
            default:
                throw new Error();
        }
    }, initialState);

    return <GameStore.Provider value={{ gameState, gameDispatch }}>{children}</GameStore.Provider>;
};

export { GameStore, GameStoreProvider };
