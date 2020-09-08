const express = require("express");
const router = express.Router();

const usersStore = require("../store/users");
const listingsStore = require("../store/listings");
const auth = require("../middleware/auth");
const userMapper = require("../mappers/user");

router.get("/:id", auth, async (req, res) => {
  const userId = req.params.id;
  let user = {}
  try{
    user = await usersStore.getUserById(userId);
  }catch(error){
    return res.status(404).send();
  }
  
  if (!user) return res.status(404).send();
  const listings = listingsStore.filterListings(
    listing => listing.userId === userId
  );
  const resources = userMapper.mapper(user);

  res.send({
    id: resources.id,
    name: resources.name,
    email: resources.email,
    images: resources.images,
    listings: listings.length
  });
});

module.exports = router;
