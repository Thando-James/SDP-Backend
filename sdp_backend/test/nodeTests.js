var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index');
//let should = chai.should();
var expect = chai.expect;
const assert = require('chai').assert;
var fs = require('fs');
// chai.use(require('chai-things'));

chai.use(chaiHttp);

describe('test:', function() {

  // describe('display courses', function(){
  //   it('gets selected courses from database and displays them as an array of objects', function(done){
  //     chai.request(app)
  //     .get('/display/courses')
  //     .end(function(err, res){
  //       if(err) console.log("Error ", err);
  //       res.body.should.be.a('array');
  //       done();
  //     })
  //   })
  // })


// describe('data going to database', function(){
//     it("should return message 'uploaded!!' after uploading", function(done){
//       chai.request(app)
//       .post('/upload/courses')
//       .attach('file', './myCourses.csv', 'myCourses.csv')
//       // .write(fs.readFileSync('./myCourses.csv'))
//       .end(function(err, res){
//         if(err) console.log("Error ", err);
//         console.log('res text is: ', res.text)
//         assert.equal(res.text, 'uploaded!!');
//         // res.should.have.status(200);
//         done();
//       })
//     })
//   })


 describe('generate timetable', function(){
    it('returns exams with sessions in 2D array form', function(done){
      chai.request(app)
      .post('/generate')
      .send({
        data :   [ 'ACCN1014',
        'ACCN1036',
        'APPM1006',
        'COMS1015',
        'COMS1017',
        'COMS1018',
        'ECON1000',
        'INFO1004',
        'MATH1014',
        'MATH1036',
        'PHYS1000',
        'PSYC1015',
        'PSYC1017',
        'PSYC1017A',
        'PSYC1018',
        'THEO1006' ],
        maxSessions : 100,
        clashParameter :1,
        SortBy : 0
    
      })
      .end(function(err, res){
        if(err) console.log("Error ", err);
        //console.log('*** ',res);
        // expect(res).to.be.an('array');
        res.body.should.be.a('array');
        done();
      })
    })
  })


  describe('get individual student timetable', function(){
    it('returns exams with sessions in 2D array form', function(done){
      chai.request(app)
      .post('/student')
      .send({studentnumber : '1490000'})
      .end(function(err, res){
        if(err) console.log("Error ", err);
        // console.log('*** ',res);
        // expect(res).to.be.an('array');
        res.body.should.be.a('object'); //or array, not sure
        done();
      })
    })
  })
 
  describe('get percentage of students shared', function(){
    it('returns array objects with properties: resource which is percentage shared', function(done){
      chai.request(app)
      .post('/neighbors')
      .send({code : 'ACCN1014'})
      .end(function(err, res){
        if(err) console.log("Error ", err);
        // console.log('*** ',res);
        // expect(res).to.be.an('array');
    //     expect(res.body).to.deep.include.members([ {start: '2018-11-07',
    //                                                 end: '2018-11-07',
    //                                                 title: 'ACCN1014/1',
    //                                                 allDay: false,
    //                                                 resource: 100,
    //                                                 size: 7 },
    // ]);
        (res.body).should.all.have.property('resource')
        //res.body.should.be.a('array');
        done();
      })
    })
  })

  describe('get number of students in each course', function(){
    it('returns array objects with properties: sizw which is number of students in that course', function(done){
      chai.request(app)
      .post('/neighbors')
      .send({code : 'ACCN1014'})
      .end(function(err, res){
        if(err) console.log("Error ", err);
        // console.log('*** ',res);
        // expect(res).to.be.an('array');
    //     expect(res.body).to.deep.include.members([ {start: '2018-11-07',
    //                                                 end: '2018-11-07',
    //                                                 title: 'ACCN1014/1',
    //                                                 allDay: false,
    //                                                 resource: 100,
    //                                                 size: 7 },
    // ]);
        (res.body).should.all.have.property('size')
        //res.body.should.be.a('array');
        done();
      })
    })
  })

})