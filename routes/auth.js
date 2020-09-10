const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const usersStore = require("../store/users");
const validateWith = require("../middleware/validation");
const userMapper = require('../mappers/user')

const schema = {
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
};

router.post("/", validateWith(schema), async (req, res) => {
  const { email, password } = req.body;
  let user = {};
  try {
    user = await usersStore.getUserByEmail(email);
  } catch (error) {
  } 
  if (!user || user.password !== password){
    return res.status(400).send({ error: "Invalid email or password." });
  } 
  let resource = userMapper.mapper(user);
  const token = jwt.sign(
    { userId: resource._id, name: resource.name, email, images:resource.images },
    "jwtPrivateKey"
  );
  res.send(token);
});

module.exports = router;
