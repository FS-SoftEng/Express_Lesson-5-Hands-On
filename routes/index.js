

var express = require('express');
var router = express.Router();

const mysql = require('mysql2'); 

const models = require('../models'); 

const Sequelize = require('sequelize');

const Op = Sequelize.Op;


/* GET home page. */

router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });

});


router.get('/categories', function(req, res, next) {
  
  models.category.findAll({}).then(foundCategories => {
    
    // const mappedCategories = foundCategories.map(category => ({
    //   CategoryID: category.category_id,
    //   Name: category.name,
    //   DefaultPrice: category.default_price
    // }));

    // res.send(JSON.stringify(mappedCategories));

    res.render(`categories`, {categories: foundCategories});
  });

});


router.post('/category', (req, res) => {
  models.category
    .findOrCreate({
      where: {
        name: req.body.name,
        default_price: req.body.default_price
      }
    })

    .spread(function(result, created) {

      if (created) {

        res.redirect('/categories');

      } else {

        res.send('This category already exists!');
      }
  });

});


  router.get('/category/:id', function(req, res, next) {

    let categoryID = parseInt(req.params.id); 
  
    models.category
      .findOne({
        where: {
          category_id: categoryID
        }
      })
  
      .then(category => {
        console.log(category);
        res.render('categoryByID', {
          category: category
        });
  
      });
  
  });

module.exports = router;
