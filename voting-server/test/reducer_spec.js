import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import reducer from '../src/reducer';

/*
Our generic function will take an action along with current state and invoke
core function that matches action.
- Reducer
Below all three actions will be tested. Entries, next, vote.
*/

describe('reducer', () => {
    it('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = { type: 'SET_ENTRIES', entries: ['Trainspotting']};
        const nextState = reducer(initialState, action); // initialState can be written as undefined because reducers understand how to use undefined.

        expect(nextState).to.equal(fromJS({
            entries: ['Trainspotting']
        }));
    });

    it('handles NEXT', () => {
        const initialState = fromJS({
            entries: ['Trainspotting', '28 Days Later']
        });
        const action = { type: 'NEXT'};
        const nextState = reducer( initialState, action );

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        }));
    });

    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        });
        const action = { type: 'VOTE', entry: 'Trainspotting' };
        const nextState = reducer( initialState, action );

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: { Trainspotting: 1 }
            },
            entries: []
        }));
    });

    // Reducer's fulfill contracts of a reduce callback function. Allowing past collected actions to be reduced into current state.
    // These actions/objects can also be serialized to JSON!
    it('can be used with reduce', () => {
        const actions = [
            { type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later'] },
            { type: 'NEXT' },
            { type: 'VOTE', entry: 'Trainspotting' },
            { type: 'VOTE', entry: '28 Days Later' },
            { type: 'VOTE', entry: 'Trainspotting'},
            { type: 'NEXT' }
        ];
        const finalState = actions.reduce(reducer, Map());

        expect(finalState).to.equal(fromJS({
            winner: 'Trainspotting'
        }));
    });

});