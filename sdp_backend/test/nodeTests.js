var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index');
let should = chai.should();
var expect = chai.expect;
const assert = require('chai').assert;

chai.use(chaiHttp);

describe('App', function() {

  describe('test1', function(){
    it('gets selected courses from database and displays them as an array of objects', function(done){
      chai.request(app)
      .get('/display/courses')
      .end(function(err, res){
        if(err) console.log("Error ", err);
        res.body.should.be.a('array');
        done();
      })
    })
  })


describe('test2', function(){
    it('courses going to db should be in an array', (done)=>{
      let arr = 
        { Course_Code : 'COMS1015' }

      chai.request(app)
      .post('/upload/courses')
      .send()
      .end((err, res)=>{
        if(err) console.log("Error ", err);
        console.log('res body is: ', arr)
        //arr.should.have.property('Course_Code');
        res.should.have.status(200);
        // expect(res.body).to.be.a.array;
        //console.log(res.body);
        done();
      })
    })
  })



//   //on submit button and content submitted to database



//   describe('/upload/courses', function(){
//     it('allows for a csv file to be uploaded, status code must be 200 ', function(done){
//       chai.request(app)
//       .post('/upload/courses')
//       .end(function(err, res){
//         if(err) console.log("Error ", err);
//         console.log('res status is: ', res.status)
//         //res.should.have.status(200);
//         expect(res).to.have.status(200);
//         done();
//       })
//     })
//   })

// describe('/upload/courses', function(){
//     it('csv data must be in a 2D array ', function(done){
//       chai.request(app)
//       .post('/upload/courses')
//       .end(function(err, res){
//         if(err) console.log("Error ", err);
//         //console.log('res body is: ', res.body)
//         //res.should.have.status(200);
//         // expect(res.body).to.be.a.array;
//         res.body.should.be.a('array');
//         done();
//       })
//     })
//   })

//I dont know what results nton nton has
 // describe('/generate', function(){
 //    it('gets selected courses from database and displays them', function(done){
 //      chai.request(app)
 //      .post('/display/courses')
 //      .end(function(err, res){
 //        if(err) console.log("Error ", err);
 //        expect(res).to.have.status(200);
 //        done();
 //      })
 //    })
 //  })

})