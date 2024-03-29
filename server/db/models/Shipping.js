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
  firstName:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
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
