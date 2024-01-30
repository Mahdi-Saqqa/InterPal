const express = require('express');
const app = express();
const cors = require('cors');
const SocketChat = require('./controllers/ChatSocket.controller')
require('./config/mongoose.config');
app.use(cors({
    origin: '*',
}));
const server = app.listen(8000, () => console.log("Listening on port 8000"));
const io = require('socket.io')(server, { cors: true });

app.use(express.json());
app.use(express.urlencoded({extended:true}));
require('./routes/routes')(app);

io.on('connection', socket => {
    socket.on("chat message", async data => {
        console.log(data);

        try {
            // Assuming SocketChat is an asynchronous function
            await SocketChat(io, socket, data);
            
            // Now that SocketChat has finished, you can safely broadcast the "newChat" event
            socket.broadcast.emit("newChat", data);

        } catch (err) {
            // Emit an error event to the current client
            console.error(err);
            socket.emit('error', { message: 'Failed to create a new chat', error: err.message });
        }
    });
});