import React, { createContext, useReducer } from 'react';

const initialState = {
    stage: 'setup',
};
const GameStore = createContext();

const GameStoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'default':
                return state;
            default:
                throw new Error();
        }
    }, initialState);

    return <GameStore.Provider value={[state, dispatch]}>{children}</GameStore.Provider>;
};

export { GameStore, GameStoreProvider };
