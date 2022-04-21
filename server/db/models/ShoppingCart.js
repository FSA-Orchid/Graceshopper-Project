const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("ShoppingCart", {
  orderFilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
