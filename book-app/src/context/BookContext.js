// src/context/BookContext.js
import React, { createContext, useReducer, useContext } from 'react';

const BookContext = createContext();

const bookReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BOOKS':
            return { ...state, books: action.payload };
        default:
            return state;
    }
};

export const BookProvider = ({ children }) => {
    const [state, dispatch] = useReducer(bookReducer, { books: [] });

    return (
        <BookContext.Provider value={{ state, dispatch }}>
            {children}
        </BookContext.Provider>
    );
};

export const useBookContext = () => useContext(BookContext);
