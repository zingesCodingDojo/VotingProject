// entry point of our application and first const will be to create the redux store! Where our app state lives.
import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
// now server is subscribed to our redux store. Keeping track of its state(s)
startServer(store);

// Require entry file to retreive our json entries so we can have default data to play with.
store.dispatch({
    type: 'SET_ENTRIES',
    entries: require('./entries.json')
});
store.dispatch({ type: 'NEXT' })