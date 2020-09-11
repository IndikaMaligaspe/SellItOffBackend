const mongoose = require("mongoose")

const FileSchema = new mongoose.Schema({
  fileName: {
      type: String,
  },
});

const ListingSchema = mongoose.Schema({
  title: String,
  images:[FileSchema],
  price: Number,
  categoryId: Number,
  userId: String,
    location:{
      latitude:{type: String},
      longitude:{type:String},
    }
});

const model = mongoose.model('Listing',ListingSchema);


const addListing = async (listing) => {
  let listingObj = new model({
    title:listing.title,
    price: listing.price,
    categoryId: listing.categoryId,
    userId: listing.userId,
    location: listing.location
  });

  listing.images.forEach(image => {
    listingObj.images.push(image);
  });
  return (await listingObj.save());
};

const getListings = async () => await model.find().lean();

const getListing = async (id) => await model.findOne({_id : id}).lean();

const filterListings = async (predicate) => {
  return await model.find({predicate}).lean();
}

module.exports = {
  addListing,
  getListings,
  getListing,
  filterListings,
};
