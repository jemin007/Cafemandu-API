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

module.exports = router;