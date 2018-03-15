import { List, Map } from 'immutable';

export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

/*
Alternative, to not use normally understood array "[]", and use List.of() inside the test file,
our export function would look like:

export function setEntries(state, entries) {
    return state.set('entries', entries);
}

Please note using the above funciton would also require edits to the core_spec.js file.
See Note: """USING LIST VS ARRAY"""

*/

export function next(state){
    const entries = state.get('entries');
    return state.merge({
        vote: Map({pair: entries.take(2)}),
        entries: entries.skip(2)
    });
}
/* merge()
Returns a new Map resulting from merging the provided Collections into this new Map.
Takes each entry of each collection and sets it on this new Map.
*/