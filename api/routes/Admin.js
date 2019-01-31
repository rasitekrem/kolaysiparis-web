const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const Restaurant = require("../models/restaurantModel");
const verifyToken = require('../middleware/verifytoken')
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const Histories = require('../models/historyModel');

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
router.post('/addcartnote',(req,res) => {
  User.findById(req.decode.id)
    .then(user => {
      Cart.findOne({
          restaurantId: user.restaurantId
        })
        .then(carts => {
          if (carts) {
            let itemIndex = carts.carts.findIndex(item => item.table == req.body.data.table);
            if (itemIndex > -1) {
                carts.carts[itemIndex].note = req.body.data.note
            }
            Cart.updateOne({ restaurantId: carts.restaurantId }, carts, (err) => { console.log(err) }); 
            res.json({ carts })
          } else {
            res.json({ carts: [] })
          }
        })
        .catch(err => {
          res.json({ carts: [] })
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
                note: req.body.data.note ? req.body.data.note : '',
                status: 'Sipariş Hazırlanıyor'
              }
            } else {
              order.orders.push({
                table: req.body.data.table,
                products: req.body.data.products,
                totalPrice: req.body.data.totalPrice,
                note: req.body.data.note ? req.body.data.note : '',
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
                note: req.body.data.note ? req.body.data.note : '',
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
  const date = new Date()
  const year = date.getFullYear()
  const day = date.getDate()
  let month = date.getMonth() + 1
  if (month < 10) {
      month = '0' + month
  }
  const toDay = day + '/' + month + '/' + year

  User.findById(req.decode.id)
  .then(user => {
    Histories.findOne({restaurantId : user.restaurantId})
      .then(result => {
        if (result) {
          if (result.datas.length > 0) {
              let toDayIndex = result.datas.findIndex(item => item.historyDate === toDay)
              if(toDayIndex > -1) {
                if (result.datas[toDayIndex].histories) {
                  result.datas[toDayIndex].histories.push({
                    table: req.body.data.table,
                    products: req.body.data.products,
                    totalPrice: req.body.data.totalPrice,
                    payMethod: req.body.data.payMethod,
                    date: new Date().getTime()
                 })
                } else {
                  result.datas[toDayIndex].histories = [{
                    table: req.body.data.table,
                    products: req.body.data.products,
                    totalPrice: req.body.data.totalPrice,
                    payMethod: req.body.data.payMethod,
                    date: new Date().getTime()
                }]
                }
              Histories.updateOne({ restaurantId: result.restaurantId }, result, (err) => { console.log(err) });
              }  
          }
          res.json({ histories: result })
        } else {
          res.json({ histories: [] })
        }
        
      })
      .catch(err => res.json({status: false,histories : [] }))
  })
})
router.post('/checkhistory',(req,res) => {
  User.findById(req.decode.id)
    .then(user => {
      Histories.findOne({restaurantId : user.restaurantId})
        .then(histories => {
          if (histories) {
              res.json({ histories })
          } else {
            res.json({ histories: [] })
          }
        })
        .catch(err => res.json({status: false,histories : [] }))
    })
})
router.post('/daystart', (req,res) => {
  const date = new Date()
  let hour = date.getHours()
  let minute = date.getMinutes()
  const year = date.getFullYear()
  const day = date.getDate()
  let month = date.getMonth() + 1
  let time = ''
  if (month < 10) {
      month = '0' + month
  }
  if (hour < 10 && minute < 10) {
    time = '0' + hour + ':0' + minute
  } else if(hour < 10){
    time = '0' + hour + ':' + minute
  } else {
    time = hour + ':0' + minute
  }
  const toDay = day + '/' + month + '/' + year
  User.findById(req.decode.id)
  .then(user => {
    Histories.findOne({restaurantId : user.restaurantId})
      .then(result => {
        if (result) {
          if (result.datas.length > 0) {
              let toDayIndex = result.datas.findIndex(item => item.historyDate === toDay)
              if(toDayIndex > -1) {
                result.datas[toDayIndex].isOpen = true
              } else {
                result.datas.push({
                  historyDate : toDay,
                  openTime: time,
                  isOpen: true
                })
              } 
          } else {
            result.datas = [{
              historyDate : toDay,
                openTime: time,
                isOpen: true
            }]
          }
          Histories.updateOne({ restaurantId: result.restaurantId }, result, (err) => { console.log(err) });
          res.json({ histories: result })
        } else {
          let newHistory = new Histories({
            restaurantId: user.restaurantId,
            datas: [{
                historyDate : toDay,
                openTime: time,
                isOpen: true
            }]
          })
          newHistory.save()
          res.json({ histories: newHistory })
        }
        
      })
      .catch(err => res.json({status: false,histories : [] }))
  })
})
router.post('/endofday', (req,res) => {
  const date = new Date()
  let hour = date.getHours()
  let minute = date.getMinutes()
  const year = date.getFullYear()
  const day = date.getDate()
  let month = date.getMonth() + 1
  let time = ''
  if (month < 10) {
      month = '0' + month
  }
  if (hour < 10 && minute < 10) {
    time = '0' + hour + ':0' + minute
  } else if(hour < 10){
    time = '0' + hour + ':' + minute
  } else {
    time = hour + ':0' + minute
  }
  const toDay = day + '/' + month + '/' + year
  User.findById(req.decode.id)
  .then(user => {
    Histories.findOne({restaurantId : user.restaurantId})
      .then(result => {
        if (result) {
          if (result.datas.length > 0) {
              let toDayIndex = result.datas.findIndex(item => item.historyDate === toDay)
              if(toDayIndex > -1) {
                result.datas[toDayIndex].isOpen = false
                result.datas[toDayIndex].closeTime = time
              } 
              Histories.updateOne({ restaurantId: result.restaurantId }, result, (err) => { console.log(err) });
          } 
          res.json({ histories: result })
        } 
      })
      .catch(err => res.json({status: false,histories : [] }))
  })
})
router.post('/closeaddition',(req,res) => {
  User.findById(req.decode.id)
    .then(user => {
      Cart.findOne({restaurantId : user.restaurantId})
        .then(carts => {
          carts.carts = carts.carts.filter(cart => 
            cart.table !== req.body.data.table
          )
          Cart.updateOne({ restaurantId: carts.restaurantId }, carts, (err) => { console.log(err) });
          Order.findOne({restaurantId : user.restaurantId})
            .then(orders => {
              orders.orders = orders.orders.filter(order =>  order.table !== req.body.data.table)
              Order.updateOne({ restaurantId: orders.restaurantId }, orders, (err) => { console.log(err) });
              res.json({ orders, carts })
            })
        })
        .catch(err => res.json({status: false,histories : [] }))
    })
})
router.post('/savepassword',(req,res) => {
  const {
    newPassword,
    renewPassword,
    oldPassword
  } = req.body.data
  User.findById(req.decode.id)
  .then(user => {
    if (renewPassword !== newPassword) {
      res.json({
        status: false,
        message: "Parolalar uyuşmuyor"
      })
    } else {
      bcrypt.compare(oldPassword, user.password).then((result) => {
        if (result) {
          bcrypt.hash(newPassword, 10).then((newhash) => {
            user.password = newhash
            user.save((err) => {
              if (err) {
                res.json({
                  status: false,
                  message: err.message
                })
              } else {
                res.json({
                  status: true,
                  message: "Şifre değiştirildi."
                })
              }
            })
          })
        } else {
          res.json({
            status: false,
            message: "Eski şifre hatalı!"
          })
        }
      })
    }
  })
})
router.post('/restaurantinfo',(req,res) => {
  User.findById(req.decode.id)
  .then(user => {
    if (user) {
        Restaurant.findById(user.restaurantId)
          .then(restaurant => {
              if(restaurant) {
                res.json({ restaurantInfo : restaurant })
              } else {
                res.json({ restaurantInfo: {}})
              }
          })
    } else {
      res.json({ restaurantInfo: {}})
    }
  })
})
router.post('/restaurantupdate',(req,res) => {
  Restaurant.findByIdAndUpdate(req.body.data.restaurantData._id, req.body.data.restaurantData, {new: true}, (err, model) => {
    if (err) {
      res.json({ status: false, message: err.message })
    } else {
      res.json({ status: true, message: 'Bilgiler değiştirildi.' })
    }
  })
})
router.post('/updatetables' , (req,res) => {
  User.findById(req.decode.id)
  .then(user => {
    if (user) {
        Restaurant.findById(user.restaurantId)
          .then(restaurant => {
              restaurant.tables = req.body.data.tables
              restaurant.save((err) => {
                if (err) {
                  res.json({ status: false, tables: req.body.data.tables })
                } else {
                  res.json({ status: true, tables: req.body.data.tables })
                }
              })
          })
    } 
  })
})
router.post('/updatecategories',(req,res) => {
  User.findById(req.decode.id)
  .then(user => {
    if (user) {
        Restaurant.findById(user.restaurantId)
          .then(restaurant => {
              restaurant.categories = req.body.data.categories
              restaurant.save((err) => {
                if (err) {
                  res.json({ status: false, categories: req.body.data.categories })
                } else {
                  res.json({ status: true, categories: req.body.data.categories })
                }
              })
          })
    } 
  })
})
router.post('/addpersonal',(req,res) => {
  const {
    username,
    password,
    authority
  } = req.body.data;
  User.findById(req.decode.id)
  .then(user => {
    bcrypt.hash(password, 10).then((hash) => {
      const personal = new User({
        username,
        password: hash,
        authority,
        role: 'Personal',
        restaurantId: user.restaurantId,
      });
      const promise = personal.save();
      promise.then((data) => {
        res.json({ personal: data })
      }).catch((err) => {
        res.json({
          status: false,
          message: err.message
        })
      })
    })
  })
})
router.post('/getpersonal',(req,res) => {
  User.findById(req.decode.id)
  .then(user => {
    User.find({ restaurantId: user.restaurantId, role: 'Personal'})
      .then(personals => {
        if (personals) {
          res.json({ personals })
        } else {
          res.json({ personals: [] })
        }
      })
      .catch(err => res.json({ personals: [] }))
  })
  .catch(err => res.json({ personals: [] }))
})
router.post('/updatepersonal',(req,res) => {
  let personal = req.body.data.personal
  
  bcrypt.hash(personal.password, 10).then((hash) => {
    personal.password = hash
    User.findByIdAndUpdate(personal._id,personal, { new: true },(err,model) => {
      if (err) {
        res.json({ status: false })
      } else {
        res.json({ status: true })
      }
    })
    .catch(err => {
      console.log(err.message)
      res.json({ status: false })
    })
  })
})
router.post('/getauthority',(req,res) => {
  User.findById(req.decode.id)
  .then(user => {
    if(user) {
      res.json({ authority: { ...user.authority, role: user.role } })
    } else {
      res.json({ authority: {}})
    }
  })
  .catch(err => res.json({ authority: {}}))
})
module.exports = router;
