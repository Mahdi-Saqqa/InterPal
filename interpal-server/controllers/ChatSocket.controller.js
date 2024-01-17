const Chat = require("../models/chat.model");
const User = require("../models/user.model");
const Message = require("../models/message.model");
async function newChat(io, socket, data) {
  try {
    const { sender, receiver, message } = data;

    // Check if there's an existing chat between users
    const existingChat = await Chat.findOne({ users: { $all: [sender, receiver] } });

    if (existingChat) {
      const newMessage = new Message({ chat: existingChat._id, sender, content: message });
      const messageObject = await newMessage.save();
      existingChat.messages.push(messageObject._id);
      existingChat.lastMessage = messageObject._id;
      existingChat.lastMessageDate = Date.now();
      await existingChat.save();

      // Emit a message event to all connected clients
      io.emit('newMessage', { chatId: existingChat._id, message: messageObject });

      return existingChat;
    }

    // Create a new chat and message
    const newChat = new Chat({ users: [sender, receiver] });
    const chat = await newChat.save();

    const newMessage = new Message({ chat: chat._id, sender, content: message });
    const messageObject = await newMessage.save();

    chat.messages.push(messageObject._id);
    chat.users = [sender, receiver];

    // Save the updated chat
    const updatedChat = await chat.save();

    // Update user documents with the new chat
    await Promise.all([
      User.findByIdAndUpdate(sender, { $push: { chats: updatedChat._id } }),
      User.findByIdAndUpdate(receiver, { $push: { chats: updatedChat._id } })
    ]);

    // Emit a newChat event to all connected clients
    io.emit('newChat', updatedChat);

    return updatedChat;
  } catch (err) {
    // Emit an error event to the current client
    socket.emit('error', { message: 'Failed to create a new chat', error: err.message });
  }
}

module.exports = newChat;
