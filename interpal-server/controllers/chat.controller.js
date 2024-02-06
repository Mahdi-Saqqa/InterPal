const Chat = require("../models/chat.model");
const User = require("../models/user.model");
const Message = require("../models/message.model");


module.exports = {
  async newChat(req, res) {
    try {
      const { sender, receiver, message } = req.body;
  
      // Check if there's an existing chat between users
      const existingChat = await Chat.findOne({ users: { $all: [sender, receiver] } });
  
      if (existingChat) {
        const newMessage = new Message({ chat: existingChat._id, sender, content: message });
        const messageObject = await newMessage.save();
        existingChat.messages.push(messageObject._id);
        existingChat.lastMessage = messageObject._id;
        existingChat.lastMessageDate = Date.now();
        await existingChat.save();
        res.json(existingChat); 
        return;
      }
      console.log("new chat");
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
  
      res.json(updatedChat);
    } catch (err) {
      res.status(400).json(err);
    }
  },  
      
      
    getChat(req, res) {

        Chat.findById(req.body.id)
        .populate({
            path: 'users',
            select: 'Fname Lname profilePic', // Specify the fields you want to select from the users
        })
        .populate({
            path: 'messages',
            populate: {
                path: 'sender',
                select: 'Fname Lname', // Specify the fields you want to select from the sender and receiver
            }
        })

            .then(chat => {
                res.json(chat);
            })
            .catch(err => res.status(400).json(err));
    },
    getUserChat(req, res) {
        User.findById(req.user.id).populate({
          path: 'chats',
          populate: [
            { path: 'users' },      // Populate the 'users' field in each chat
            { path: 'messages' }    // Populate the 'messages' field in each chat
          ]
        })
        .then(user => {
            res.json(user.chats);
        })
        .catch(err => res.status(400).json(err));

    }




    };