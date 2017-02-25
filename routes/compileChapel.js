/**
 * Created by fanjingbo on 2017/2/24.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('compile', { title: 'compile' });
});

module.exports = router;
