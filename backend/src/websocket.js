const socketio = require('socket.io');
const calculateDistance = require('./utils/calculateDistance');

const connections = [];
let io;

exports.setupWebsocket = (server) => {
  io = socketio(server);

  io.on('connection', (socket) => {
    const {
      latitude,
      longitude,
      technologies,
    } = socket.handshake.query;
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      technologies: technologies.split(',').map((str) => str.trim()),
    });
  });
};

exports.findConnections = (coordinates, technologies) => connections.filter((conn) => calculateDistance(coordinates, conn.coordinates) < 10
  && conn.technologies.some((technology) => technologies.includes(technology)));


exports.sendMessage = (to, message, data) => {
  to.forEach((connection) => {
    io.to(connection.id).emit(message, data);
  });
};
