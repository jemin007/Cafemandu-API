const express = require('express');
const Foods = require('../Model/Food');
const router = express.Router();

router.route("/foods")
    .get(function (req, res) {
        Foods.find(function (err, foundFoods) {
            if (!err) {
              res.json(foundFoods);
            } else {
              console.log(err)
               
            }

        });
    });

    router.route("/foods")
    .post(function (req, res) {
    Foods.create({
    name:req.body.name,
    price:req.body.price,
    image:req.body.image
    }).then(data=>{
     
            res.json(data);
        
    });
    });


    router.route("/foods/:foodTitle")
  .get(function(req, res){
    Foods.findOne({name: req.params.foodTitle},function(err, foundFoods){
      if(foundFoods){
        res.send(foundFoods);
      }else{
        res.send("No food item");
      }
    });
  });


  router.route("/foods/:id")
  .delete(function(req,res){
    Foods.deleteOne((req.params.id,function(err){
      if(!err){
        res.send("Sucessfully deleted all item");
      }else{
        res.send(err);
      }
    })
    );
  });

  router.route("/foods/:id")
  .put(function (req, res) {
    Foods.findByIdAndUpdate(
      req.params.id,
     {$set: req.body},
      function(err,updateddata) {
        if (err) {
          console.log(err);
          
        } else {
          res.json(updateddata);
        }
      }
    );
  });

  //swagger test
  /**
 * @swagger
 * /foods:
 *  post:
 *   tags:
 *    - Item
 *   description: Posting product testing
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   parameters:
 *    - name: name
 *      in: formData
 *      type: string
 *      description: please provide item name
 *    - name: price
 *      in: formData
 *      type: number
 *      description: Please provide item price
 *    - name: image
 *      in: formData
 *      type: string
 *      description: Please provide item image
 *   responses:
 *    201:
 *     description: Food registered successfully
 *    406:
 *     description: Food name is required or item description is required
 *    409:
 *     description: Food item already exist
 */

/**
 * @swagger
 * /foods:
 *  get:
 *   tags:
 *    - Item
 *   description: Posting food testing
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   parameters:
 *    - name: name
 *      type: string
 *      description: please provide food name
 *    - name: price
 *      type: number
 *      description: Please provide food price
 *    - name: image
 *      type: string
 *      description: Please provide food image
 *   responses:
 *    201:
 *     description: item registered successfully
 *    406:
 *     description: item name is required or item description is required
 *    409:
 *     description: item already exist
 */

/**
 * @swagger
 * /foods/{id}:
 *  delete:
 *   tags:
 *    - Delete item
 *   description: Delete food item 
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: please enter id
 *   responses:
 *    401:
 *     description: unauthorized access
 *    404:
 *     description: item not found
 *    200:
 *     description: item deleted successfully
 *    406:
 *     description: Id not provided
 */

module.exports = router;