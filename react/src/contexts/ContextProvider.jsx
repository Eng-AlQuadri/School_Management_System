import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    selectedIndex: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
    setSelectedIndex: () => {},
});

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
    const [user, setUserState] = useState(
        JSON.parse(localStorage.getItem("SCHOOL_USER")) || {}
    );

    const [selectedIndex, setSelectedIndex] = useState(
        localStorage.getItem("SCHOOL_LIST")
    );

    useEffect(() => {
        if (user) {
            localStorage.setItem("SCHOOL_USER", JSON.stringify(user));
        } else {
            localStorage.removeItem("SCHOOL_USER");
        }
    }, [user]);

    const [token, _setToken] = useState(localStorage.getItem("SCHOOL_TOKEN"));

    const [notification, _setNotification] = useState(null);

    const setToken = (token) => {
        _setToken(token);

        if (token) {
            localStorage.setItem("SCHOOL_TOKEN", token);
        } else {
            localStorage.removeItem("SCHOOL_TOKEN");
        }
    };

    const setNotification = (notification) => {
        _setNotification(notification);

        setInterval(() => {
            _setNotification("");
        }, 5000);
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                notification,
                selectedIndex,
                setSelectedIndex,
                setUser: setUserState,
                setNotification,
                setToken,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
