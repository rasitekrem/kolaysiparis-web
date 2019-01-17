const express = require('express');
const router = express.Router();
const Restaurant = require("../models/restaurantModel");
const verifyToken = require('../middleware/verifytoken')
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');

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
            let itemIndex = carts.carts.findIndex(item => item.table == req.body.data.table);
            if (itemIndex > -1) {
                let productIndex = carts.carts[itemIndex].products.findIndex(item => item.key == req.body.data.product.key);
                if (productIndex > -1) {
                    carts.carts[itemIndex].products[productIndex].count += req.body.data.product.count
                    carts.carts[itemIndex].products[productIndex].totalPrice = carts.carts[itemIndex].products[productIndex].count * carts.carts[itemIndex].products[productIndex].price
                    let cartTotalPrice = 0.0;
                    carts.carts[itemIndex].products.forEach(item => {
                        cartTotalPrice += (item.totalPrice)
                    });
                    carts.carts[itemIndex].totalPrice = cartTotalPrice
                } else {
                  carts.carts[itemIndex].products.push({
                        ...req.body.data.product,
                        totalPrice: req.body.data.product.price * req.body.data.product.count
                  })
                  carts.carts[itemIndex].totalPrice += (req.body.data.product.price * req.body.data.product.count)
                }
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
            }
            Cart.updateOne({ restaurantId: carts.restaurantId }, carts, (err) => { console.log(err) });
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
router.post('/changecount',(req,res) => {
  User.findById(req.decode.id)
    .then(user => {
      Cart.findOne({
          restaurantId: user.restaurantId
        })
        .then(carts => {
          if (carts) {
            let itemIndex = carts.carts.findIndex(item => item.table == req.body.data.table);
            if (itemIndex > -1) {
                let productIndex = carts.carts[itemIndex].products.findIndex(item => item.key == req.body.data.product.key);
                if (productIndex > -1) {
                    carts.carts[itemIndex].products[productIndex].count = req.body.data.product.count
                    carts.carts[itemIndex].products[productIndex].totalPrice = carts.carts[itemIndex].products[productIndex].count * carts.carts[itemIndex].products[productIndex].price
                    let cartTotalPrice = 0.0;
                    carts.carts[itemIndex].products.forEach(item => {
                        cartTotalPrice += (item.totalPrice)
                    });
                    carts.carts[itemIndex].totalPrice = cartTotalPrice
                } 
            } 
            Cart.updateOne({ restaurantId: carts.restaurantId }, carts, (err) => { console.log(err) });
            res.json({ carts })
          } else {
            res.json({ carts })
          }
        })
    })
})
router.post('/removeproduct',(req,res) => {
  User.findById(req.decode.id)
    .then(user => {
      Cart.findOne({
          restaurantId: user.restaurantId
        })
        .then(carts => {
          if (carts) {
            let itemIndex = carts.carts.findIndex(item => item.table == req.body.data.table);
            if (itemIndex > -1) {
                let products = carts.carts[itemIndex].products.filter(item => item.key !== req.body.data.product.key);   
                if (products.length == 0) {
                  carts.carts = carts.carts.filter(item => item.table !== req.body.data.table);
                } else {
                  carts.carts[itemIndex].products = products
                  let cartTotalPrice = 0.0;
                    carts.carts[itemIndex].products.forEach(item => {
                        cartTotalPrice += (item.totalPrice)
                    });
                    carts.carts[itemIndex].totalPrice = cartTotalPrice
                } 
            } 
            Cart.updateOne({ restaurantId: carts.restaurantId }, carts, (err) => { console.log(err) });
            res.json({ carts })
          } else {
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
          if (carts) {
            res.json({
              status: true,
              carts
            })
          } else {
            res.json({
              status: true,
              carts: []
            })
          }
        })
        .catch(err => res.json({status: false,carts : [] }))
    })
})
router.post('/takingorder',(req,res) => {
  User.findById(req.decode.id)
    .then(user => {
      Order.findOne({restaurantId : user.restaurantId})
        .then(order => {
          if (order) {
            let itemIndex = order.orders.findIndex(item => item.table == req.body.data.table);
            if (itemIndex > -1) {
              order.orders[itemIndex] = {
                table: req.body.data.table,
                products: req.body.data.products,
                totalPrice: req.body.data.totalPrice,
                status: 'Sipariş Hazırlanıyor'
              }
            } else {
              order.orders.push({
                table: req.body.data.table,
                products: req.body.data.products,
                totalPrice: req.body.data.totalPrice,
                status: 'Sipariş Hazırlanıyor'
              })
            }
            Order.updateOne({ restaurantId: order.restaurantId }, order, (err) => { console.log(err) });
            res.json({ orders: order.orders, status: true })
          } else {
             let newOrder = new Order({
              restaurantId: user.restaurantId,
              orders: [{
                table: req.body.data.table,
                products: req.body.data.products,
                totalPrice: req.body.data.totalPrice,
                status: 'Sipariş Hazırlanıyor'
              }]
            })
            newOrder.save()
            res.json({ orders: newOrder.orders, status: true })
          }
        })
        .catch(err => res.json({status: false,carts : null }))
    })
})
router.post('/checkorders',(req,res) => {
  User.findById(req.decode.id)
    .then(user => {
      Order.findOne({restaurantId : user.restaurantId})
        .then(orders => {
          if (orders) {
            res.json({
              status: true,
              orders
            })
          } else {
            res.json({
              status: false,
              orders: []
            })
          }
          
        })
        .catch(err => res.json({status: false,orders : [] }))
    })
})
router.post('/changeorderstatus',(req,res) => {
  User.findById(req.decode.id)
    .then(user => {
      Order.findOne({restaurantId : user.restaurantId})
        .then(order => {
          order.orders = req.body.data.additions
          console.log(order)
          Order.updateOne({ restaurantId: order.restaurantId }, order, (err) => { console.log(err) });
          res.json({
            status: true,
            orders: order
          })
        })
        .catch(err => res.json({status: false,orders : null }))
    })
})
router.post('/history', (req, res) => {

})
module.exports = router;
