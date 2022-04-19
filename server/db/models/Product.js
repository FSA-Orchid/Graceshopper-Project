const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("product", {
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
    validate: {
      isNumeric: true,
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
