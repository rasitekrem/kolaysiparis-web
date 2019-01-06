const express = require('express');
const router = express.Router();
const Restaurant = require("../models/restaurantModel");
const verifyToken = require('../middleware/verifytoken')
const User = require('../models/userModel');
const Cart = require('../models/cartModel')
router.post('/saverestaurant', (req, res) => {
  const {
    restaurantName,
    address,
    county,
    city
  } = req.body.data.post

  const restaurant = new Restaurant({
    restaurantName,
    address,
    county,
    city,
    adminId: req.decode.id,
    step: 2
  });
  const promise = restaurant.save();
  promise.then((data) => {
    User.findById(req.decode.id)
      .then(user => {
        user.restaurantId = data._id
        user.save()
        res.json({
          status: true
        })
      })
  }).catch((err) => {
    res.json({
      status: false,
      message: err.message
    })
  })

})
router.post('/checkstatus', (req, res) => {
  User.findById(req.decode.id)
    .then(user => {
      if (user.restaurantId === "none") {
        res.json({
          step: 1
        })
      } else {
        Restaurant.findById(user.restaurantId)
          .then(restaurant => {
            if (restaurant) {
              res.json({
                step: restaurant.step
              })
            } else {
              res.json({
                step: 1
              })
            }
          })
      }
    })
})
router.put('/updaterestaurant', (req, res) => {
  Restaurant.findOne({
      adminId: req.decode.id
    })
    .then(restaurant => {
      if (restaurant) {
        if (req.body.data.tables) {
          restaurant.tables = req.body.data.tables
          restaurant.step = 3
        } else {
          restaurant.categories = req.body.data.categories
          restaurant.step = 4
        }
        restaurant.save();
        res.json({
          status: true
        })
      }
    })
    .catch(err => res.json({
      status: false,
      message: err.message
    }))
})
router.post('/gettables', (req, res) => {
  User.findById(req.decode.id)
    .then(user => {
      Restaurant.findById(user.restaurantId)
        .then(restaurant => {
          res.json({
            tables: restaurant.tables
          })
        })
    })
})

router.post('/getcategories', (req, res) => {
  User.findById(req.decode.id)
    .then(user => {
      Restaurant.findById(user.restaurantId)
        .then(restaurant => {
          res.json({
            categories: restaurant.categories
          })
        })
    })
})
router.post('/addcart', (req, res) => {
  User.findById(req.decode.id)
    .then(user => {
      Cart.findOne({
          restaurantId: user.restaurantId
        })
        .then(carts => {
          if (carts) {
            console.log(req.body.data)
            let itemIndex = carts.carts.findIndex(item => item.table == req.body.data.table);
            if (itemIndex > -1) {
                console.log(itemIndex)
                //masada adisyon açılmış onun senaryosu yapılacak
            } else {
                carts.carts.push({
                    table: req.body.data.table,
                    products: [{ 
                        ...req.body.data.product,
                        totalPrice: req.body.data.product.price * req.body.data.product.count
                    }],
                    totalPrice: req.body.data.product.price * req.body.data.product.count
                  })
                  carts.save()
            }
            res.json({ carts })
          } else {
            let carts = new Cart({
              restaurantId: user.restaurantId,
              carts: [{
                  table: req.body.data.table,
                  products: [{ 
                      ...req.body.data.product,
                      totalPrice: req.body.data.product.price * req.body.data.product.count
                  }],
                  totalPrice: req.body.data.product.price * req.body.data.product.count
                }]
            })
            carts.save()
            res.json({ carts })
          }
        })
    })
})
router.post('/getcarts', (req,res) => {
    User.findById(req.decode.id)
    .then(user => {
      Cart.findOne({restaurantId : user.restaurantId})
        .then(carts => {
          res.json({
            status: true,
            carts
          })
        })
        .catch(err => res.json({status: false,carts : null }))
    })
})
router.post('/history', (req, res) => {

})
module.exports = router;
