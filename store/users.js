const mongoose = require('mongoose');
const { string } = require('joi');
// const { string } = require('joi');

const FileSchema = new mongoose.Schema({
  fileName: {
      type: String,
  },
});

const UserSchema = new mongoose.Schema({
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
  images:[FileSchema],
});

const model = mongoose.model('User',UserSchema);


const getUsers = async ()=> {
    return await model.find().lean();
}

const getUserById = async (id) => {
  console.log(id);
  let user = {}
  try{
    user  = await model.findOne({_id : id}).lean();
  }catch(error){
  }
  return  user;
}

const getUserByEmail = async (email) => {
  // console.log(email);
  let user = {}
  try {
    user  = await model.findOne({email :email}).lean();
  } catch (error) {
    console.log(error)
  }
  return user;
};

const addUser = async (user) => {
  try {
    let users = await getUsers();
    user.id = users.length + 1
  } catch (error) {
    user.id = 0;
  }
  

  const newUser = new model({
    id : user.id,
    name : user.name,
    email: user.email,
    password: user.password,
  });

  user.images.forEach(image => {
   newUser.images.push(image);
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
