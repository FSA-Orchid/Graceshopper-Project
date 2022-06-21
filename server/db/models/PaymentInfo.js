const Sequelize = require('sequelize')
const db = require('../db')

const paymentInfo = db.define('paymentInfo', {
  streetAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  apartmentNumber: {
    type: Sequelize.STRING,
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
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  cardNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  securityCode: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  experationDate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cardType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn : {
        args: [["American Express", "Visa", "Mastercard", "Discover"]],
        msg: "Must be a major brand Credit Card!"
      }
    }
  },

})

module.exports = paymentInfo;
