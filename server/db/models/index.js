const User = require('./user');
const Cart = require('./cart');
const Activity = require('./activity');
const Celebrity = require('./celebrity');
const Purchase = require('./purchase');
const Celebtivity = require('./celebtivity');
const db = require('../db');
const Sequelize = require('sequelize');


Celebrity.belongsToMany(Activity, { through: Celebtivity });
Celebtivity.belongsToMany(User, { through: Cart });

Purchase.belongsTo(Celebrity);
Purchase.belongsTo(Activity);
Purchase.belongsTo(User);

module.exports = {
  User,
  Cart,
  Activity,
  Celebrity,
  Purchase,
  Celebtivity
};
