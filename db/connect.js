const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected");
    }
  );
};

module.exports = connectDB;
