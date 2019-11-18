var express = require('express');
var router = express.Router();

const Book = require('./../models/Book');
const Author = require('./../models/Author');

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

  Author.findOne({ name: author })
    .then(authorObj => {
      const author = [authorObj._id];

      Book.create({ title, author, description, rating }).then(book => {
        res.redirect('/books');
      });
    })
    .catch(err => console.log(err));
});

// GET  /books/edit
router.get('/edit', (req, res, next) => {
  console.log(req.query);

  const { _id } = req.query;

  // GET THE BOOK FROM DB

  Book.findOne({ _id })
    .then(book => {
      // RENDER THE FORM WITH BOOK DATA
      res.render('book-edit', { book });
    })
    .catch(err => console.log(err));
});

// POST /books/edit
router.post('/edit', (req, res, next) => {
  const { _id } = req.query;
  const { title, author, description, rating } = req.body;

  // UPDATE THE BOOK
  Book.updateOne({ _id }, { title, author, description, rating }, { new: true })
    .then(updatedBook => {
      //  REDIRECT TO THE LIST OF BOOKS
      res.redirect('/books');
    })
    .catch(err => console.log(err));
});

// GET /books/details/:bookId
router.get('/details/:bookId', (req, res, next) => {
  const { bookId } = req.params;

  // GET THE BOOK AND RENDER IT

  Book.findById(bookId)
    .populate('author')
    .then(oneBook => {
      res.render('book-details', { oneBook });
    })
    .catch(err => console.log(err));
});

module.exports = router;
