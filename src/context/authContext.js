import { useReducer, createContext, useState } from "react";
import Cookies from "js-cookie";

// create context
const Context = createContext({});

const initialState = {
    userInfo: Cookies.get("userInfo")
        ? JSON.parse(Cookies.get("userInfo"))
        : null,
    favourites: Cookies.get("favItems")
        ? JSON.parse(Cookies.get("favItems"))
        : [],
}

function reducer(state, action) {
    switch (action.type) {
        case "LOGGED_IN_USER":
            return { ...state, userInfo: action.payload };
        case "ADD_TO_FAVOURITE": {
            const newItem = action.payload;
            const existItem = state.favourites?.find(
                (item) => item.id === newItem.id
            );
            const favItems = existItem
                ? state.favourites.map((item) =>
                    item.name === existItem.name ? newItem : item
                )
                : [...state.favourites, newItem];
            Cookies.set("favItems", JSON.stringify(favItems));
            return { ...state, favourites: favItems };
        }
        case "REMOVE_FROM_FAVOURITE": {
            const favItems = state.favourites.filter(
                (item) => item.id !== action.payload.id
            );
            Cookies.set("favItems", JSON.stringify(favItems));
            return { ...state, favourites: favItems };
        }
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