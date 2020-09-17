const express = require("express");
const router = express.Router();
const Joi = require("joi");

const usersStore = require("../store/users");
const auth = require("../middleware/auth");
const validateWith = require("../middleware/validation");

router.post(
  "/",
  [auth, validateWith({ token: Joi.string().required() })],
  async (req, res) => {
    const user = await usersStore.getUserById(req.user.userId);
    if (!user) return res.status(400).send({ error: "Invalid user." });
    console.log(req.body.token); 
    newUser = {...user, expoPushToken:req.body.token}
    await usersStore.setExpoPushToken(newUser);
    console.log("User registered for notifications: ", user);
    res.status(201).send();
  }
);

module.exports = router;
