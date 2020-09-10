const express = require("express");
const router = express.Router();

const listingsStore = require("../store/listings");
const auth = require("../middleware/auth");
const listingMapper = require("../mappers/listings");

router.get("/listings", auth, async (req, res) => {
  let listings = [];
  
  try {
    listings = await listingsStore.filterListings(
      listing => listing.userId === req.user.userId
    );  
  } catch (error) {
    
  }
  
  const resources = listings.map(listingMapper);
  res.send(resources);
});

module.exports = router;
