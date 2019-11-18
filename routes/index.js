const express = require('express');
const router = express.Router();

const booksRouter = require('./books');
const reviewsRouter = require('./reviews');

// Router books
//       *  /books
router.use('/books', booksRouter);
router.use('/reviews', reviewsRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
