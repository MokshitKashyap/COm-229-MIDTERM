let mongoose = require('mongoose');

// create a model class
let Movie = mongoose.Schema({
    Title: String,
    Description: String,
    Genre: String
},
{
  collection: "movies"
});

module.exports = mongoose.model('Movie', Movie);
