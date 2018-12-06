const Sequelize = require('sequelize');
const db = require('../db');

const Celebrity = db.define('celebrity', {
    fullName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    hourlyPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    availabilities: {
        type: Sequelize.ARRAY(Sequelize.DATE),
        allowNull: false,
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    review: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }

});

Celebrity.prototype.getCelebrityWithAvailabilities = (id) => {
  return Celebrity.find({
    where: {id: id},
    include: {all: true}
  })
  // .then(function(celebritiyWithActivity){
  //   return celebritiyWithActivity;
  // });
};

module.exports = Celebrity;
