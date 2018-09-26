const express = require('express')
const router = express.Router()
var fs= require('fs');
var parse = require('csv-parse');
//var unique = require('array-unique');
var mysql      = require('mysql');
var PythonShell = require('python-shell');
var moment = require('moment');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '0616380016',
  database : 'Timetable'
});
 
connection.connect();

var timetable;

router.get('/display/courses', function(req,res){
    try {
        connection.query("SELECT DISTINCT Course_Code  FROM Registered ORDER BY Course_Code LIMIT 25 ", function(err,results) {     
            console.log('The courses are: ', results); 
            if(err){
              console.log(err)
              return res.status(500).send(err);
            }  
            return res.json(results);    

       
        });   
        
    } catch (error) {
        return res.json({errorType:'Database',errorMessage:error})
    }
});

router.post('/neighbors', function(req,res){
try{
    let code = req.body.coursecode;
    console.log('courseN from Dash: ',code);
    connection.query(`SELECT DISTINCT Course_Code FROM Registered WHERE Std_ID IN (SELECT Std_ID FROM Registered WHERE Course_Code = '${code}')`, function(err,res) {  
        
        if(err){
            console.log(err)
            return res.status(500).send(err);
          }  
          console.log('res is', res)
         // return res.json(results); 
          var arr = []
          for(var i=0; i<res.length;i++){
            console.log( res[i].Course_Code); 
            arr[i] = res[i].Course_Code;
        }

        console.log('The neighbors are: ', arr);
        var table = []
        for(const s of arr){
            for(var i=0; i<timetable.length;i++){
                var row = timetable[i]
                for(var j =0; j<row.length; j++){
                    //console.log('***', s, '***', row[j])
                    if(s === row[j]){
                        let temp= []
                        temp.push(s);
                        temp.push(i+1);
                        table.push(temp);
                    }
               }
               
            }
        }

        console.log('neighbors with sessions are: ',table);

    })  
}
catch
(error) {
    return res.json({errorType:'Database',errorMessage:error})
}

});


 router.post('/student', function(req,res){
     let std_num = req.body.studentnumber;
     console.log('std from dash: ', std_num);
    try{
        connection.query(`SELECT DISTINCT Course_Code FROM Registered WHERE Std_ID = ${std_num}`, function(err,reg) {     
            console.log('The courses',std_num, 'takes are : ', reg); 
            var arr =[];
         for   (var i=0; i<reg.length;i++){
                console.log( reg[i].Course_Code); 
                arr[i] = reg[i].Course_Code;
            }
    
            console.log('array', arr);
            console.log('the thing is: ', timetable)
        var table = []
        for(const s of arr){
            for(var i=0; i<timetable.length;i++){
                var row = timetable[i]
                for(var j =0; j<row.length; j++){
                    //console.log('***', s, '***', row[j])
                    if(s === row[j]){
                        let temp= []
                        temp.push(s);
                        temp.push(i+1);
                        table.push(temp);
                    }
               }
               
            }
        }
        console.log('***', table)
        res.json(table);
    
     })
    }
    catch
    (error) {
        return res.json({errorType:'Database',errorMessage:error})
    }

});  
 
 
 
router.get('/check/courses', function(req,res){
    try {
        connection.query("SELECT course_code  FROM Courses LIMIT 3", function(err,results) {     
            if(err){
              console.log(err)
              return res.status(500).send(err);
            }  
            return res.json(results);    
        });   
    } catch (error) {
        return res.json({errorType:'Database',errorMessage:error})
    }
})

    

router.post('/generate', function(req,res){
    let selected_courses = req.body.data;
    let maxSessions = req.body.maxSessions
    let clashParameter = req.body.clashParameter
    let sortby = req.body.SortBy;
    let date = req.body.date
    let data = []
    
    console.log("body ",req.body);

    try {
        PythonShell.PythonShell.run('./GraphColouring.py', { args: [selected_courses,maxSessions,clashParameter,sortby]}, function (err, results) {
            if (err){
                console.log(err);
                return res.json({errorType:'Python Shell',errorMessage:err})
            }
            // results is an array consisting of messages collected during execution
            console.log("dgdgh")
            results = JSON.parse(results)
            timetable = results;
            //results has the courses after generating timetable
            console.log(results);
            //add dates
            console.log(moment(date))
            for(let a = 0; a<results.length; a++){
                for(let b=0; b<results[a].length; b++){
                    let obj = {
                        subject:results[a][b],
                        data : [date]
                    }
                    data.push(obj)
                }
                date.add(1,"day")
            }
            res.json(data);
          
    
            });

       //   });

    } catch (error) {
        return res.json({errorType:'Python Shell',errorMessage:error})
    }
});

router.post('/upload/courses', function(req, res){
    if(!req.files){
        return res.status(400).send('No files were uploaded')
    }
    console.log('the status code is ',res.statusCode);

    let csvFile = req.files.file
    console.log('Nelly',req.files.file);
    try {
        csvFile.mv(`./public/${csvFile.name}`,function(err){
            if(err){
                console.log(err)
                return res.status(500).send(err);
            }
    
        function multiDimensionalUnique(arr) {
            var uniques = [];
            var itemsFound = {};
            for(var i = 0, l = arr.length; i < l; i++) {
                var stringified = JSON.stringify(arr[i]);
                if(itemsFound[stringified]) { continue; }
                uniques.push(arr[i]);
                itemsFound[stringified] = true;
            }
            return uniques;
        }


            let inputFile =`./public/${csvFile.name}`;
            console.log('Processing courses file');
            let parser = parse({delimiter: '/'}, function (err, data) {
                console.log(data);

                //counting paper numbers
                var papers = 1;
                var db_stuff = [];
                for(var i =0;i<data.length;i++){
                    for(var j=0;j<data.length;j++){
                        if(data[j][0] === data[i][0] && i!==j){
                            papers++;
                        }
                    }
                    let temp = [];
                    temp.push(data[i][0]);
                    temp.push(papers);
                    papers = 1;
                    db_stuff.push(temp);
                }
                //console.log('db stuff: ', db_stuff);
                var to_db = []
                to_db = multiDimensionalUnique(db_stuff);
                console.log('modified db stuff: ', to_db);

              
                //removes duplicates
                // Array.prototype.unique= function (){
                //     return this.reduce(function(previous, current, index, array){
                //         previous[current.toString()+typeof(current)]=current;
                //         return array.length-1 == index ? Object.keys(previous).reduce(function(prev,cur)
                //             {
                //                 prev.push(previous[cur]);
                //                 return prev;
                //             },[]) : previous;
                //     }, {});
                // };
    
              
                let sql = "INSERT IGNORE INTO Courses (course_code, Papers) VALUES ?";
                connection.query(sql, [to_db], function(err) {
                    if (err) console.log();
                });
            });
    
            fs.createReadStream(inputFile).pipe(parser);
            res.send("uploaded!!")
        });   
    } catch (error) {
        // console.log(error);
        return res.json({errorType:'csv',errorMessage:error})
    }
});

router.post('/upload/students', function(req, res){
    if(!req.files){
        return res.status(400).send('No files were uploaded')
    }

    let csvFile = req.files.file

    try {
        csvFile.mv(`./public/${csvFile.name}`,function(err){
            if(err){
                console.log(err)
                return res.status(500).send(err);
            }
    
    
    
            let inputFile =`./public/${csvFile.name}`;
            console.log('Processing students file');
            let parser = parse({delimiter: '\t'}, function (err, data){
                if (err) {
                    console.log('There was an error==> ', err)
                    return
                }
                big_arr = []
                for(let i=0; i<data.length; i++){
                  let splitData = data[i][0].split(',');
                  let temp = [splitData[0], (splitData[4])];
                  big_arr.push(temp);
                }
    
                console.log('Students data going to database');
                console.log(big_arr);
    
                let sql = "INSERT IGNORE INTO Registered (Std_ID, Course_Code) VALUES ?";
                connection.query(sql, [big_arr], function(err) {
                  if (err) console.log(err);
                });
            });
    
            fs.createReadStream(inputFile).pipe(parser);
            res.send("hfhgvvj")
        });  
    } catch (error) {
        return res.json({errorType:'csv',errorMessage:error})
    }   
});


module.exports = router;