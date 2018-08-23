const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose
  .connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: Array,
  cousine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: '//images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, Min: 0 },
  creator: String,
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
Recipe.deleteMany().then(() => {
  Recipe.insertMany(data).then(() => {
    Recipe.find()
      .then(recipes => {
        console.log('All the recipes:');
        console.log(recipes);
      })
      .then(() => {
        Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
          .then(console.log('Correction Printed'))
          .catch(console.log('Duration error'));
      })
      .then(() => {
        Recipe.deleteOne({ title: 'Carrot Cake' }).then(console.log('deleted carrot cake'));
      })
      .then(() => {
        mongoose.disconnect();
      });
  });
});
