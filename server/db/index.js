//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const ShoppingCart = require("./models/ShoppingCart");
//associations could go here!

module.exports = {
  db,
  User,
  Product,
  ShoppingCart,
};
