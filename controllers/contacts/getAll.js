const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner }, "-createdAt -updateAt").populate(
    "owner",
    "email subscription"
  );
  res.json(result);
};

module.exports = getAll;
