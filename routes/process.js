/**
 * Created by fanjingbo on 2017/2/24.
 */
var express = require('express');
var router = express.Router();
var fs = require( 'fs' );
var cuid = require('cuid');

var runResult;


/* GET home page. */
router.post('/', function(req, res) {
    var path = './public/compilefile/';
    if(req.body.lang === "Chapel"){ /* judge what lang the user chooses */
        suffix = 'chpl';
        compileIns = 'chpl';
    }
    else if(req.body.lang === "C"){
        suffix = 'c';
        compileIns = 'gcc';
    }
    var filename = cuid.slug(); /* randomly set a filename */
    fs.writeFile(path + filename + '.' + suffix, req.body.code, function(err){
        if(err)
            console.log(err);
        else
            console.log(filename +'.' + suffix + ' created');
    });
    // console.log(runResult);
    var spawn = require('child_process').spawn;
    var compile = spawn(compileIns, ['./public/compilefile/' + filename + '.' + suffix]);
    compile.stdout.on('data', function (data) {
        console.log('stdout:' + data);

    });
    compile.stderr.on('data', function (data) {
        console.log(String(data));
        res.render('error', {error: String(data)});
    });
    compile.on('close', function (data) {
        if (data === 0) {

            var test = spawn('stdbuf', ['-i0', '-o0', '-e0', './a.out']);
            test.stdout.on('data', function (data) {
                console.log('stdout: ' + data);
            });

            test.stderr.on('data', function (data) {
                console.log('stderr: ' + data);
            });

// Simulate entering data for getchar() after 1 second
            setTimeout(function() {
                test.stdin.write('\n');
            }, 1000);
            // var run = spawn('./a.out', []);
            // run.stdout.on('data', function (output) {
            //     runResult = String(output);
            //     console.log(runResult);
            // });
            // run.stderr.on('data', function (err) {
            //     // res.render('compileResult', { error: runError });
            //     console.log(err);
            // });
            // run.on('close', function (output) {
            //     res.render('compileResult', { result: runResult });
            // })

        }
    })
});

module.exports = router;
