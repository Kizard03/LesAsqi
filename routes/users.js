var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  let data = {
    layout: 'frontend',
    title: 'HOTEL'
  };
  res.render('index', data);
});

router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get('/admin', function (req, res, next) {
  res.render('admin');
});

module.exports = router;