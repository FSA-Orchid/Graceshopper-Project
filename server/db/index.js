//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const ShoppingCart = require("./models/ShoppingCart");
const OrderProducts = require("./models/OrderProducts");
//associations could go here!

Product.belongsToMany(ShoppingCart, { through: OrderProducts });
ShoppingCart.belongsToMany(Product, { through: OrderProducts });
User.hasMany(ShoppingCart);
ShoppingCart.belongsTo(User);

module.exports = {
  db,
  User,
  Product,
  ShoppingCart,
  OrderProducts
};
