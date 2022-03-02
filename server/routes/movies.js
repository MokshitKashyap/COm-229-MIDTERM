// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the movie model
let book = require('../models/movies');

/* GET movies List page. READ */
router.get('/', (req, res, next) => {
  // find all moviess in the books collection
  book.find((err, movies) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('moviess/index', {
        title: 'Movies',
        books: movies
      });
    }
  });

});

//  GET the Movie Details page in order to add a new Movie
router.get('/add', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  res.render('movies/details', { movies: { _id: "add" }, title: "Add a new movie" });

});

// POST process the Movie Details page and create a new Movie - CREATE
router.post('/add', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  const newMovie = new movie({
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  });
  newMovie.save()
    .then(() => { console.log("Movie added") })
    .catch(err => { console.log(err) });
  res.redirect('/Movies');

});

// GET the Movie Details page in order to edit an existing Movie
router.get('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  book.findById(req.params.id, (err, task) => {
    if (err) { res.send(500, err) };
    res.render('movies/details', { title: "Update the movie", movies: task })
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  const updateMovie = {
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  };
  book.findByIdAndUpdate(req.params.id, updateMovie)
    .then(() => { console.log("Movie Updated") })
    .catch(err => { console.log(err) });
  res.redirect('/movies');

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  book.findByIdAndRemove(req.params.id)
    .then(() => { console.log("movie deleted") })
    .catch(err => { console.log(err) });
  res.redirect('/movies');

});


module.exports = router;
