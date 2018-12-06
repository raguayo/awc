const runSeedEntities = require('./seed-entities');
const runSeedAssociations = require('./seed-associations');

const runSeed = async () => {
   await runSeedEntities();
   await runSeedAssociations();
};

// module.exports = runSeed; //uncomment if you want to run upon startup

runSeed(); //for use with npm run seed script
