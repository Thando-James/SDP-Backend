const express = require('express')
const router = express.Router();

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
})

module.exports = router;