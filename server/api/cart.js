const router = require('express').Router()
const { Cart } = require('../db/models')

router.get('/', (req, res, next) => {
  Cart.findAll()
    .then(allCartItems => res.json(allCartItems))
    .catch(next);
});

router.get('/:userId', (req, res, next) => {
  Cart.findAll({
    where: { userId: req.params.userId }
  })
    .then(usersCartItems => res.json(usersCartItems))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Cart.create(req.body)
    .then(newCartItem => res.json(newCartItem))
    .catch(next);
});

router.delete('/:userId/:celebtivityId/:activityTime', (req, res, next) => {
  Cart.destroy({
    where: {
      userId: req.params.userId,
      celebtivityId: req.params.celebtivityId,
      activityTime: req.params.activityTime,
    }
  })
    .then(rowsDeleted => {
      res.sendStatus(204);
    })
    .catch(next);
});

module.exports = router;

