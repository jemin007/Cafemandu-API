const express = require('express');
const contact= require('../Model/contact')
const router = express.Router();



router.route("/contacts")
    .get(function (req, res) {
        contact.find(function (err, foundcontact) {
            if (err) {
               console.log(err)
            } else {
                res.json(foundcontact);
            }

        });
    });

router.route("/contacts")
.post(function (req, res) {
contact.create({
email:req.body.email,
description:req.body.description

}).then(data=>{
 
        res.json(data);
    
});
});


router.route("/contacts/:id")
  .delete(function(req,res){
    contact.deleteOne((req.params.id,function(err){
      if(!err){
        res.send("sucessfully deleted all sucess");
      }else{
        res.send(err);
      }
    })
    );
  });

//swagger test
/**
 * @swagger
 * /items:
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
 *      type: string
 *      description: Please provide item price
 *    - name: desciption
 *      in: formData
 *      type: string
 *      description: Please provide item description
 *    - name: image
 *      in: formData
 *      type: string
 *      description: Please provide item image
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
 * /items:
 *  get:
 *   tags:
 *    - Item
 *   description: Posting product testing
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   parameters:
 *    - name: name
 *      type: string
 *      description: please provide item name
 *    - name: price
 *      type: string
 *      description: Please provide item price
 *    - name: desciption
 *      type: string
 *      description: Please provide item description
 *    - name: image
 *      type: string
 *      description: Please provide item image
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
 * /items/{id}:
 *  delete:
 *   tags:
 *    - Delete item
 *   description: Delete item 
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