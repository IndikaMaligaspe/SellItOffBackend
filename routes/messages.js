const express = require("express");
const mapper = require("../mappers/user")
const router = express.Router();
const Joi = require("joi");
const { Expo } = require("expo-server-sdk");

const usersStore = require("../store/users");
const listingsStore = require("../store/listings");
const messagesStore = require("../store/messages");
const sendPushNotification = require("../utilities/pushNotifications");
const auth = require("../middleware/auth");
const validateWith = require("../middleware/validation");

const schema = {
  listingId: Joi.string().required(),
  message: Joi.string().required(),
};

router.get("/", auth, async (req, res) => {
  let messages = []
  try {
    messages = await messagesStore.getMessagesForUser(req.user.userId); 
  } catch (error) {
    console.log(error);
  }

  const mapUser = async (userId) => {
    let newUser = {}
    try{
      newUser = await usersStore.getUserById(userId)
    }catch(error){

    }  
    const user = mapper.mapper(newUser);
    return { _id: user._id, name: user.name, images:user.images };
  };

   const resp =  await Promise.all(messages.map( async (message) => ({
      _id: message._id,
      listingId: message.listingId,
      dateTime: message.dateTime,
      content: message.content,
      fromUser: await mapUser(message.fromUser),
      toUser:   await mapUser(message.toUser),
   })));
  res.send(resp);
});

router.post("/", 
  [ auth, 
    // validateWith(schema)
  ], async (req, res) => {
  const { listingId, message } = req.body;
  let listing = [];
  try {
    listing = await listingsStore.getListing(listingId); 
    console.log(listing)
  } catch (error) {
    console.log(error);
    
  }
  if (!listing) return res.status(400).send({ error: "Invalid listingId." });

  let targetUser = [];
  try {
    targetUser = await usersStore.getUserById(listing.userId);  
  } catch (error) {
    console.log(error);
  }
  
  if (!targetUser) return res.status(400).send({ error: "Invalid userId." });

  await messagesStore.add({
    fromUserId: req.user.userId,
    toUserId: listing.userId,
    listingId,
    content: message,
  });

  const { expoPushToken } = targetUser;

  if (Expo.isExpoPushToken(expoPushToken))
    await sendPushNotification(expoPushToken, message);

  res.status(201).send();
});

router.delete("/:id",async(req,res) =>{
   let messageId = req.params.id;
   let status = 401;
   try{
     status = await messagesStore.deleteMessageById(messageId);
   }catch(error){
     console.log(error);

   }
   console.log(status);
   res.status(status).send();
});
module.exports = router;
