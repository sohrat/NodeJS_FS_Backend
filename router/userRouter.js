const express = require('express');
const router = express.Router();

// returns response in url localhost:3001/users
router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Successfull - GET',
        metadata: {
            hostname: req.hostname,
            method: req.method,
        },
    });
});

// returns response in url localhost:3001/users/123
router.get('/:id', (req,res,next) =>{
    res.status(200).json({
        message: 'Successfull - GET by ID',
        metadata: {
            id: req.params.id,
            hostname: req.hostname,
            method: req.method,
        },
    });
});

// returns response in url localhost:3001/users
router.post('/', (req, res, next) =>{
    const name = req.body.name
    res.status(201).json({
        message: 'Successfull - POST',
        metadata: {
            name: name,
            hostname: req.hostname,
            method: req.method,
        },
    });
});

// returns response in url localhost:3001/users/123
router.get('/:id', (req,res,next) =>{
    res.status(200).json({
        message: 'Successfull - PUT by ID',
        metadata: {
            id: req.params.id,
            hostname: req.hostname,
            method: req.method,
        },
    });
});

// returns response in url localhost:3001/users/123
router.get('/:id', (req,res,next) =>{
    res.status(200).json({
        message: 'Successfull - DELETE by ID',
        metadata: {
            id: req.params.id,
            hostname: req.hostname,
            method: req.method,
        },
    });
});

module.exports = router;