const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("ShoppingCart", {
  name: {
    type: Sequelize.STRING, // default value, this.owner.name shopping cart?
  },
  items: [], // array of product objects
});
