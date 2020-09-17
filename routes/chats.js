const express = require("express");
const router = express.Router();
const multer = require("multer");
const imageResize = require("../middleware/imageResize")
const {Expo} = require("expo-server-sdk");

const auth = require("../middleware/auth");
const validateWith = require("../middleware/validation");
const messageStore = require("../store/messages");
const chatsMapper = require("../mappers/chats");
const usersStore = require("../store/users");
const sendPushNotification = require("../utilities/pushNotifications");

const upload = multer({
    dest: "uploads/",
    limits: { fieldSize: 25 * 1024 * 1024 },
})

router.get("/:sellerid/:buyerid/:listingid",[
      auth,
    ], 
    async (req, resp) => {
        sellerdId = req.params.sellerid;
        buyerId  = req.params.buyerid;
        listingId = req.params.listingid;
        let id = '5f56fb77ddbda93564b7248b'

        console.log(`${sellerdId} - ${buyerId} - ${listingId}`);
        let response = [];
        let HttpStatus = 200;
        try {
            let data = await messageStore.getChatsForTopic(sellerdId, buyerId, listingId);
            response = data.map(chat=>chatsMapper(chat,id));
            HttpStatus = 200;
        } catch (error) {
            HttpStatus = 400;
        }
                
        
        resp.status(HttpStatus).send(response);    
});
router.post("/", 
    [
        auth,
        upload.array("images", "4"),
        imageResize, 
    ], 
    async (req, res)=>{
        let chatMessage = {
            message: req.body.chatMessage,
            fromUserId: req.body.fromUser,
            toUserId: req.body.toUser,
            listingId:req.body.listing,
            images:req.images.map((fileName) => ({ fileName: fileName }))
        }

        try{
            await messageStore.add(chatMessage);
            
            let targetUser = [];
            try {
                targetUser = await usersStore.getUserById(chatMessage.toUserId);  
                const { expoPushToken } = targetUser;
                if (Expo.isExpoPushToken(expoPushToken))
                  await sendPushNotification(expoPushToken, chatMessage.message);

            } catch (error) {
                console.log(error);
            } 
            res.status(201).send();
        }catch{
            res.status(400).send("User Error");
        }
        
    });

module.exports = router;    