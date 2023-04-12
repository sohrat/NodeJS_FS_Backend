require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/userModel');

const connect = async () => {
    await mongoose.connect(process.env.mongo);
};

const disconnect = async () => {
    await mongoose.connection.close();
};

// obj {email: req.body.email}
const findUser = async (obj) => {
    User.findOne(obj)
};

const saveUser = async () => {
    return await newUser.save();
};

module.exports = { connect, disconnect, findUser, saveUser };


