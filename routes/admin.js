var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    let data = {
        layout: 'admin',
        title: 'ADMIN',
        content: 'Selamat Datang Admin'
    };
    res.render('dashboard', data);
});


module.exports = router;