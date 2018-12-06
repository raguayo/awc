const router = require('express').Router();
const { Celebrity, Activity, Celebtivity } = require('../db/models');

router.get('/', (req, res, next) => {
  Celebrity.findAll({
    include: { model: Activity }
  })
    .then(celbetivities => res.json(celbetivities))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  	Celebtivity.findOne({
      where: {
        id: req.params.id
      },
      include: {all: true}
    })
		.then(celebtivity => res.json(celebtivity))
		.catch(next);
});

router.post('/', (req, res, next) => {
  Celebtivity.create(req.body)
    .then(newCelebtivity => res.json(newCelebtivity))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Celebtivity.findById(req.params.id)
    .then(celebtivity => {
      if (!celebtivity) {
        return res.sendStatus(404);
      } else {
        return celebtivity.update(req.body);
      }
    })
    .then(updatedCelebtivity => res.send(updatedCelebtivity))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Celebtivity.destroy({
    where: { id: req.params.id }
  })
    .then(rowsDeleted => {
      res.sendStatus(204);
    })
    .catch(next);
})

router.delete('/:celebrityId/:activityId', (req, res, next) => {
  Celebtivity.destroy({
    where: {
      activityId: req.params.activityId,
      celebrityId: req.params.celebrityId,
    }
  })
  .then(deleted => {
    res.sendStatus(204);
  })
  .catch(next)
})


module.exports = router;
