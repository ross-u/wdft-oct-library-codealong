var express = require('express');
var router = express.Router();

const Book = require('./../models/Book');

// GET   /books
router.get('/', function(req, res, next) {
  Book.find()
    .then(allBooksFromDB => {
      res.render('books', { allBooksFromDB });
    })
    .catch(err => console.log(err));
});

// GET /books/add     --RENDERS THE FORM
router.get('/add', (req, res, next) => {
  res.render('book-add');
});

// POST /books/add  -- HANDLES INCOMING DATA
router.post('/add', (req, res, next) => {
  console.log(req.body);

  const { title, author, description, rating } = req.body;

  Book.create({ title, author, description, rating })
    .then(book => {
      res.redirect('/books');
    })
    .catch(err => console.log(err));
});

module.exports = router;
