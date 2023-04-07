import { useReducer, createContext, useState } from "react";
import Cookies from "js-cookie";

// create context
const Context = createContext({});

const initialState = {
    userInfo: Cookies.get("userInfo")
        ? JSON.parse(Cookies.get("userInfo"))
        : null,
}

function reducer(state, action) {
    switch (action.type) {
        case "UPDATE_STATE":
            return { ...state, userInfo: action.payload };
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