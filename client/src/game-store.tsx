import React, { createContext, useReducer } from 'react';

type Stage = 'lobby' | 'labyrinth-creation' | 'assignments' | undefined;
type InitialState = {
    stage: Stage;
};

const initialState: InitialState = {
    stage: 'lobby',
};

interface IGameContext {
    gameState: InitialState;
    gameDispatch: React.Dispatch<{ type: string; payload: { stage?: Stage } }>;
}

const GameStore = createContext({} as IGameContext);

const GameStoreProvider = ({ children }: any) => {
    const [gameState, gameDispatch] = useReducer((state: { stage: Stage }, action: { type: string; payload: { stage?: Stage } }) => {
        switch (action.type) {
            case 'next-stage':
                const stage = action.payload.stage;
                return { ...state, stage };
            default:
                throw new Error();
        }
    }, initialState);

    return <GameStore.Provider value={{ gameState, gameDispatch }}>{children}</GameStore.Provider>;
};

export { GameStore, GameStoreProvider };
