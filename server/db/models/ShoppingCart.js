const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("cart", {
  orderFilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userEmail: {
    type: Sequelize.STRING,
    allowNull: true,
  }
});
