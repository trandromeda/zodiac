import React, { createContext, useReducer } from 'react';

type InitialState = {
    stage: string;
};

const initialState: InitialState = {
    stage: 'setup',
};

interface IGameContext {
    gameState: InitialState;
    gameDispatch: React.Dispatch<{ type: string; payload?: any }>;
}

const GameStore = createContext({} as IGameContext);

const GameStoreProvider = ({ children }: any) => {
    const [gameState, gameDispatch] = useReducer((state: { stage: string }, action: { type: string; payload?: any }) => {
        switch (action.type) {
            case 'next-stage':
                return { ...state, stage: action.payload };
            default:
                throw new Error();
        }
    }, initialState);

    return <GameStore.Provider value={{ gameState, gameDispatch }}>{children}</GameStore.Provider>;
};

export { GameStore, GameStoreProvider };
