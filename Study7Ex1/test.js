var should = require('should');
var assert = require('assert');
var request = require('supertest');
var winston = require('winston');
var test = require('unit.js');

var url = 'http://localhost:3000';

   describe('CRUD User test', function(done){
      it('should safely save a user, update the user and delete the user. Testing with help of all get methods', function(done){

         //TEST USERS
          var user = {
              "email": "YES@hotmail.com",
              "password": "6525A444-D4BC-8819-3632-D38626487588"
          };
          var user2 = {
              "email": "YES@hotmail.com",
              "password": "changed-D4BC-8819-3632-D38626487588"
          };


          request(url)
              .get('/api/users')
              .end(function(err, res){
                  res.body.should.have.a.lengthOf(9);
              });
          request(url)
              .get('/api/users/YES@hotmail.com')
              .end(function(err, res){
                  test.should(res.email).be.equal(undefined);
                  test.should(res.password).be.equal(undefined);
              });

          //Saving a user
          request(url)
              .post('/api/users')
              .send(user)
              .end(function(err, res){
                  test.should(res.body.email).be.equal(user.email);
                  test.should(res.body.password).be.equal(user.password);
              });

          //Checking if the user has been saved
          request(url)
              .get('/api/users/YES@hotmail.com')
              .end(function(err, res){
                  test.should(res.body.email).be.equal(user.email);
                  test.should(res.body.password).be.equal(user.password);
              });

          request(url)
              .get('/api/users')
              .end(function(err, res){
                  res.body.should.have.a.lengthOf(10);
              });

          //Updating the user
          request(url)
              .put('/api/users/YES@hotmail.com')
              .send(user2)
              .expect('Content-Type', /json/)
              .expect(200) //Status code
              .end(function(err, res){
                  test.should(res.body.email).be.equal(user2.email);
                  test.should(res.body.password).be.equal(user2.password);
              });

          //Checking if the update went well
          request(url)
              .get('/api/users')
              .end(function(err, res){
                  res.body.should.have.a.lengthOf(10);
              });
          request(url)
              .get('/api/users/YES@hotmail.com')
              .end(function(err, res){
                  test.should(res.body.email).be.equal(user2.email);
                  test.should(res.body.password).be.equal(user2.password);
              });

          //Deleting the user
          request(url)
              .delete('/api/users/YES@hotmail.com')
              .end(function(err, res){
                  test.should(res.body.email).be.equal(user2.email);
                  test.should(res.body.password).be.equal(user2.password);
              });

          //Checking if the deletion was successful
          request(url)
              .get('/api/users/YES@hotmail.com')
              .end(function(err, res){
                  test.should(res.email).be.equal(undefined);
                  test.should(res.password).be.equal(undefined);
              });
          request(url)
              .get('/api/users')
              .end(function(err, res){
                  res.body.should.have.a.lengthOf(9);
                  done();
              });
      })
   });

