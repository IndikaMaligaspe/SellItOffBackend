
const mongoose = require("mongoose")

const CategorySchema = mongoose.Schema({
  id:String,
  name:String,
  icon: String,
  backgroundColor: String,
  color:String,
});

const model = mongoose.model('Category', CategorySchema);

const getCategories = async () => {
  let categories = []
  try{
    categories =  await model.find({}).lean();
  }catch(error){
    console.log(error);
  }
  return categories;
}

const getCategory =async  (id) => {
  let category = {}
  try{
    category =  await model.findById(id).lean();
  }catch(error){
    console.log(error);
  }
  return category;
}

const addCategory = async (category) => {
  let categoryObj = new model({
    id:category.id,
    name:category.name,
    icon: category.icon,
    backgroundColor: category.backgroundColor,
    color:category.color,
  });
  return (await categoryObj.save());
}
module.exports = {
  getCategories,
  getCategory,
  addCategory,
};


// const categories = [
//   {
//     id: 1,
//     name: "Furniture",
//     icon: "floor-lamp",
//     backgroundColor: "#fc5c65",
//     color: "white"
//   },
//   {
//     id: 2,
//     name: "Cars",
//     icon: "car",
//     backgroundColor: "#fd9644",
//     color: "white"
//   },
//   {
//     id: 3,
//     name: "Cameras",
//     icon: "camera",
//     backgroundColor: "#fed330",
//     color: "white"
//   },
//   {
//     id: 4,
//     name: "Games",
//     icon: "cards",
//     backgroundColor: "#26de81",
//     color: "white"
//   },
//   {
//     id: 5,
//     name: "Clothing",
//     icon: "shoe-heel",
//     backgroundColor: "#2bcbba",
//     color: "white"
//   },
//   {
//     id: 6,
//     name: "Sports",
//     icon: "basketball",
//     backgroundColor: "#45aaf2",
//     color: "white"
//   },
//   {
//     id: 7,
//     name: "Movies & Music",
//     icon: "headphones",
//     backgroundColor: "#4b7bec",
//     color: "white"
//   },
//   {
//     id: 8,
//     name: "Books",
//     icon: "book-open-variant",
//     backgroundColor: "#a55eea",
//     color: "white"
//   },
//   {
//     id: 9,
//     name: "Other",
//     icon: "application",
//     backgroundColor: "#778ca3",
//     color: "white"
//   }
// ];
