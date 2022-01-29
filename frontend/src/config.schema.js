import Joi from "joi-browser";

export const schemaMovie = {
  _id: Joi.string(),
  title: Joi.string().required(),
  genre: Joi.string().required(),
  numberInStock: Joi.number().min(0).max(100).required(),
  dailyRentalRate: Joi.number().min(0).max(10).required(),
  createdAt: Joi.string(),
  description: Joi.string().required(),
  liked: Joi.bool(),
  publishedAt: Joi.string(),
  updatedAt: Joi.string(),
};

export const schemaUser = {
  email: Joi.string().required().email().label("Email"),
  password: Joi.string().required().min(5).label("Password"),
  username: Joi.string().required().label("Username"),
};

export const schemaLogin = {
  identifier: Joi.string().required().email().label("Email"),
  password: Joi.string().required().min(5).label("Password"),
  // username: Joi.string().required().label("Username"),
};
