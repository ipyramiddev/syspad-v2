import React, { useState, ReactNode, useContext } from 'react';

const AppContext = React.createContext({
    user: {},
    loading: true,
    setUser: () => { },
    setLoading: () => { },
});

export const AppContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    return (
        <AppContext.Provider
            value={{
                user: currentUser,
                loading: isLoading,
                setUser: setCurrentUser,
                setLoading: setIsLoading,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);