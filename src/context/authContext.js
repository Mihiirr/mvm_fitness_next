import { fetchUserId } from "@/utils/fetchUser";
import { useReducer, createContext } from "react";

// create context
const Context = createContext({});

function reducer(state, action) {
    switch (action.type) {
        case "LOGGED_IN_USER":
            return { ...state, user: action.payload };
        default:
            return state;
    }
}

// context provider
const Provider = ({ children, initState }) => {
    const [state, dispatch] = useReducer(reducer, initState);
    const value = { state, dispatch };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };