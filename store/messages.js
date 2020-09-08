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


// const messages = [
//   {
//     fromUserId: 2,
//     toUserId: 1,
//     listingId: 1,
//     content: "Is this still available?",
//     id: 1,
//     dateTime: 1586044521956
//   },
//   {
//     fromUserId: 2,
//     toUserId: 1,
//     listingId: 1,
//     content: "I'm interested in this item. Do you provide free delivery?",
//     id: 2,
//     dateTime: 1586044521956
//   },
//   {
//     fromUserId: 2,
//     toUserId: 1,
//     listingId: 1,
//     content: "Please give me a call and we'll arrange this for you.",
//     id: 3,
//     dateTime: 1586044521956
//   }
// ];
