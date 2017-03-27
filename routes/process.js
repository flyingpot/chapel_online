/**
 * Created by fanjingbo on 2017/2/24.
 */
var express = require('express');
var router = express.Router();
var fs = require( 'fs' );
var runError;
var runResult


/* GET home page. */
router.post('/', function(req, res) {
    // var path = './public/compilefile/' + req.body.name + '.c';
    // path = './public/compilefile/1.c'
    var path = './public/compilefile/';
    if(req.body.lang === "Chapel"){
        suffix = 'chpl';
        compileIns = 'chpl';
    }
    else if(req.body.lang === "C"){
        suffix = 'c';
        compileIns = 'gcc';
        console.log(req.body, '111')
    }
    fs.writeFile(path + req.body.name + '.' + suffix, req.body.code, function(err){
        if(err)
            console.log('ERROR: '.red + err);
        else
            console.log('INFO: '.green + req.body.name +'.' + suffix + ' created');
    });
    // console.log(runResult);
    var spawn = require('child_process').spawn;
    // var compile = spawn(compileIns, ['./public/compilefile/' + req.body.name + '.' + suffix]);
    var compile = spawn(compileIns, ['./public/compilefile/' + req.body.name + '.' + suffix]);
    compile.stdout.on('data', function (data) {
        console.log('stdout: ' + data);

    });
    compile.stderr.on('data', function (data) {
        console.log(String(data));
        res.render('error', {error: String(data)});
    });
    compile.on('close', function (data) {
        if (data === 0) {
            var run = spawn('./a.out', []);
            run.stdout.on('data', function (output) {
                runResult = String(output);
                console.log(runResult);
            });
            run.stderr.on('data', function (output) {
                runError = String(output);
                // res.render('compileResult', { error: runError });
                console.log(runError);
            });
            run.on('close', function (output) {
                console.log('stdout: ' + output);
                res.render('compileResult', { result: runResult, error: runError});
            })

        }
    })
});

module.exports = router;
