const express = require("express");
var http = require("http");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
var server = http.createServer(app);
var io = require("socket.io")(server);

//middlewre
app.use(express.json());
app.use(cors());
var clients = [];

app.get('/', (req, res) => {
    res.status(200).send(clients);
});

app.post('/', (req, res) => {
const user = req.body;
clients.push(user);
console.log(user);
res.status(201).send(user);
});

io.on("connection", (socket) => {
  socket.on('chat message', (msg) => {
  console.log(msg);
    io.emit('chat message', msg);
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log("server started");
});
