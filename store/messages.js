const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
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
  {
    return await model.find({toUser : toUserId}).lean();
  }
const deleteMessageById = async (id) =>{
  let status = 500;
  try {
    let response = await model.deleteOne({_id : id});
    status = 200  
  } catch (error) {
    status = 500
  }
  return status;
}

const add = async(message) => {
  // message.id = messages.length + 1;
  message.dateTime = Date.now();
  let newMessage = new model({...message ,fromUser:message.fromUserId, toUser: message.toUserId})
  let response = {};
  try {
    response = await newMessage.save();  
  } catch (error) {
    console.log(error);
  } 
  return response;
};

module.exports = { add, getMessagesForUser, deleteMessageById };


