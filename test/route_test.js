const express = require('express');
const expect = require('chai').expect;
const request = require('supertest');
const sinon = require('sinon');
var bodyParser = require('body-parser');
const User = require('../models/User');
const Poll = require('../models/Poll');

describe('API routes', () => {
  // describe('Authentication routes', () => {
  //   let stub;
  //
  //   const app = express();
  //   app.use(passport.initialize());
  //   app.use(passport.session());
  //   require('../routes/authRoutes')(app);
  //
  //   beforeEach(() => {
  //     stub = sinon.stub(passport, 'authenticate').returns(function() {});
  //     // stub.yields(null, { statusCode: 200 }, [{ name: 'org-one' }, { name: 'org-two'}]);
  //   })
  //
  //   it('can authenticate with google', (done) => {
  //     request(app)
  //       .get('/auth/google')
  //       // .set('Accept', 'application/json')
  //       .expect(() => {
  //         if (!stub.called) {
  //           console.log(stub);
  //           throw new Error('Stub not called');
  //         }
  //       })
  //       // .expect('Content-Type', /json/)
  //       .expect(200, done);
  //
  //   });
  // });

  describe('Poll routes', () => {
    const app = express();
    app.use(bodyParser.json());
    require('../routes/pollRoutes')(app);
    let poll1, poll2, poll3;

    beforeEach((done) => {
      alex = new User({ googleId: 'alex' });
      maria = new User({ googleId: 'maria' });
      zach = new User({ googleId: 'zach' });
      Promise.all([alex.save(), maria.save()])
        .then(() => {
          poll1 = new Poll({
            owner: alex,
            question: 'Who is your favorite Starfleet captain?',
            choices: [
              {
                text: 'Kirk (TOS)',
                votes: 5
              }, {
                text: 'Picard (TNG)',
                votes: 4
              }, {
                text: 'Sisko (DS9)',
                votes: 3
              }, {
                text: 'Janeway (Voyager)',
                votes: 2
              }, {
                text: 'Archer (Enterprise)',
                votes: 1
              }, {
                text: 'Lorca (Discovery)',
                votes: 0
              }
            ],
            respondents: []
          });

          poll2 = new Poll({
            owner: maria,
            question: 'Who is your favorite Star Wars captain?',
            choices: [
              {
                text: 'Han Solo',
                votes: 5
              }, {
                text: 'Wedge Antilles',
                votes: 4
              }, {
                text: 'Lando Calrissian',
                votes: 3
              }, {
                text: 'Phasma',
                votes: 2
              }
            ],
            respondents: []
          });

          poll3 = new Poll({
            owner: zach,
            question: 'What is your favorite color?',
            choices: [
              {
                text: 'Red',
                votes: 0
              }, {
                text: 'Blue',
                votes: 0
              }, {
                text: 'Green',
                votes: 0
              }
            ],
            respondents: []
          })

          Promise.all([poll1.save(), poll2.save(), poll3.save()])
            .then(() => {
              expect(poll1.isNew).to.equal(false);
              expect(poll2.isNew).to.equal(false);
              expect(poll3.isNew).to.equal(false);
              done();
            });
        })
        .catch((err) => console.log(err));
    })

    describe('unauthenticated', () => {
      // TODO: Add tests for unauthenticated requests
    });

    describe('authenticated', () => {
      describe('GET /api/polls', () => {
        it('responds to a request', (done) => {
          request(app)
            .get('/api/polls')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
              expect(res.body.length).to.equal(3);
              res.body.forEach(poll => {
                expect(poll).to.have.property('owner');
                expect(poll).to.have.property('question');
                expect(poll).to.have.property('choices');
                expect(poll).to.have.property('respondents');
              })
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      })

      describe('POST /api/polls/new', () => {
        it('responds to an invalid owner', (done) => {
          request(app)
            .post('/api/polls/new')
            .send({
                owner: 'invalid-id',
                question: 'Who has the best fast food tacos?',
                choices: [
                  {
                    text: 'Taco Time',
                    votes: 0
                  }, {
                    text: 'Taco Bell',
                    votes: 0
                  }, {
                    text: 'Jack in the Box',
                    votes: 0
                  }
                ],
                respondents: []
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(res => {
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal('Invalid user');
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });

        it('responds to a valid request', (done) => {
          request(app)
            .post('/api/polls/new')
            .send({
                owner: alex._id,
                question: 'Who has the best fast food tacos?',
                choices: [
                  {
                    text: 'Taco Time',
                    votes: 0
                  }, {
                    text: 'Taco Bell',
                    votes: 0
                  }, {
                    text: 'Jack in the Box',
                    votes: 0
                  }
                ],
                respondents: []
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
              expect(res.body).to.have.property('owner');
              expect(res.body.question).to.equal('Who has the best fast food tacos?');
              expect(res.body.choices.length).to.equal(3);
              expect(res.body.choices[0].text).to.equal('Taco Time');
              expect(res.body.choices[1].text).to.equal('Taco Bell');
              expect(res.body.choices[2].text).to.equal('Jack in the Box');
              expect(res.body).to.have.property('respondents');
              expect(res.body.respondents.length).to.equal(0);
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      });

      describe('GET /api/polls/:id', () => {
        it('responds to an invalid id', (done) => {
          request(app)
            .get('/api/polls/fakeid')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(res => {
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal('Invalid poll');
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });

        it('responds to a valid id', (done) => {
          request(app)
            .get(`/api/polls/${poll1.id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
              expect(res.body).to.have.property('owner');
              expect(res.body).to.have.property('question');
              expect(res.body).to.have.property('choices');
              expect(res.body).to.have.property('respondents');
              expect(res.body.choices.length).to.equal(6);
              res.body.choices.forEach(choice => {
                expect(choice).to.have.property('text');
                expect(choice).to.have.property('votes');
              })
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      })

      describe('POST /api/polls/:id', () => {
        it('responds to an invalid id', (done) => {
          request(app)
            .post('/api/polls/fakeid')
            .send({
              question: 'What is your favorite color?',
              choices: [
                {
                  text: 'Red',
                  votes: 0
                }, {
                  text: 'Blue',
                  votes: 0
                }, {
                  text: 'Green',
                  votes: 0
                }, {
                  text: 'Purple',
                  votes: 0
                }
              ]
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(res => {
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal('Invalid poll');
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
        it('responds to a valid id', (done) => {
          request(app)
            .post(`/api/polls/${poll3.id}`)
            .send({
              question: 'What is your favorite color?',
              choices: [
                {
                  text: 'Red',
                  votes: 0
                }, {
                  text: 'Blue',
                  votes: 0
                }, {
                  text: 'Green',
                  votes: 0
                }, {
                  text: 'Purple',
                  votes: 0
                }
              ]
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
              expect(res.body).to.have.property('owner');
              expect(res.body).to.have.property('question');
              expect(res.body).to.have.property('choices');
              expect(res.body).to.have.property('respondents');
              expect(res.body.choices.length).to.equal(4);
              res.body.choices.forEach(choice => {
                expect(choice).to.have.property('text');
                expect(choice).to.have.property('votes');
              })
              expect(res.body.choices[3].text).to.equal('Purple');
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      })

      describe('DELETE /api/polls/:id', () => {
        it('responds to an invalid id', (done) => {
          request(app)
            .delete('/api/polls/fakeid')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(res => {
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal('Invalid poll');
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });

        it('responds to a valid id', (done) => {
          const { id } = poll3;

          request(app)
            .delete(`/api/polls/${id}`)
            .set('Accept', 'application/json')
            .expect(204)
            .then(res1 => {
              expect(res1.body.length).to.equal(undefined);

              request(app)
                .get(`/api/polls/${id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
                .then(res2 => {
                  expect(res2.body).to.have.property('error');
                  expect(res2.body.error).to.equal('Invalid poll');
                  done();
                })
                .catch(err => {
                  console.log(err);
                  done();
                });
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      })

      it('responds to requests for an unrecognized path');
    });

  });
});
