/**
 * Created by fanjingbo on 2017/2/24.
 */
var express = require('express');
var router = express.Router();
var fs = require( 'fs' );
var runResult = '1';
var runError;


/* GET home page. */
router.post('/', function(req, res, next) {
    var path = './public/compilefile/' + req.body.name + '.c';
    // path = './public/compilefile/1.c'
    fs.writeFile(path, req.body.code);
    console.log(runResult);
    var spawn = require('child_process').spawn;
    var compile = spawn('gcc', ['./public/compilefile/' + req.body.name + '.c']);
    compile.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    compile.stderr.on('data', function (data) {
        console.log(String(data));
    });
    compile.on('close', function (data) {
        if (data === 0) {
            var run = spawn('./a.out', []);
            run.stdout.on('data', function (output) {
                runResult = String(output);
                res.render('compileResult', { result: runResult });
                console.log(runResult);
            });
            run.stderr.on('data', function (output) {
                runError = String(output);
                // res.render('compileResult', { error: runError });
                console.log(runError);
            });
            run.on('close', function (output) {
                console.log('stdout: ' + output);
            })

        }
    })




    // function callback(){
    //     console.log("callback");
    // }


});

module.exports = router;
