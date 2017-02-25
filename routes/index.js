var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'C Compile Online',author: 'Fan Jingbo' });
  //res.send(req.host);
});

module.exports = router;
