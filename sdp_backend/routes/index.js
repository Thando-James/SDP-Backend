const express = require('express')
const router = express.Router()
var fs= require('fs');
var parse = require('csv-parse');
var unique = require('array-unique');
var mysql      = require('mysql');
var PythonShell = require('python-shell');

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '0616380016',
//   database : 'Timetable'
// });
 
//connection.connect();

router.get('/display/courses', function(req,res){
    try {
        connection.query("SELECT DISTINCT Course_Code  FROM Registered LIMIT 10", function(err,results) {     
            console.log('The courses are: ', results); 
            if(err){
              console.log(err)
              return res.status(500).send(err);
            }  
            return res.json(results);    

            //testing display courses  
                // function testDispCourses(){
                //     var resp= 200;
                //     if(res.statusCode != resp){
                //         console.log(" 'Display courses' failed the test");
                //     }
                //     else{
                //         console.log(" 'Display courses' passed the test");
                //     }
                // };
                // console.log('Testing display courses: ');
                // testDispCourses();
                //testing ends here
        });   
        
    } catch (error) {
        return res.json({errorType:'Database',errorMessage:error})
    }
});

    

router.post('/generate', function(req,res){
    let selected_courses = req.body.data;
    let maxSessions = req.body.maxSessions
    let clashParameter = req.body.clashParameter
    let sortby = req.body.SortBy;

    console.log("body ",req.body);

    try {
        PythonShell.PythonShell.run('/GraphColouring.py', { args: [selected_courses,maxSessions,clashParameter,sortby]}, function (err, results) {
            if (err){
                return res.json({errorType:'Python Shell',errorMessage:err})
            }
            // results is an array consisting of messages collected during execution
            console.log("dgdgh")
            results = JSON.parse(results)
            console.log(results);
            res.json(results)
          });   
    } catch (error) {
        return res.json({errorType:'Python Shell',errorMessage:error})
    }
});

router.post('/upload/courses', function(req, res){
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
            console.log('Processing courses file');
            let parser = parse({delimiter: '/'}, function (err, data) {
                console.log(data);
                let a = [];
                for(let i=0;i<data.length;i++){
                    a[i] = (data[i][0]).substring(0,8);
                } 
                console.log("The courses going to database");
                courses = [];
    
                //removes duplicates
                Array.prototype.unique= function (){
                    return this.reduce(function(previous, current, index, array){
                        previous[current.toString()+typeof(current)]=current;
                        return array.length-1 == index ? Object.keys(previous).reduce(function(prev,cur)
                            {
                                prev.push(previous[cur]);
                                return prev;
                            },[]) : previous;
                    }, {});
                };
    
                courses = a.unique();
                let course_codes = [];
                for(let i = 0; i<courses.length;i++ ){
                  let arr = []
                  arr.push(courses[i]);
                  course_codes.push(arr);
                }
      
                console.log(course_codes);
    
                let sql = "INSERT INTO Courses (course_code) VALUES ?";
                connection.query(sql, [course_codes], function(err) {
                    if (err) throw err;
                });
            });
    
            fs.createReadStream(inputFile).pipe(parser);
            res.send("hfhgvvj")
        });   
    } catch (error) {
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
            let parser = parse({delimiter: '\n'}, function (err, data){
                if (err) {
                    console.log('There was an error==> ', err)
                    return
                }
                big_arr = []
                for(let i=0; i<data.length; i++){
                  let splitData = data[i][0].split(',');
                  let temp = [splitData[0], (splitData[4]).substring(0,8)];
                  big_arr.push(temp);
                }
    
                console.log('Students data going to database');
                console.log(big_arr);
    
                let sql = "INSERT INTO Registered (Std_ID, Course_Code) VALUES ?";
                connection.query(sql, [big_arr], function(err) {
                  if (err) throw err;
                });
            });
    
            fs.createReadStream(inputFile).pipe(parser);
            res.send("hfhgvvj")
        });  
    } catch (error) {
        return res.json({errorType:'csv',errorMessage:error})
    }   
});


module.exports = router