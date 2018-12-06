const router = require('express').Router();
const { Purchase } = require('../db/models');

router.get('/', (req, res, next) => {
  Purchase.findAll()
    .then(purchases => res.json(purchases))
    .catch(next);
})

router.get('/:id', (req, res, next) => {
  Purchase.findById(req.params.id)
    .then(purchase => res.json(purchase))
    .catch(next);
})

router.get('/user/:userId', (req, res, next) => {
  Purchase.findAll({
    where: {userId: req.params.userId},
    include: {all: true},
  })
    // .then(userPurchases => {
    //   userPurchases.user = getUser(req.params.userId);
    //   return userPurchases;
    // })
    .then(userPurchases => res.json(userPurchases))
    .catch(next);
})

router.post('/', (req, res, next) => {
  Purchase.create(req.body)
    .then(newPurchase => res.json(newPurchase))
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  Purchase.findById(req.params.id)
    .then(purchase => {
      if (!purchase) {
        return res.sendStatus(404);
      } else {
        return Purchase.update(req.body);
      }
    })
    .then(updatedPurchase => res.send(updatedPurchase))
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  Purchase.destroy({
    where: { id: req.params.id }
  })
    .then(rowsDeleted => {
      res.sendStatus(204);
    })
    .catch(next);
})

module.exports = router;
