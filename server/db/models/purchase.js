const Sequelize = require('sequelize');
const db = require('../db');

const Purchase = db.define('purchase', {
  activityTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

});


module.exports = Purchase;
