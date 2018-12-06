
const router = require('express').Router();
const { Celebrity } = require('../db/models');

router.get('/', (req, res, next) => {
  Celebrity.findAll({
    include: { all: true }
  })
    .then(celebrities => res.json(celebrities))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Celebrity.findOne({
    where: { id: req.params.id },
    include: { all: true }
  })
    .then(celebrity => res.json(celebrity))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Celebrity.create(req.body)
    .then(newCelebrity => res.json(newCelebrity))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      if (!celebrity) {
        return res.sendStatus(404);
      } else {
        return celebrity.update(req.body);
      }
    })
    .then(updatedCelebrity => res.send(updatedCelebrity))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Celebrity.destroy({
    where: { id: req.params.id }
  })
    .then(rowsDeleted => {
      res.sendStatus(204);
    })
    .catch(next);
})

module.exports = router;
