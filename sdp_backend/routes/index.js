const express = require('express')
const router = express.Router()
var fs= require('fs');
var parse = require('csv-parse');
var unique = require('array-unique');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '0616380016',
  database : 'Timetable'
});
 
connection.connect();

router.get('/', function(req,res){
    //TO-DO Get data from database.

        connection.query("SELECT * as [Courses] FROM Courses", function(err,results) {
          console.log('The courses are: ', results); 
          if(err){
            console.log(err)
            return res.status(500).send(err);
        }  
          res.send(results);    
           });
           connection.end();
});

router.post('/upload/courses', function(req, res){
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

        var inputFile =`./public/${csvFile.name}`;
        console.log('Processing courses file');
        var parser = parse({delimiter: '/'}, function (err, data) {
       // when all countries are available,then process them
       // note: array element at index 0 contains the row of headers that we should skip
        console.log(data);
        var a = [];
        for(var i=0;i<data.length;i++){
           // let arr = []
            //arr.push((data[i][0]).substring(0,8));
            a[i] = (data[i][0]).substring(0,8); // arr;
        }

        
        console.log("The courses going to database");

        courses = [];


          //removes duplicates
        Array.prototype.unique= function ()
    {
      return this.reduce(function(previous, current, index, array)
    {
      previous[current.toString()+typeof(current)]=current;
      return array.length-1 == index ? Object.keys(previous).reduce(function(prev,cur)
       {
          prev.push(previous[cur]);
          return prev;
       },[]) : previous;
      }, {});
    };

    courses = a.unique();


    var course_codes = [];

    for(var i = 0; i<courses.length;i++ ){
      let arr = []
      arr.push(courses[i]);
      course_codes.push(arr);
    }
  
        console.log(course_codes);

        var sql = "INSERT INTO Courses (course_code) VALUES ?";
        connection.query(sql, [course_codes], function(err) {
          if (err) throw err;
          connection.end();
           });

  //add courses to database
       });
       fs.createReadStream(inputFile).pipe(parser);
       res.send("hfhgvvj")

     

  });
   
});

router.post('/upload/students', function(req, res){
  if(!req.files){
      return res.status(400).send('No files were uploaded')
  }

  let std_csvFile = req.files.file

  console.log(std_csvFile)

  std_csvFile.mv(`./public/${std_csvFile.name}`,function(err){
    if(err){
        console.log(err)
        return res.status(500).send(err);
    }

    var file = `./public/${std_csvFile.name}`;
        console.log('Processing students file');
        var parser = parse({delimiter: ','}, function (err, data) {
       // note: array element at index 0 contains the row of headers that we should skip
        console.log(data);
        var dup_students = [];
        for(var i=0;i<data.length;i++){
            dup_students[i] = (data[i][0]).substring(0,8); // the array of students only
        }
        console.log("The students going to database");

        students = [];
        //removes duplicates
        Array.prototype.unique= function (){
          return this.reduce(function(previous, current, index, array)
            {
              previous[current.toString()+typeof(current)]=current;
              return array.length-1 == index ? Object.keys(previous).reduce(function(prev,cur)
                {
                  prev.push(previous[cur]);
                  return prev;
                },[]) : previous;
            }, {});
        };

    students = dup_students.unique();

    var unique_students = [];

    for(var i = 0; i<students.length;i++ ){
      let arr = []
      arr.push(students[i]);
      unique_students.push(arr);
    }

    console.log(unique_students);

        var sql = "INSERT INTO Registered (unique_students) VALUES ?";
        connection.query(sql, [Students], function(err) {
          if (err) throw err;
          connection.end();
           });

  //add courses to database
       });
       fs.createReadStream(inputFile).pipe(parser);
       res.send("Nayi i students nton nton")

     

  });
  
});




module.exports = router;