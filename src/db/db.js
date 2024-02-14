const mongoose = require("mongoose");
const reconnectTimeout = 5000;

function connectdatabase() {
  let confirmconnection;
  
    mongoose.set("strictQuery", false);
    mongoose
      .connect(
        process.env.MONGODB_URL,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then((data) => {
        confirmconnection = true;
       
        console.log(
          `Mongodb is connected with the server :${data.connection.host}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  
}
const db = mongoose.connection;
db.on("connecting", () => {
  console.info("Connecting to MongoDB...");
});

db.on("error", (error) => {
  console.error(`MongoDB connection error: ${error}`);
  mongoose.disconnect();
});

db.on("connected", () => {
  console.info("Connected to MongoDB!");
});

db.on("error", (error) => {
  console.error(`MongoDB connection error: ${error}`);
  mongoose.disconnect();
});

db.on("disconnected", () => {
  console.error(
    `MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`
  );
 
});

module.exports={
  connectdatabase
}
