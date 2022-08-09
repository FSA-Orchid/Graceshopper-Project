const Sequelize = require('sequelize')
const db = require('../db')



const paymentInfo = db.define('paymentInfo', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
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
    type: Sequelize.BIGINT,
    allowNull: false,
    unique: true,
  },
  cardPreview: {
    type: Sequelize.STRING,
  },
  securityCode: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  expirationDate: {
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

const hashCard = async (paymentInfo) => {
  if (paymentInfo.changed('cardNumber')){
    let lastFour = ''
    for(let i = 0; i < paymentInfo.cardNumber.length; i++){
      if(i >= paymentInfo.cardNumber.length - 4){
        lastFour += paymentInfo.cardNumber[i]
      }
      else {
        lastFour += 'X'}
    }
    paymentInfo.cardPreview = lastFour
  }
}


paymentInfo.beforeCreate(hashCard)
paymentInfo.beforeUpdate(hashCard)


module.exports = paymentInfo;
