import React, { createContext, useReducer } from 'react';
import { Player } from './models/player.model';

type Stage = 'lobby' | 'labyrinth-creation' | 'assignments';

/** Reducer State */
type InitialState = {
    stage: Stage;
    player: Player;
};
const initialState: InitialState = {
    stage: 'lobby',
    player: { name: '', playerUUID: '', role: '', archetype: '', coordinates: [] },
};

/** Reducer Actions */
type Actions = 'next-stage' | 'restore-player' | 'update-player';
type PlayerPayload = {
    player: Player;
};
type GameStagePayload = {
    stage: Stage;
};
type Payload = PlayerPayload | GameStagePayload;

/** Game Context */
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
                const nextStagePayload = action.payload as GameStagePayload;
                return { ...state, stage: nextStagePayload.stage };
            case 'restore-player':
                const restorePlayerPayload = action.payload as PlayerPayload;
                return { ...state, player: restorePlayerPayload.player };
            case 'update-player':
                const updatePlayerPayload = action.payload as PlayerPayload;
                return {
                    ...state,
                    player: {
                        ...state.player,
                        ...updatePlayerPayload,
                    },
                };
            default:
                throw new Error();
        }
    }, initialState);

    return <GameStore.Provider value={{ gameState, gameDispatch }}>{children}</GameStore.Provider>;
};

export { GameStore, GameStoreProvider };
