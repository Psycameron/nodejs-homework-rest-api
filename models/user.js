const { Schema, model } = require("mongoose");
const Joi = require("joi");

// const { handleSaveErrors } = require("../helpers");

const emailRegexp =
  /^[A-Za-z0-9][A-Za-z0-9._%+-]*@[A-Za-z0-9][A-Za-z0-9.-]+\.[A-Za-z]{1,}$/;

const subscriptionType = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionType,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

// userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp).messages({
    "string.pattern.base": "Email is not valid",
  }),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...subscriptionType),
});

const schemas = {
  registerSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
