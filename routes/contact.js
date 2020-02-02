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

  
module.exports = router;