const User = require("../models/user.model");

// User can see a list of all registered users

const viewUsers = async (req, res) => {
  try {
    const getUser = await User.find().select("-password");

    return res.status(200).json({
      message: "Users fetched sucessfully",
      getUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { viewUsers };
