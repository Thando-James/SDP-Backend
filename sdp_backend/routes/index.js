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

router.get('/display/courses', function(req,res){
    try {
        connection.query("SELECT DISTINCT course_code  FROM Courses ORDER BY course_code LIMIT 25 ", function(err,results) {     
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

router.get('/allStudents', function(req,res){
    try{
        connection.query("SELECT DISTINCT Std_ID FROM Registered", function(err,results){
            var All = [];
            for(var i=0;i<results.length; i++){
                All[i] = results[i].Std_ID;
            }

            console.log('Registered students are: ', All); 

            if(err){
              console.log(err)
              return res.status(500).send(err);
            }  
            return res.json(All);
                

       
        });
    }catch (error) {
        return res.json({errorType:'Database',errorMessage:error})
    }


});

router.post('/deregister', function(req,res){
    let byeStudents = req.body.bye;
    console.log('Deregistered students from Dash: ',byeStudents); 
try{
    connection.query(`UPDATE Registered SET Reg = 'GONE'  WHERE Std_ID IN  '${byeStudents}' `, function(err,response) {
        if(err){
            console.log(err)
            return res.status(500).send(err);
          }  
          console.log('res is', response)

})
}catch
(error) {
    return res.json({errorType:'Database',errorMessage:error})
}

});



router.post('/neighbors', function(req,res){

try{
    let code = req.body.coursecode;
    console.log('courseN from Dash: ',code);
    connection.query(`SELECT DISTINCT Course_Code, COUNT(Std_ID) AS Shared FROM Registered WHERE Std_ID IN (SELECT Std_ID FROM Registered WHERE Course_Code = '${code}') GROUP BY Course_Code
    `, function(err,response) {  
        //get number of students who do thos course : code
        if(err){
            console.log(err)
            return res.status(500).send(err);
          }  
          console.log('res is', response)
        //   var arr = []
        //   for(var i=0; i<response.length;i++){
        //     console.log( response[i].Course_Code); 
        //     arr[i] = response[i].Course_Code;
        // }

        var table = []
        for(const s of response){
                for(var i=0; i<timetable.length;i++){
                    if(s.Course_Code === (timetable[i].subject).substring(0,8)){
                        let temp= {
                            start : timetable[i].data[1],
                            end : timetable[i].data[1],
                            title : timetable[i].subject,
                            allDay : false,
                            resource : s.Shared
                        }
                        table.push(temp);
                         
            }
        }
    }

        console.log('neighbors with sessions are: ',table);
        res.json(table)
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
                    if(s === (timetable[i].subject).substring(0,8)){
                        let temp= {
                            start : timetable[i].data[1],
                            end : timetable[i].data[1],
                            title : timetable[i].subject,
                            allDay : false,
                            resource : timetable[i].data[0]
                        }
                       
                        table.push(temp);
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
    let d = req.body.date
    let data = []
    
    console.log("body ",req.body);
    var date = moment(d)
    
    try {
        PythonShell.PythonShell.run('./GraphColouring.py', { args: [selected_courses,maxSessions,clashParameter,sortby]}, function (err, results) {
            if (err){
                console.log(err);
                return res.json({errorType:'Python Shell',errorMessage:err})
            }
            // results is an array consisting of messages collected during execution
            console.log("dgdgh")
            results = JSON.parse(results)
            
            //results has the courses after generating timetable
            console.log(results);
            //set dates

            for(let a = 0; a<results.length; a++){
                    if(date.format('dddd') === "Saturday"){
                        date.add(2,"day");
                    }

                    if(date.format('dddd') === "Sunday"){
                        date.add(1,"day");
                    }

                    for(let b=0; b<results[a].length; b++){
                        let obj = {
                            subject:results[a][b],
                            data : [date.format("LL"),date.format("YYYY-MM-DD")],
                            start : moment(date.format()),
                            end :  moment(date.format()),
                            title : results[a][b],
                            allDay : false,
                            resource : [{session: a+1}]
                        }
                        data.push(obj)
                    }
                    if(a%2 !== 0){
                        date.add(1,"day");
                    }
            }
            console.log(data)
            timetable = data;
            res.json(data);
          
    
            });

       //   });

    } catch (error) {
        return res.json({errorType:'Python Shell',errorMessage:error})
    }
});

router.post('/upload/courses', function(req, res){
    //If there is no csv file;
    if(!req.files){
        return res.status(400).send('No files were uploaded')
    }

    let csvFile = req.files.file;

    try {
        csvFile.mv(`./public/${csvFile.name}`,function(err){
            //If there is an error in moving the file
            if(err){
                console.log(err)
                return res.status(500).send(err);
            }

            let inputFile =`./public/${csvFile.name}`;
            console.log('Processing courses file');
            
            //Read in csv file
            let parser = parse({delimiter: '\t'}, function (err, data) {
                console.log(data);
                
                let registeredTable =[]
                let courses = []

                for(let i =0; i<data.length; i++){
                    let temp = data[i][0].split(",");
                    registeredTable.push([temp[0],temp[1],temp[4]]);
                    courses.push([temp[4]]);
                }

                let Distinctcourses = multiDimensionalUnique(courses);
              
                //Insert into Courses
                let sql = "INSERT IGNORE INTO Courses (course_code) VALUES ?";
                connection.query(sql, [Distinctcourses], function(err) {
                    if (err) console.log(err);

                    //Insert into Registered
                    let sql = "INSERT IGNORE INTO Registered (Std_ID,Reg,Course_Code) VALUES ?"
                    connection.query(sql, [registeredTable], function(err){
                        if(err) console.log(err);
                        res.send("uploaded")
                    })
                });
            });
    
            fs.createReadStream(inputFile).pipe(parser);
            
        });   
    } catch (error) {
        return res.json({errorType:'csv',errorMessage:error})
    }
});

router.post('/login', function(req, res){
    if(!req){
        return res.status(500).send('Please enter login credentials')
    }
    console.log("Nelly")
    console.log(req.body);
    let sql = `SELECT ID FROM Person WHERE Email = "${req.body.email}" AND Password = "${req.body.password}" `;

    connection.query(sql, function(err,results) {
        if(err) console.log(err)
        res.json(results);
    })
})

router.post('/upload/papers', function(req, res){
    //If there is no csv file
    if(!req.files){
        return res.status(400).send('No files were uploaded')
    }

    let csvFile = req.files.file

    try {
        csvFile.mv(`./public/${csvFile.name}`,function(err){
            //If there is an error moving the csv
            if(err){
                console.log(err)
                return res.status(500).send(err);
            }
    
            let inputFile =`./public/${csvFile.name}`;
            console.log('Processing papers file');

            let parser = parse({delimiter: '\t'}, function (err, data){
                //If there is an error reading the csv
                if (err) {
                    console.log('There was an error==> ', err)
                    return
                }

                console.log('data', data);
                let papersArr = [];

                for(let i=0; i<data.length; i++){
                  papersArr.push([data[i][0].split("/")[0], data[i][0]])
                }
                console.log('\n');
                
                console.log('papers arr', papersArr);
    
                let sql = "INSERT IGNORE INTO Papers (Course_Code, Papers) VALUES ?";
                connection.query(sql, [papersArr], function(err) {
                  if (err) console.log(err);
                  console.log("upload");
                  res.send("uploaded")
                });
            });
    
            fs.createReadStream(inputFile).pipe(parser);
        });  
    } catch (error) {
        return res.json({errorType:'csv',errorMessage:error})
    }   
});


module.exports = router;
