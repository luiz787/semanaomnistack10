import socketio from 'socket.io-client';

const socket = socketio('http://192.168.0.44:1337', {
  autoConnect: false,
});

const subscribeToNewDevelopers = (subscribeFunction) => {
  socket.on('new-dev', subscribeFunction);
};

const connect = (latitude, longitude, technologies) => {
  socket.io.opts.query = {
    latitude,
    longitude,
    technologies,
  };

  socket.connect();
};

const disconnect = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export {
  connect,
  disconnect,
  subscribeToNewDevelopers,
};
