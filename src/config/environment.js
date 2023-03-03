const dotenv = require("dotenv");
dotenv.config();

const config = {
  port: 5050,
  nodeEnv: process.env.NODE_ENV || "production",
  dbUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.SECRET_TOKEN || "",
};


module.exports = config
