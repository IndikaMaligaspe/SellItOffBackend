const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
  fileName: {
      type: String,
  },
})

const MessageSchema = mongoose.Schema({
  content: String,
  fromUser: String,
  toUser: String,
  listingId: String,
  dateTime: {
    type: Date,
    default:Date.now,
  },
  images:[FileSchema],
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

const getChatsForTopic = async (sellerdId, buyerId, listingId) =>{
   let chats = [];
   try {
     chats = await model.find({$or :[{listingId:listingId, fromUser:sellerdId, toUser:buyerId}, 
                                        {listingId:listingId, toUser:sellerdId, fromUser:buyerId}]}).sort('dateTime').lean();
     return chats;
   } catch (error) {
     return error; 
   }
}

const add = async(message) => {
  // message.id = messages.length + 1;
  message.dateTime = Date.now();
  let newMessage = new model({
    content:message.message ,
    fromUser:message.fromUserId, 
    toUser: message.toUserId, 
    listingId:message.listingId})

  message.images.forEach(image => {
    newMessage.images.push(image);
  });
  let response = {};
  try {
    response = await newMessage.save();  
  } catch (error) {
    console.log(error);
  } 
  return response;
};

module.exports = { add, getMessagesForUser, deleteMessageById , getChatsForTopic };


