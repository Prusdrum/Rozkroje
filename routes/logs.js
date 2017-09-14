var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/debug', (req, res, next) => {
    const logPath = path.join(__dirname, '..', 'logs/debug.log');
    console.log(logPath);

    fs.readFile(logPath, 'utf8', (err, data) => {
        
        if (err) {
            res.send(err);
        } else {
            res.send(data)
        }
    })
});

router.get('/error', (req, res, next) => {
    const logPath = path.join(__dirname, '..', 'logs/error.log');
    console.log(logPath);

    fs.readFile(logPath, 'utf8', (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

module.exports = router;
