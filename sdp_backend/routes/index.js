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

//put this under /generate
router.get('/allCourses', function(req,res){
    try{
        connection.query('SELECT Course_Code, COUNT(Std_ID) AS Size FROM Registered WHERE Course_Code IN (SELECT DISTINCT Course_Code FROM Registered) GROUP BY Course_Code', function(err,results){
            var All = [];
            for(var i=0;i<results.length; i++){
                let temp = {
                    course : results[i].Course_Code,
                    size : results[i].Size
                }
                All[i] = temp;
            }

            console.log('All Courses are: ', All); 

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

router.get('/allStudents', function(req,res){
    try{
        connection.query("SELECT DISTINCT Std_ID FROM Registered WHERE Reg = 'REGISTERED'", function(err,results){
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
    connection.query(`UPDATE Registered SET Reg = 'GONE'  WHERE Std_ID IN  (${byeStudents}) `, function(err,response) {
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


// router.post('/delete', function(req,res){
//     let byeCourses = req.body.byebye;
//     console.log('Deleted courses: ',byeCourses); 
// try{
//     connection.query(`UPDATE Courses SET Reg_Course = '0'  WHERE course_code IN (${byeCourses})` , function(err,response) {
//         if(err){
//             console.log(err)
//             return res.status(500).send(err);
//           }  
//           console.log('res is', response)

// })
// }catch
// (error) {
//     return res.json({errorType:'Database',errorMessage:error})
// }

// });



router.post('/addCourse', function(req,res){
    let newCourse = req.body.newcourse;
    console.log('course added: ', newCourse); 
try{
    connection.query(`INSERT IGNORE INTO Courses (course_code) VALUES (${newCourse}) ` , function(err,response) {
        if(err){
            console.log(err)
            return res.status(500).send(err);
          }  
          console.log('res is', response)

})
//try the other insert
}catch
(error) {
    return res.json({errorType:'Database',errorMessage:error})
}

});



router.post('/addStudent', function(req,res){
    let newStudent = []
    let std = req.body.studentnumber;
    let code = req.body.code;
    let status = req.body.reg;
    newStudent[0] = std;
    newStudent[1] = "REGISTERED";
    newStudent[2] = code;
    console.log("new students are: ", newStudent);
try{
    let sql = "INSERT IGNORE INTO Registered (Std_ID,Reg,Course_Code) VALUES ? "
    connection.query(sql, [[newStudent]], function(err){
        if(err) console.log(err);
        return res.send("uploaded")
    })
          //console.log('res is', response)

//try the other insert
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

          connection.query(`SELECT DISTINCT Course_Code, COUNT(Std_ID) AS Num FROM Registered  GROUP BY Course_Code`, function (err2, response2){

            if(err2){
                console.log(err2)
                return res.status(500).send(err2);
              }  
              console.log('res2 is', response2)
    

        var table = []
        var denominator 
        var num
       // console.log("length is ",timetable.length)
              for(var x=0; x<response2.length; x++){
                if(response2[x].Course_Code === code ){
                    denominator = response2[x].Num;
            }
              }
        for(const s of response){
                for(var i=0; i<timetable.length-1;i++){   
                    if(s.Course_Code === (timetable[i].subject).substring(0,8)){
                        //console.log("length is ",response2.length)
                        for(var x=0; x<response2.length; x++){
                            if(response2[x].Course_Code === s.Course_Code ){
                                num = response2[x].Num
                            }
                        }
                        
                        let temp= {
                            start : timetable[i].data[1],
                            end : timetable[i].data[1],
                            title : timetable[i].subject,
                            allDay : false,
                            shared : s.Shared,
                            divide : denominator,
                            quo : s.Shared/denominator,
                            percentage:((s.Shared/denominator)*100).toPrecision(3),
                            resource : timetable[i].data[0], //resource is the percentage .. divide by denominator then * 100
                            size : num,
                            
                            session : timetable[i].resource[0].session
                        }
                        table.push(temp);
                         
            }
        }
    }
   console.log("denominator is:", denominator);

        console.log('neighbors with sessions are: ',table);
        res.json(table)

          })

    })   //query ends here
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
        connection.query(`SELECT DISTINCT Course_Code FROM Registered WHERE Std_ID = ${std_num} AND Reg = 'REGISTERED'`, function(err,reg) {     
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
            for(var i=0; i<timetable.length-1;i++){
                    if(s === (timetable[i].subject).substring(0,8)){
                        let temp= {
                            start : timetable[i].data[1],
                            end : timetable[i].data[1],
                            title : timetable[i].subject,
                            allDay : false,
                            resource : timetable[i].data[0],
                            session : timetable[i].resource[0].session
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
    var date = moment(d,"MM-DD-YYYY")
    console.log(date.format());
    try {
        PythonShell.PythonShell.run('./GraphColouring.py', { args: [selected_courses,maxSessions,clashParameter,sortby]}, function (err, results) {
            if (err){
                console.log(err);
                return res.json({errorType:'Python Shell',errorMessage:err})
            }
            // results is an array consisting of messages collected during execution
            console.log("dgdgh")
            console.log(results);
            results = JSON.parse(results)
            
            //results has the courses after generating timetable
            console.log(results);
            //set dates

            for(let a = 0; a<results.length-1; a++){
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
         
            timetable = data;
            data.push(results[results.length-1]);
            res.json(data);
        console.log('bra ',(data))
    
            });

       //   });

    } catch (error) {
        return res.json({errorType:'Python Shell',errorMessage:error})
    }
});

router.post('/upload/courses', function(req, res){
    console.log('Processing courses file');
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
                        res.send({status:200,message:"successful"})
                    })
                });
            });
    
            fs.createReadStream(inputFile).pipe(parser);
            
        });   
    } catch (error) {
        return res.send({status:500,errorType:'csv',errorMessage:error})
    }
});




router.post('/save', function(req,res){
    let dersio = req.body.save;
    //get array from dash with new rows content
    var dummy = [["date1 session1 course1"], ["date2 session2 course2"]];
    console.log('getting stuff from Dersio: ', dersio);
    try{
        connection.query("DELETE FROM time_table", function(err){
            if(err) console.log(err);
            var tableData = []
            for(let i =0; i<timetable.length-1; i++){
                var stuff = [];
                let temp = timetable[i];
                stuff.push(temp.data[1],temp.resource[0].session,temp.subject);
                tableData.push(stuff);
            }
            console.log("table data before modifications ",tableData)
            //add content from dash to tableData before uploading
            for(var i =0; i<dummy.length;i++){
                var stuff = [];
                let new_row = dummy[i];
                temp_row = new_row.split(",");
                stuff.push(temp_row[0],temp_row[1],temp_row[2]);
                tableData.push(stuff);
            }
            console.log("table data after modifications ",tableData)

            // let sql = "INSERT IGNORE INTO time_table (date,session,course) VALUES ? "
            // connection.query(sql, [tableData], function(err){
            //     if(err) console.log(err);
            //     return res.send("uploaded")
            // })
                  
           // console.log('', response)
        
    
            //return res.send("uploaded")
        })
    
    
       
    //try the other insert
    }catch
    (error) {
        return res.json({errorType:'Database',errorMessage:error})
    }

});

router.get('/viewModified', function(req,res){
    try {
        connection.query("SELECT * FROM time_table", function(err,results) {     
            if(err){
              console.log(err)
              return res.status(500).send(err);
            } 
            console.log("the timetable with edits is ", results); 
            return res.json(results);    
        });   
    } catch (error) {
        return res.json({errorType:'Database',errorMessage:error})
    }
})




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

                let papersArr = [];

                for(let i=0; i<data.length; i++){
                  papersArr.push([data[i][0].split("/")[0], data[i][0]])
                }
                console.log('\n');
                
    
                let sql = "INSERT IGNORE INTO Papers (Course_Code, Papers) VALUES ?";
                connection.query(sql, [papersArr], function(err) {
                  if (err) console.log(err);
                  console.log("upload");
                  res.send({status:200,message:"successful"})
                });
            });
    
            fs.createReadStream(inputFile).pipe(parser);
        });  
    } catch (error) {
        return res.send({status:500,errorType:'csv',errorMessage:error})
    }   
});


module.exports = router;
