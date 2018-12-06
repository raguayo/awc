const Sequelize = require('sequelize');
const db = require('../db');

const Celebtivity = db.define('celebtivity', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  price: {
    type: Sequelize.FLOAT,
    // allowNull: false,
  },
});

Celebtivity.prototype.setPrice = function(price) {
  this.price = price;
};


module.exports = Celebtivity;
