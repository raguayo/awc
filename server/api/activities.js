const router = require('express').Router()
const { Activity } = require('../db/models')

router.get('/', (req, res, next) => {
  Activity.findAll()
    .then(activities => res.json(activities))
    .catch(next);
});

router.get('/active', (req, res, next) => {
  Activity.findAll({ where: { active: true } })
    .then(activeActivities => res.json(activeActivities))
    .catch(next);
});

router.get('/inactive', (req, res, next) => {
  Activity.findAll({ where: { active: false } })
    .then(inactiveActivities => res.json(inactiveActivities))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Activity.findById(req.params.id)
    .then(activity => res.json(activity))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Activity.create(req.body)
    .then(newActivity => res.json(newActivity))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Activity.findById(req.params.id)
    .then(activity => {
      if (!activity) {
        return res.sendStatus(404);
      } else {
        return activity.update(req.body);
      }
    })
    .then(updatedActivity => res.send(updatedActivity))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Activity.destroy({
    where: { id: req.params.id }
  })
    .then(rowsDeleted => {
      res.sendStatus(204);
    })
    .catch(next);
})

module.exports = router;
