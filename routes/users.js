const express = require("express");
const router = express.Router();
const Joi = require("joi");
const multer = require("multer");

const imageResize = require("../middleware/imageResize")
const usersStore = require("../store/users");
const validateWith = require("../middleware/validation");
const userMapper = require("../mappers/users");

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});
const schema = {
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
  // images: Joi.object().optional(), 
};


router.post("/", 
  [
    upload.array("images", "1"), 
    // validateWith(schema),
    imageResize,
  ],
 
  (req, res) => {
    console.log(req.body);
    const user = { 
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    user.images = req.images.map((fileName) => ({ fileName: fileName }));
    if (usersStore.getUserByEmail(user.emailemail))
      return res
        .status(400)
        .send({ error: "A user with the given email already exists." });
    usersStore.addUser(user);
    res.status(201).send(user);
});


router.get("/", (req, res) => {
  const users = usersStore.getUsers()
  console.log(users);
  const resources = users.map(userMapper);
  res.send(resources);
});

module.exports = router;
