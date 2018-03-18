// Server file...! 8000 will be our database --- Plan at least.
// Client port will need to connect to 8090 as well!
import Server from 'socket.io';

export default function startServer() {
    const io = new Server().attach(8090);
    
    // Socket.io needs to send state to all active connections via JSON-serialized snapshot
    // If app gets too large or too many users, we should specifiy what info to send/broadcast and less used bandwidth
    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );

    // Clients need to listen to the connection as changes occur! (client gets server udpates as they happen to stay up-to-date)
    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
        // Clients to emit an action to feed into Redux store, moving election forward via NEXT
        socket.on('action', store.dispatch.bind(store));
        // Remote actions are not being accepted...
    });
}