const express = require('express');
const Foods = require('../Model/Food');
const cors = require('cors');
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
     
            res.json({status: "succesfully uploaded", data:data});
        
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
    Foods.findOneAndDelete({_id:req.params.id},function(err){
      if(!err){
        res.send("Sucessfully deleted all item");
      }else{
        res.send(err);
      }
    })
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

  router.get('/searchfood/:search', cors(), (req, res, next) => {
    let searchText = req.params.search;
    Foods.find({
                name: searchText
            
        })
        .then((food) => {
            res.status(200);
            res.json(food);
        })
        .catch(next);
});


  //swagger test
  /**
 * @swagger
 * /foods:
 *  post:
 *   tags:
 *    - Food
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
 *    - Food
 *   description: Posting food testing
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
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
 *    - Food
 *   description: Delete food item
 *   produces:
 *    - application/json
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: Food Id
 *   responses:
 *    200:
 *     description: Successfully deleted
 *    401:
 *     description: Bearer token error or unauthorized
 *    500:
 *     description: Internal server error/ token could not be verified
 *    403:
 *     description: Forbidden
 */

 /**
 * @swagger
 * /foods/{id}:
 *  put:
 *   tags:
 *    - Food
 *   description: update food details
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/json
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: Food Id
 *    - name: name
 *      in: body
 *      type: string
 *      description: food details
 *      schema:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          name:
 *            type: string
 *          price:
 *            type: string
 *          image:
 *            type: string
 *   responses:
 *    200:
 *     description: Updated successfully
 *    401:
 *     description: Bearer token error or unauthorized
 *    500:
 *     description: Internal server error/ token could not be verified
 *    403:
 *     description: Forbidden
 */
module.exports = router;