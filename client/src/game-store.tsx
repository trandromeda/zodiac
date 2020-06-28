import React, { createContext, useReducer } from 'react';
import { Player } from './models/player.model';

type Stage = 'lobby' | 'labyrinth-creation' | 'assignments' | undefined;
type InitialState = {
    stage: Stage;
    player: Player | undefined;
};

const initialState: InitialState = {
    stage: 'lobby',
    player: { name: '', playerUUID: '', role: '', archetype: '', coordinates: [] },
};

type Actions = 'next-stage' | 'restore-player' | 'update-player';
type Payload = {
    stage?: Stage;
    player?: Player;
};

interface IGameContext {
    gameState: InitialState;
    gameDispatch: React.Dispatch<{ type: Actions; payload: Payload }>;
}

const GameStore = createContext({} as IGameContext);

// TODO: Split this into different child reducers if state grows too large
const GameStoreProvider = ({ children }: any) => {
    const [gameState, gameDispatch] = useReducer((state: InitialState, action: { type: Actions; payload: Payload }) => {
        switch (action.type) {
            case 'next-stage':
                const stage = action.payload.stage;
                return { ...state, stage };
            case 'restore-player':
                return { ...state, player: action.payload.player };
            case 'update-player':
                const updatedPlayer: Player = {
                    name: '',
                    playerUUID: '',
                    ...state.player,
                    ...action.payload.player,
                };
                return { ...state, player: updatedPlayer };
            default:
                throw new Error();
        }
    }, initialState);

    return <GameStore.Provider value={{ gameState, gameDispatch }}>{children}</GameStore.Provider>;
};

export { GameStore, GameStoreProvider };
