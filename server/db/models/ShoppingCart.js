const Sequelize = require('sequelize');
const db = require('../db');

<<<<<<< HEAD
module.exports = db.define('shopping cart', {
  name: {
    type: Sequelize.STRING, // default value, this.owner.name shopping cart?
  },
=======
module.exports = db.define('ShoppingCart', {
  name: {
    type: Sequelize.STRING, // default value, this.owner.name shopping cart?
  },
  // userId: {
  //   defaultValue: 1234,
  // },

>>>>>>> 39f63a1da22f0978315fa8d528235b637443eb9c
});
