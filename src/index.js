const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const engine = require('ejs-mate');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// middlewares

// routes
app.use(require('./routes'));

// sockets
require('./sockets')(io);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
server.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});

