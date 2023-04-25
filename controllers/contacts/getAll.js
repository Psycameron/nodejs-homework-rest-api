const { Contact } = require("../../models/contact");
// const { paginate } = require("mongoose-paginate-v2");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  const options = {
    page,
    limit,
    select: "-createdAt -updatedAt",
    populate: {
      path: "owner",
      select: "email subscription",
    },
  };

  const result = await Contact.paginate({ owner }, options);

  res.json(result);
};

module.exports = getAll;
