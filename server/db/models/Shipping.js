const Sequelize = require('sequelize')
const db = require('../db')

const shippingInfo = db.define('shippingInfo', {
  streetAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  apartmentNumber: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  zipCode: {
    type: Sequelize.STRING,
    allowNull: false,
  }

})

module.exports = shippingInfo;
