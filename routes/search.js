const express = require('express');
const Food = require('../Model/Food');
const router = express.Router();
const cors = require('cors');
router.get('/searchfood/:search', cors(), (req, res, next) => {
    let searchText = req.params.search;
    Food.find({
            $text: {
                $search: searchText
            }
        })
        .then((food) => {
            res.status(200);
            res.json(food);
        })
        .catch(next);
});

module.exports = router;