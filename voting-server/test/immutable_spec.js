import { expect } from 'chai';
import { List, Map } from 'immutable';

/*
The purpose of this file is to test immutability!
Numbers are immutable and thus this test aims to prove that is indeed the case.

Next we will test an LIST (like an array) with two given elements and then adding an additional element.

Next we will test a MAP (like hashmap) with a key of 'movies' and two default entries. We will add
one additional entry to the 'movies' key.
*/

describe('immutability', () => {
    // Numbers!
    describe('A number', () => {
        function increment(currentState) {
            return currentState + 1;
        }
        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });
    });

    // List similar to an array...!
    describe('A List', () => {
        function addMovie(currentState, movie) {
            return currentState.push(movie);
        }
        it('is immutable', () => {
            let state = List.of('Trainspotting', '28 Days Later');
            let nextState = addMovie(state, 'Sunshine');

            expect(nextState).to.equal(List.of(
                'Trainspotting',
                '28 Days Later',
                'Sunshine'
            ));
            expect(state).to.equal(List.of(
                'Trainspotting',
                '28 Days Later'
            ));
        });
    });

    // Map similar to HashMap...!
    describe('A Tree', () => {
        function addMovie(currentState, movie) {
            return currentState.update('movies', movies => movies.push(movie));
        }
        it('is immutable', () => {
            let state = Map({
                movies: List.of('Trainspotting', '28 Days Later')
            });
            let nextState = addMovie(state, 'Sunshine');

            expect(nextState).to.equal(Map({
                movies: List.of(
                    'Trainspotting',
                    '28 Days Later',
                    'Sunshine'
                )
            }));
            expect(state).to.equal(Map({
                movies: List.of(
                    'Trainspotting',
                    '28 Days Later'
                )
            }));
        });
    });
});