import React, { createContext, useContext, useReducer } from 'react';
const LocationContext = createContext({
    latitude: null,
    longitude: null,
});

const initialState = {
    currentLocation: {
        latitude: null,
        longitude: null,
    },
};

const locationReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_LOCATION':
            return {
                ...state,
                currentLocation: {...state.currentLocation, ...action.payload},
            };
        case 'REMOVE_LOCATION':
            return {
                ...state,
                currentLocation: {
                    latitude: null,
                    longitude: null,
                }
            };
        default:
            return state;
    }
};

export const LocationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(locationReducer, initialState);

    return (
        <LocationContext.Provider value={{ state, dispatch }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationContext = () => useContext(LocationContext);