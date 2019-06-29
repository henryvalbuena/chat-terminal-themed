// server.js
var express = require("express");
var app     = express();
var http    = require("http");
var server  = http.Server(app);
// setup socket.io
var io = require("socket.io")(server);
var port = process.env.PORT || 3000;

app.use(express.static("public"));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/white-rabbit", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", socket => {
    socket.on("message", msg => {
        io.emit("message", msg);
    });
});

server.listen(port, () => {
    console.log("Connected...");
});
