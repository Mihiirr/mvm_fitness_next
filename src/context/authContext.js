import { useState, useEffect, useReducer, createContext } from "react";

// create context
const Context = createContext({});

// initial state
const initialState = {
    user: {},
};

function reducer(state, action) {
    switch (action.type) {
        case "LOGGED_IN_USER":
            return { ...state, user: action.payload };
        default:
            return state;
    }
}

// context provider
const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };