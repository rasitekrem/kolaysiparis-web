const express = require('express');
const router = express.Router();
const Restaurant = require("../models/restaurantModel");
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');

router.post('/getcategories', (req, res) => {
    console.log(req.body.data)
    Restaurant.findById(req.body.data.restaurantId)
        .then(restaurant => {
            res.json({
                categories: restaurant.categories
            })
        })
  })
router.post('/usercart', (req,res) => { 
    console.log(req.body.data)
    const { restaurantId, table, product } = req.body.data
    Cart.findOne({
        restaurantId
      })
      .then(carts => {
          let resCart = {};
        if (carts) {
          let itemIndex = carts.carts.findIndex(item => item.table == table);
          if (itemIndex > -1) {
              let productIndex = carts.carts[itemIndex].products.findIndex(item => item.key == product.key);
              if (productIndex > -1) {
                  carts.carts[itemIndex].products[productIndex].count += product.count
                  carts.carts[itemIndex].products[productIndex].totalPrice = carts.carts[itemIndex].products[productIndex].count * carts.carts[itemIndex].products[productIndex].price
                  let cartTotalPrice = 0.0;
                  carts.carts[itemIndex].products.forEach(item => {
                      cartTotalPrice += (item.totalPrice)
                  });
                  carts.carts[itemIndex].totalPrice = cartTotalPrice
              } else {
                carts.carts[itemIndex].products.push({
                      ...product,
                      totalPrice: +product.price * product.count
                })
                carts.carts[itemIndex].totalPrice += (+product.price * product.count)
              }
              resCart = carts.carts[itemIndex];
              //masada adisyon açılmış onun senaryosu yapılacak
          } else {
              resCart = {
                table,
                products: [{ 
                    ...product,
                    totalPrice: +product.price * product.count
                }],
                totalPrice: +product.price * product.count
              };
              carts.carts.push(resCart);
          }
          Cart.updateOne({ restaurantId: carts.restaurantId }, carts, (err) => { console.log(err) });
          res.json({ cart: resCart })
        } else {
            resCart = {
                table,
                products: [{ 
                    ...product,
                    totalPrice: +product.price * product.count
                }],
                totalPrice: +product.price * product.count
              }
          let carts = new Cart({
            restaurantId: restaurantId,
            carts: [{...resCart}]
          })
          carts.save()
          res.json({ cart: resCart })
        }
      })
});
router.post('/changecount',(req,res) => {
    const { restaurantId, table, product } = req.body.data
    Cart.findOne({
        restaurantId
        })
        .then(carts => {
        let resCart = {};
        if (carts) {
            let itemIndex = carts.carts.findIndex(item => item.table == table);
            if (itemIndex > -1) {
                let productIndex = carts.carts[itemIndex].products.findIndex(item => item.key == product.key);
                if (productIndex > -1) {
                    carts.carts[itemIndex].products[productIndex].count = product.count
                    carts.carts[itemIndex].products[productIndex].totalPrice = carts.carts[itemIndex].products[productIndex].count * carts.carts[itemIndex].products[productIndex].price
                    let cartTotalPrice = 0.0;
                    carts.carts[itemIndex].products.forEach(item => {
                        cartTotalPrice += (item.totalPrice)
                    });
                    carts.carts[itemIndex].totalPrice = cartTotalPrice
                    resCart = carts.carts[itemIndex];
                } 
            } 
            Cart.updateOne({ restaurantId: carts.restaurantId }, carts, (err) => { console.log(err) });
            res.json({ cart: resCart })
        } else {
            res.json({ cart: resCart })
        }
        })
})
router.post('/takingorder',(req,res) => {
        const { restaurantId, table, products, totalPrice } = req.body.data;
        Order.findOne({
            restaurantId
          })
          .then(order => {
              const resOrder = {
                table,
                products,
                totalPrice,
                status: 'Sipariş Hazırlanıyor'
              }
            if (order) {
              let itemIndex = order.orders.findIndex(item => item.table == req.body.data.table);
              if (itemIndex > -1) {
                order.orders[itemIndex] = resOrder;
              } else {
                order.orders.push(resOrder)
              }
              Order.updateOne({
                restaurantId: order.restaurantId
              }, order, (err) => {
                console.log(err)
              });
              res.json({
                order: resOrder
              })
            } else {
              let newOrder = new Order({
                restaurantId,
                orders: [{...resOrder}]
              })
              newOrder.save()
              res.json({
                order: resOrder,
                status: true
              })
            }
          })
          .catch(err => res.json({
            status: false,
            order: null
          }))
  })
module.exports = router;