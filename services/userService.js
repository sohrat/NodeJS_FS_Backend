const { findUser, saveUser } = require('../db/db');
const errorTemplate = require("../templates/errorTemplate");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const mongoose = require('mongoose');

exports.registerUser = async(req, res) =>{
    try {
        const user = await findUser({ email: req.body.email })
        if(user){
            //Throw error
            throw new Error ('User exist, try logging in');
        } else {
            const user = new User();
            user._id = new mongoose.Types.ObjectId();
            const newUser = Object.assign(user, req.body);
            //else encrypt the password set the password with encrypted password
            const hash = await bcrypt.hash(newUser.password, 10);
                newUser.password = hash;
                const savedUser = await saveUser(newUser);
                
                return res.status(201).json({ 
                    message: 'Successful Registration', 
                    user: savedUser, 
            });
        }
    }catch(e){
        return errorTemplate(res, e, e.message);
    }
};

exports.loginUser = async (req, res) => {    
    try{
    // find the User returns a user
    const loggedUser = await findUser({ email: req.body.email });
    // if the user is NOT found
    // return response starting authentication failed
    if(!loggedUser) {
        throw new Error('Authentication Failed: Unable to find the user');
    } else {
    // else use bcrypt to compare a passwords
    const result = await bcrypt.compare(
        req.body.password, 
        loggedUser.password
        );
    // if result
    if(result){
        loggedUser.password = null;
        //create a JSON web Token 
        const token = jwt.sign({user: loggedUser}, process.env.jwt_secret);
        //return response starting authentitication successful, tokrn , logged:true
        return res.status(201).json({
            user: loggedUser,
            logged: true,
            token: token,
            message: 'Login Successful',
        });
    } else {
        //return response authentication failed
        throw new Error(
            'Authentication failed: Email or password does not match'
        );
    }
}
    } catch(e) {
        return errorTemplate(res, e, e.message);
    }
};