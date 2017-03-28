/**
 * Created by fanjingbo on 2017/3/28.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var child = require('child_process').spawn('./a.out', [], {stdio: 'inherit'});
    child.stdout.on('data', function(data){
        console.log('stdout:' + data);
    });
});

module.exports = router;
