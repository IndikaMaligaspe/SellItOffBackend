const config = require("config");
// const users = require("../store/users");

function mapper (user) {
  const baseUrl = config.get("assetsBaseUrl");
  const imageURL =  image => ({
    url: `${baseUrl}${image.fileName}_thumb.jpg`,
  });

  return {
    ...user,
    images: user.images.map(imageURL)
  };
};


module.exports.mapper = mapper; 