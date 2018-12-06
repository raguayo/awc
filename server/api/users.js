const router = require('express').Router();
const { User } = require('../db/models');

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next);
})

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(next);
})

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(newUser => res.json(newUser))
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.sendStatus(404);
      } else {
        return user.update(req.body);
      }
    })
    .then(updatedUser => res.send(updatedUser))
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  User.destroy({
    where: { id: req.params.id }
  })
    .then(rowsDeleted => {
      res.sendStatus(204);
    })
    .catch(next);
})

module.exports = router;
