const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('shopping cart', {
  name: {
    type: Sequelize.STRING, // default value, this.owner.name shopping cart?
  },
});
