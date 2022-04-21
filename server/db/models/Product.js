const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  instrument: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isIn: {
        args: [['Bass', 'Guitar']],
        msg: 'Must be bass or guitar',
      },
    },
  },

  make: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },

  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://clipartix.com/wp-content/uploads/2016/04/Guitar-clip-art-image-free-clipart-images.jpeg',
  },

  model: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  year: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  color: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  condition: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Product;
