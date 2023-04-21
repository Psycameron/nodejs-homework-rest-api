const { User } = require("../../models/user");

const RequestError = require("../../helpers/RequestError");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
    // return res.status(409).json({
    //   status: "error",
    //   code: 409,
    //   message: "Email in use",
    //   data: "Conflict",
    // });
  }

  const result = await User.create({ email, password });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: "starter",
    },
  });
};

module.exports = register;
