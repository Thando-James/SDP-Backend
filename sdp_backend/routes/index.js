const express = require('express')
const router = express.Router()
var fs= require('fs');
var parse = require('csv-parse');
import $ from 'jquery';


router.get('/', function(req,res){
    //TO-DO Get data from database.
})

router.post('/upload', function(req, res){
    if(!req.files){
        return res.status(400).send('No files were uploaded')
    }

    let csvFile = req.files.file

    console.log(csvFile)

    csvFile.mv(`./public/${csvFile.name}`,function(err){
        if(err){
            console.log(err)
            return res.status(500).send(err);
        }

        res.send('File uploaded')
    })

    // read csv

    var inputFile =`./public/${csvFile.name}`;
    console.log('Processing Countries file');
    var parser = parse({delimiter: '/'}, function (err, data) {
   // when all countries are available,then process them
   // note: array element at index 0 contains the row of headers that we should skip
    console.log(data);
    var courses = [];
    for(var i=0; i<data.length;i++){
    $.each(data[i][0],function(i,el){
            if($.inArray(el,courses) === -1) courses.push(el);
      })
    }
   });
   fs.createReadStream(inputFile).pipe(parser);
});
// read the inputFile, feed the contents to the parser



module.exports = router;