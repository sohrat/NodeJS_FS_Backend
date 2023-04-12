const express =  require('express');
const { saveUser } = require('../db/db');

const router = express.Router();

router.post('/register', (req, res, next) => {
    //findUser if user exist return response
    //'Email Exist try logging in'
    //else encrypt the password set the password with encrypted password
    //saveUser(newUser);
});
router.post('/login', (req, res) => {});

module.exports = router;