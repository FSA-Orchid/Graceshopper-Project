const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  instrament: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isIn: {
        args: [["bass", "guitar"]],
        msg: "Must be bass or guitar",
      },
    },
  },
  make: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isIn: {
        args: [["Fender", "Squire", "Gibson"]],
        msg: "We dont sell that item. Must be Fender, Squire, or Gibson",
      },
    },
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
