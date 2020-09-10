const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  content: String,
  fromUser: String,
  toUser: String,
  listingId: String,
  dateTime: {
    type: Date,
    default:Date.now,
  }
});

const model = mongoose.model('Message',MessageSchema);

const getMessagesForUser = async (toUserId) =>
  await model.find({toUserId : toUserId}).lean();

const add = async(message) => {
  message.id = messages.length + 1;
  message.dateTime = Date.now();
  let newMessage = new model({...message})
  return await newMessage.save();
  // messages.push(message);
};

module.exports = { add, getMessagesForUser };


