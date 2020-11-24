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
type PlayerAction = {
    type: 'restore-player' | 'update-player';
    payload: {
        player: Player;
    };
};
type StageAction = {
    type: 'next-stage';
    payload: {
        stage: Stage;
    };
};

type GameActions = PlayerAction | StageAction;

/** Game Context */
interface IGameContext {
    gameState: InitialState;
    gameDispatch: React.Dispatch<GameActions>;
}
const GameStore = createContext({} as IGameContext);

// TODO: Split this into different child reducers if state grows too large
/** Context + useReducer is a state management alternative to Redux */
const GameStoreProvider = ({ children }: any) => {
    const [gameState, gameDispatch] = useReducer((state: InitialState, action: GameActions) => {
        switch (action.type) {
            case 'next-stage':
                const nextStagePayload = (action as StageAction).payload;
                return { ...state, stage: nextStagePayload.stage };
            case 'restore-player':
                const restorePlayerPayload = (action as PlayerAction).payload;
                return { ...state, player: restorePlayerPayload.player };
            case 'update-player':
                const updatePlayerPayload = (action as PlayerAction).payload;
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
