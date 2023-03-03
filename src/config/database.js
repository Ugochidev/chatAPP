// require dependencies
const mongoose =  require ("mongoose");
const environment = require ("./environment");

const connectDB = async () => {
  try {
    await mongoose.connect(environment.dbUrl);
    console.log("Database Connected");
  } catch (error) {
    throw new Error("Database not Connected");
  }
};

module.exports = connectDB
