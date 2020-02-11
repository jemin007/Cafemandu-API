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
 
        res.json({status: "Succesfully added", data:data});
    
});
});


router.route("/contacts/:id")
  .delete(function(req,res){
    contact.findOneAndDelete({_id:req.params.id},function(err){
      if(!err){
        res.send("sucessfully deleted all sucess");
      }else{
        res.send(err);
      }
    })
    
  });

//swagger test
/**
 * @swagger
 * /contacts:
 *  post:
 *   tags:
 *    - Contact
 *   description: Contact list testing
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   parameters:
 *    - name: email
 *      in: formData
 *      type: string
 *      description: please provide email
 *    - name: description
 *      in: formData
 *      type: string
 *      description: Please provide description
 *   responses:
 *    201:
 *     description: contact registered successfully
 *    406:
 *     description: contact email is required or contact description is required
 *    409:
 *     description: contact already exist
 */

/**
 * @swagger
 * /contacts:
 *  get:
 *   tags:
 *    - Contact
 *   description: Contact get testing
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   responses:
 *    201:
 *     description: contact registered successfully
 *    406:
 *     description: contact email is required or contact description is required
 *    409:
 *     description: contact already exist
 */

 /**
 * @swagger
 * /contacts/{id}:
 *  delete:
 *   tags:
 *    - Contact
 *   description: Delete contacts
 *   produces:
 *    - application/json
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: Contact Id
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
module.exports = router;