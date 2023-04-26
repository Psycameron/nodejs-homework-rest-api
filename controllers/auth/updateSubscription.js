const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await User.findByIdAndUpdate(owner, req.body, {
    new: true,
  });
  console.log(`🚀 ~ updateSubscription ~ result:`, result);

  res.status(200).json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = updateSubscription;
