const Sequelize = require('sequelize');
const db = require('../db');


const Activity = db.define('activity', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        // allowNull: false,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
    },
    location: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    }
});

Activity.prototype.getDuration = () => {
    return (this.duration === 1) ? (`${this.duration} hour`) : (`${this.duration} hours`);
};

module.exports = Activity;
