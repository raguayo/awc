const db = require('../db');
const Bluebird = require('bluebird');


const { activities, users, celebrities } = require('./data');

//helper function for seeding
const seedEntity = async (entityArr, entityName) => {
    console.log(`we are now seeding ${entityName} entity`);
    await Bluebird.map(entityArr, async entity => {
        return await db.models[entityName].create(entity);
    });
};

//main seed function to export
const runSeedEntities = async () => {
    await seedEntity(users, 'user');
    await seedEntity(celebrities, 'celebrity');
    await seedEntity(activities, 'activity');
};

module.exports = runSeedEntities;
