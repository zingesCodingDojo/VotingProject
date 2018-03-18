/*
Reducers! Generic functions that take any kind of action along with current state
and invokes the core function that matches its action! -- Reducer
*/

// JS ES6 can utilize 'switch' 'case'!!!

import { setEntries, next, vote, INITIAL_STATE } from './core';

export default function reducer(state = INITIAL_STATE, action) {
    // If reducer cannot recognize action, current state will be returned.
    switch (action.type) {
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'NEXT':
            return next(state);
        case 'VOTE':
            return vote(state, action.entry)
    }
    return state;
}