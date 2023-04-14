const express =  require('express');
const { saveUser, findUser } = require('../db/db');
const bcrypt =  require('bcrypt');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const router = express.Router();

router.post('/register', (req, res, next) => {
    findUser({ email: req.body.email }).then(user =>{
        if(user){
            //findUser if user exist return response
            return res.status(409).json({message: 'User exist, try logging in'})
        } else {
            const user = new User();
            user._id = new mongoose.Types.ObjectId();
            const newUser = Object.assign(user, req.body);
            //else encrypt the password set the password with encrypted password
            bcrypt.hash(newUser.password, 10, (err, hash) => {
                if(err){
                    return res.status(501).json({ message: 'Error: ' + err.message });
                } else {
                    newUser.password = hash;
                    saveUser(newUser).
                    then((user) => {
                            return res.status(201).json({ 
                                message: 'Successful Registration', 
                                user: user, 
                            });
                        }
                    ).catch(err =>{
                        error: {
                            message: err.message;
                        }
                    })
                    
                }
            });
        }
    })
    .catch(err => {
        error: {
            message: err.message;
        }
    });
    
    //'Email Exist try logging in'
    //saveUser(newUser);
});
router.post('/login', (req, res) => {});

module.exports = router;