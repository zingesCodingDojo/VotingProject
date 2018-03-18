import { List, Map } from 'immutable';

// initialState will always be a hashmap (Map) for our app and it would be okay to declar a variable here and import it to test files.
export const INITIAL_STATE = Map();

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

/*
!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!
The below function was the initial next function but was modified to 
better fit the voting needs of winners and losers.
Instead of simply having a predictable next, our program has a slightly more
robust next detection... now it can see entry A vs entry B and progress based on
which had more votes!

export function next(state){
    const entries = state.get('entries');
    return state.merge({
        vote: Map({pair: entries.take(2)}),
        entries: entries.skip(2)
    });
}
!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

/* merge()
Returns a new Map resulting from merging the provided Collections into this new Map.
Takes each entry of each collection and sets it on this new Map.

https://facebook.github.io/immutable-js/docs/#/Map
skip()
Returns a new Collection of the same type which excludes the first amount entries from this Collection.
skip(amount: number): this
*/

export function vote( voteState, entry ) {
    return voteState.updateIn(
    ['tally', entry],
    0,
    tally => tally + 1
    );
}

/*
Exporting the next function will utilize the getWinners function to obtain the leading/winning
Movie
*/

function getWinners( vote ) {
    if( !vote ) {
        return [];
    }
    
    const [a, b] = vote.get('pair');
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);
    
    if( aVotes > bVotes ) {
        return [a];
    } else if( aVotes < bVotes ) {
        return [b];
    } else {
        return [a, b];
    };
}

export function next( state ) {
    const entries = state.get('entries').concat(getWinners(state.get('vote')));
    
    if( entries.size == 1) {
        return state.remove('vote').remove('entries').set('winner', entries.first());
    } else {
        return state.merge({
            vote: Map({ pair: entries.take(2) }),
            entries: entries.skip(2)
        });
    }
}