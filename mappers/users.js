const config = require("config");
// const users = require("../store/users");

const mapper = users => {
  const baseUrl = config.get("assetsBaseUrl");
  const mapImage = image => ({
    url: `${baseUrl}${image.fileName}_thumb.jpg`,
  });

  return {
    ...users,
    images: users.images.map(mapImage)
  };
};

module.exports = mapper;