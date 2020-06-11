
const express = require('express');
const app = express();
const port = process.env.PORT  || 3000 ;
const server = app.listen(port)

app.use(express.static('public'));

console.log("Socket server is running. localhost:" + port)

const socket = require('socket.io')
const io = socket(server);

io.sockets.on('connection', newConnection)

function newConnection(socket){
	console.log('connection:',	socket.id);
	socket.on('mouse', mouseMsg);

	function mouseMsg(data) {
		socket.broadcast.emit('mouse', data)
		console.log(data)
	}
}
