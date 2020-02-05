const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/user');
const auth = require('../auth');
const router = express.Router();

router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err = new Error('Could not hash!');
            err.status = 500;
            return next(err);
        }
        User.create({
            email: req.body.email,
            fullName: req.body.fullName,
            password: hash,
            phone: req.body.phone,
            address: req.body.address,
            image: req.body.image
        }).then((user) => {
            let token = jwt.sign({
                _id: user._id
            }, process.env.SECRET);
            res.json({
                status: "Signup success!",
                token: token
            });
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user == null) {
                let err = new Error("User not found!");
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({
                            _id: user._id
                        }, process.env.SECRET);
                        res.json({
                            status: 'Login success!',
                            token: token
                        });
                    }).catch(next);
            }

        }).catch(next);
})

router.get('/me', auth.verifyUser, (req, res, next) => {
    res.json
    ({ _id: req.user._id,
        email: req.user.email,
        fullName: req.user.fullName,
            phone: req.user.phone,
            address: req.user.address,
            image: req.user.image
          });
});
router.put('/update', auth.verifyUser, (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
        .then((user) => {
            res.json({ _id: user._id, email: req.user.email, username: req.user.fullName, address: user.address, phone: user.phone,password:user.password});
        }).catch(next);
});
//swagger of signup

/**
 * @swagger
 * /signup:
 *  post:
 *   tags:
 *    - User
 *   description: Posting product testing
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   parameters:
 *    - name: fullName
 *      in: formData
 *      type: string
 *      description: please provide user fullname
 *    - name: email
 *      in: formData
 *      type: string
 *      description: Please provide user email
 *    - name: password
 *      in: formData
 *      type: string
 *      description: Please provide user password
  *    - name: phone
 *      in: formData
 *      type: string
 *      description: Please provide phone
  *    - name: address
 *      in: formData
 *      type: string
 *      description: Please provide address
 *    - name: image
 *      in: formData
 *      type: string
 *      description: Please provide item image
 *   responses:
 *    201:
 *     description: user registered successfully
 *    406:
 *     description: user name is required or user description is required
 *    409:
 *     description: user already exist
 */

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *   tags:
 *    - User
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
 *     description: user not found
 *    200:
 *     description: user deleted successfully
 *    406:
 *     description: Id not provided
 */

 //swagger of login
 /**
 * @swagger
 * /login:
 *  post:
 *   tags:
 *    - User
 *   description: Posting product testing
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   parameters:
 *    - name: email
 *      in: formData
 *      type: string
 *      description: please provide email
 *    - name: password
 *      in: formData
 *      type: string
 *      description: Please provide password
 *   responses:
 *    201:
 *     description: login successfull
  *    404:
 *     description: Not found
 *    406:
 *     description: email or password is required
 *    409:
 *     description: user already exist
 */

 //swagger of PUT
 /**
 * @swagger
 * /update/{id}:
 *  put:
 *   tags:
 *    - User
 *   description: Update user account details
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
 *      description: User Id
 *    - name: email
 *      in: body
 *      type: string
 *      description: User email
 *      schema:
 *        type: object
 *        required:
 *          - email
 *        properties:
 *          email:
 *            type: string
 *          fullName:
 *            type: string
 *          phone:
 *            type: string
  *          address:
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