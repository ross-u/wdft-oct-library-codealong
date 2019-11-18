var express = require('express');
var router = express.Router();

// GET   /books
router.get('/', function(req, res, next) {
  res.render('books');
});

// GET /books/add
router.get('/add', (req, res, next) => {
  res.render('book-add');
});

module.exports = router;
