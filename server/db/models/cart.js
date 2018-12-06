const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  activityTime: {
    type: Sequelize.DATE,
    allowNull: false,
  }
});

// Cart.prototype.getCartWithCelebtivities = (userId) => {
//   return Cart.find({
//     where: { userId: userId },
//     include: { all: true }
//   })
//     .then(function (cartWithCelebtivities) {
//       return cartWithCelebtivities;
//     });
// };

module.exports = Cart;
