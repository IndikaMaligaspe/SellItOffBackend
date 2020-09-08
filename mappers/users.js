const config = require("config");
// const users = require("../store/users");

const mapper = user => {
  const baseUrl = config.get("assetsBaseUrl");
  const mapImage = image => ({
    url: `${baseUrl}${image.fileName}_thumb.jpg`,
  });

  return ({
    ...user,
    images: user.images.map(mapImage)
  });
};

module.exports = mapper;