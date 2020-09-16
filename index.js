const env = require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");

const categories = require("./routes/categories");
const listings = require("./routes/listings");
const listing = require("./routes/listing");
const users = require("./routes/users");
const user = require("./routes/user");
const auth = require("./routes/auth");
const my = require("./routes/my");
const messages = require("./routes/messages");
const expoPushTokens = require("./routes/expoPushTokens");
const chats = require("./routes/chats");
const helmet = require("helmet");
const compression = require("compression");
const config = require("config");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(compression());

app.use("/api/categories", categories);
app.use("/api/listing", listing);
app.use("/api/listings", listings);
app.use("/api/user", user);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/my", my);
app.use("/api/expoPushTokens", expoPushTokens);
app.use("/api/messages", messages);
app.use("/api/chats", chats);

const port = process.env.PORT || config.get("port");

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser:true, useUnifiedTopology:true}, ()=>{
  console.log("Connection to database success...");
});
app.listen(port, function() {
  console.log(`Server started on port ${port}...`);
});
