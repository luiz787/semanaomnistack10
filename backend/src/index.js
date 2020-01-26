const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');

const { setupWebsocket } = require('./websocket');

mongoose.connect('mongodb+srv://nodejs_app:Mp3xVUx5G3LF9huV@cluster0-nlt72.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const server = http.Server(app);

setupWebsocket(server);

app.use(express.json());
app.use(cors());
app.use(routes);

server.listen(1337);
