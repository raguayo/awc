const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'));
router.use('/celebrities', require('./celebrities'));
router.use('/cart', require('./cart'));
router.use('/activities', require('./activities'));
router.use('/celebtivities', require('./celebtivities'));
router.use('/purchases', require('./purchases'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
