import { List, Map } from 'immutable';
import { expect } from 'chai';
import { setEntries, next } from '../src/core';

/*
We have our immutable unit tests under immutable_spec.js
Now we aim on trying out 'loading in' a collection of entries.
*/

describe('application logic', () => {
    describe('setEntries', () => {
        it('adds the entries to the state', () => {
            const state = Map();
            // """USING LIST VS ARRAY"""
            // const entries = List.of('Trainspotting', '28 Days Later');
            const entries = ['Trainspotting', '28 Days Later'];
            const nextState = setEntries(state, entries);
            
            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 Days Later')
            }));
        });
    });

    describe('next', () => {
        it('Takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
            });
            const nextState = next(state);
            
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                entries: List.of('Sunshine')
            }));
        });
    });
});