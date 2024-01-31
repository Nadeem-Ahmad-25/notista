const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://yusakhanyk:srdrAuaZfEJlWQui@notista.axnq931.mongodb.net/";

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

module.exports = connectToDatabase;
