const Sequelize = require('sequelize');
const db = require('../db');

const orderProduct = db.define('orderProduct', {
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 1,
    },
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  }
});

module.exports = orderProduct;
