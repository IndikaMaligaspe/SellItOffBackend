const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  id: {
      type: Number,
      required: true,
  },
  name: {
     type:String,
     required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  images: [{filename:String}],
});

const model = mongoose.model('User',UserSchema);


const getUsers = async ()=> {
    return await model.find().lean();
}

const getUserById = async (id) => {
      return await model.findById(id).lean();
}

const getUserByEmail = async (email) => {
  return await model.exists({email :email});
};

const addUser = async (user) => {
  user.id = users.length + 1;
  const newUser = new model({
    id : user.id,
    name : user.name,
    email: user.email,
    password: user.password,
    images: user.images
  });
  try {
    return newUser.save();
  } catch (error) {
    console.log(error);
  }
  return ;
};

module.exports = {
  getUsers,
  getUserByEmail,
  getUserById,
  addUser,
};

// const users = [
//   {
//     id: 1,
//     name: "Mosh",
//     email: "mosh@domain.com",
//     password: "12345",
//     images:[{ fileName: "Mosh" }],
//   },
//   {
//     id: 2,
//     name: "John",
//     email: "john@domain.com",
//     password: "12345",
//     images:[{ fileName: "John" }],
//   },
// ];
