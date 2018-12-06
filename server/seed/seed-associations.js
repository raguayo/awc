const db = require('../db');
const Bluebird = require('bluebird');
const Chance = require('chance');
const chance = new Chance();

//helper randomizer function
const helperUniqueItemsGenerator = (arr, limit) => {
  const uniqueArr = [];
  const numToChoose = limit ? limit : Math.floor(Math.random() * arr.length / 2) + 1;
  while (uniqueArr.length < numToChoose) {
    const newItem = arr[Math.floor(Math.random() * arr.length)];
    if (uniqueArr.indexOf(newItem) > -1) continue;
    else uniqueArr.push(newItem);
  }
  return uniqueArr;
};

//Seeding celebtivities
/*-----------------------------------------------------------------------*/

//Celebtivities: individual seed functions
const seedCelebsActivities = async (celebrities, activities) => {
  console.log('we are now seeding celebs activities');
  await Bluebird.map(celebrities, async celebrity => {
    const activitiesToAdd = helperUniqueItemsGenerator(activities);
    return await celebrity.addActivities(activitiesToAdd);
  });
};

const seedCelebtivityPrices = async (celebtivities) => {
  console.log('we are now seeding celebtivity prices');
  // console.log('celebtivities', celebtivities);
  await Bluebird.map(celebtivities, async celebtivity => {
    // return await celebtivity.setPrice(chance.floating({ fixed: 2, min: 0, max: 10000 }));
    return await celebtivity.update( 
      { price: chance.floating({ fixed: 2, min: 0, max: 10000 }) 
    });
  });
};

//Celebtivities: joint seed function
const seedCelebtivities = async (celebrities, activities) => {
  console.log('we are now seeding celebtivities');
  await seedCelebsActivities(celebrities, activities);
  const celebtivities = await db.models.celebtivity.findAll();
  await seedCelebtivityPrices(celebtivities);
};

//Seeding cart
/*-----------------------------------------------------------------------*/
const seedCartItems = async (users, celebtivities) => {
  console.log('we are now seeding cart items');
  await Bluebird.map(users, async user => {
    const celebtivitiesToAdd = helperUniqueItemsGenerator(celebtivities);
    celebtivitiesToAdd.forEach(async celebtivity => {
      return await db.models.cart.create({userId: user.id, celebtivityId: celebtivity.id, activityTime: chance.date({ year: 2017 })});
    });
  });
}

//Seeding purchases
/*-----------------------------------------------------------------------*/
const seedPurchases = async users => {
  console.log('we are now seeding orders/purchases');
  await Bluebird.map(users, async user => {
    const cartsToAdd = await db.models.cart.findAll({ where: { userId: user.id } });
    let orderId = await db.models.purchase.findAll()
    orderId = orderId.length;
    return await Bluebird.map(cartsToAdd, async cart => {
      const celebtivityId = cart.celebtivityId;
      const relevantCelebtivity = await db.models.celebtivity.findOne({ where: { id: celebtivityId } });
      const celebrityId = relevantCelebtivity.celebrityId;
      const activityId = relevantCelebtivity.activityId;
      const activityTime = cart.activityTime;
      const userId = user.id;
      const order = { userId, celebrityId, activityId, activityTime, orderId };
      return await db.models.purchase.create(order);
    })
  });
}

//Main seed function to export
/*-----------------------------------------------------------------------*/


const runSeedAssociations = async () => {

  const activities = await db.models.activity.findAll();
  const celebrities = await db.models.celebrity.findAll();
  const users = await db.models.user.findAll();

  await seedCelebtivities(celebrities, activities);
  const celebtivities = await db.models.celebtivity.findAll();
  await seedCartItems(users, celebtivities);
  await seedPurchases(users);
};

module.exports = runSeedAssociations;
