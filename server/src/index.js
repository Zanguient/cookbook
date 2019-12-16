const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
const config = require('./config/config')
var db = mongoose.connection;
var Post = require("./models/post-model");

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(config.dbURL, config.dbOptions);
db.on('error', console.error.bind(console, "connection error"));
db.once('open', () => {
  console.log(`Mongoose - successful connection ...`)
  app.listen(process.env.PORT || config.port,
    () => console.log(`Server start on port ${config.port} ...`))
});

// Add new recipe
app.post('/recipes', (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var description = req.body.description;
  var image = req.body.image;
  var created = new Date;
  var new_recipe = new Post({
    title: title,
    description: description,
    image: image,
    created: created
  })
  console.log(req.body)
  new_recipe.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

// Fetch all recipes
app.get('/recipes', (req, res) => {
  Post.find({}, 'title description image created', function (error, recipes) {
    if (error) { console.error(error); }
    res.send({
      recipes: recipes
    })
  }).sort({ _id: -1 })
})

// Fetch single recipe
app.get('/recipe/:id', (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, 'title description image created', function (error, recipe) {
    if (error) { console.error(error); }
    res.send(recipe)
  })
})

// Update a recipe
app.put('/recipes/:id', (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, 'title description image created', function (error, recipe) {
    if (error) { console.error(error); }

    recipe.title = req.body.title
    recipe.description = req.body.description
    recipe.image = req.body.image
    recipe.created = req.body.created
    
    recipe.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a recipe
app.delete('/recipes/:id', (req, res) => {
  var db = req.db;
  Post.remove({
    _id: req.params.id
  }, function (err, recipe) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})
