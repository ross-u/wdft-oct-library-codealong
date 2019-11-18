const express = require('express');
const router = express.Router();

const booksRouter = require('./books');

// route  /books
router.use('/books', booksRouter);

//
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
