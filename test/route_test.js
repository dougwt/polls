const express = require('express');
const passport = require('passport');
const expect = require('chai').expect;
const request = require('supertest');
var bodyParser = require('body-parser');
const User = require('../models/User');
const Poll = require('../models/Poll');
const { starfleet, starwars, color, color_extra, taco } = require('./fixtures');

describe('API routes', () => {
  describe('Poll routes', () => {
    // Create a test app environment
    const app = express();
    app.use(bodyParser.json());
    require('../routes')(app);

    // Declare variables for use in all tests
    let poll1, poll2, poll3;
    let alex, maria, zach;

    // Reload fixtures into mongo before each test
    beforeEach((done) => {
      alex = new User({ googleId: 'alex' });
      maria = new User({ googleId: 'maria' });
      zach = new User({ googleId: 'zach' });
      Promise.all([alex.save(), maria.save(), zach.save()])
        .then(() => {
          poll1 = new Poll({ ...starfleet, owner: alex });
          poll2 = new Poll({ ...starwars, owner: maria });
          poll3 = new Poll({ ...color, owner: zach });

          Promise.all([poll1.save(), poll2.save(), poll3.save()])
            .then(() => {
              expect(poll1.isNew).to.equal(false);
              expect(poll2.isNew).to.equal(false);
              expect(poll3.isNew).to.equal(false);
              done();
            });
        })
        .catch((err) => done(err));
    })

    //////////////////////
    // UNAUTHENTICATED
    //////////////////////
    describe('unauthenticated', () => {
      it('GET /api/polls', (done) => {
        request(app)
          .get('/api/polls')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(401)
          .then(res => {
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal('You are unauthorized to make this request.');
            done();
          })
          .catch((err) => done(err));
      });

      it('POST /api/polls/new', (done) => {
        request(app)
          .post(`/api/polls/${poll3.id}`)
          .send({ ...color_extra })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(401)
          .then(res => {
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal('You are unauthorized to make this request.');
            done();
          })
          .catch((err) => done(err));
      });

      it('GET /api/polls/:id', (done) => {
        request(app)
          .get(`/api/polls/${poll1.id}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(401)
          .then(res => {
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal('You are unauthorized to make this request.');
            done();
          })
          .catch((err) => done(err));
      });

      it('POST /api/polls/:id', (done) => {
        request(app)
          .post(`/api/polls/${poll3.id}`)
          .send({ ...color_extra })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(401)
          .then(res => {
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal('You are unauthorized to make this request.');
            done();
          })
          .catch((err) => done(err));
      });

      it('DELETE /api/polls/:id', (done) => {
        const { id } = poll3;

        request(app)
          .delete(`/api/polls/${id}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(401)
          .then(res => {
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal('You are unauthorized to make this request.');
            done();
          })
          .catch((err) => done(err));
      });

      it('POST api/polls/:id/:choice', (done) => {
        const { id } = poll1;
        const choice = poll1.choices[2].id;

        request(app)
          .post(`/api/polls/${id}/${choice}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(401)
          .then(res => {
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal('You are unauthorized to make this request.');
            done();
          })
          .catch((err) => done(err));
      });
    });

    //////////////////////
    // AUTHENTICATED
    //////////////////////
    describe('authenticated', () => {
      // Utility func to mock user auth
      // Source: https://stackoverflow.com/a/27866991
      const Layer = require('express/lib/router/layer');
      function login(user) {
        var fn = function insertUser(req, res, next) {
          req.user = user;
          next();
        }

        var layer = new Layer('/', {
          sensitive: false,
          strict: false,
          end: false
        }, fn);
        layer.route = undefined;

        app._router.stack.unshift(layer);
      }
      function logout() {
        app._router.stack.shift();
      }

      // Login to the Zach account before each test in this section
      beforeEach(() => login(zach));
      afterEach(() => logout());

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
            .catch((err) => done(err));
        });
      })

      describe('POST /api/polls/new', () => {
        it('responds to an invalid owner', (done) => {
          request(app)
            .post('/api/polls/new')
            .send({ ...taco, owner: 'invalid-id' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(res => {
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal('Invalid user');
              done();
            })
            .catch((err) => done(err));
        });

        it('rejects request to save a poll as a different user', (done) => {
          request(app)
            .post('/api/polls/new')
            .send({ ...taco, owner: alex._id })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .then(res => {
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal('You are unauthorized to make this request.');
              done();
            })
            .catch((err) => done(err));
        });

        it('responds to a valid request', (done) => {
          request(app)
            .post('/api/polls/new')
            .send({ ...taco, owner: zach._id })
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
            .catch((err) => done(err));
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
            .catch((err) => done(err));
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
            .catch((err) => done(err));
        });
      })

      describe('POST /api/polls/:id', () => {
        it('responds to an invalid id', (done) => {
          request(app)
            .post('/api/polls/fakeid')
            .send({ ...color_extra })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(res => {
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal('Invalid poll');
              done();
            })
            .catch((err) => done(err));
        });

        it('rejects request to update a poll belonging to a different user', (done) => {
          request(app)
            .post(`/api/polls/${poll1.id}`)
            .send({ ...color_extra })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .then(res => {
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal('You are unauthorized to make this request.');
              done();
            })
            .catch((err) => done(err));
        });

        it('responds to a valid id', (done) => {
          request(app)
            .post(`/api/polls/${poll3.id}`)
            .send({ ...color_extra })
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
            .catch((err) => done(err));
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
            .catch((err) => done(err));
        });

        it('rejects request to delete a poll belonging to a different user', (done) => {
          const { id } = poll1;

          request(app)
            .delete(`/api/polls/${id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .then(res => {
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal('You are unauthorized to make this request.');
              done();
            })
            .catch((err) => done(err));
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
                .catch((err) => done(err));
            })
            .catch((err) => done(err));
        });
      })

      describe('POST api/polls/:id/:choice', () => {
        it('responds to an invalid poll id', (done) => {
          const id = 'fakeid'
          const choice = poll1.choices[2].id;

          request(app)
            .post(`/api/polls/${id}/${choice}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(res => {
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal('Invalid poll');
              done();
            })
            .catch((err) => done(err));
        });

        it('responds to an invalid choice id', (done) => {
          const { id } = poll1;
          const choice = 'fakechoice';

          request(app)
            .post(`/api/polls/${id}/${choice}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(res => {
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal('Invalid choice');
              done();
            })
            .catch((err) => done(err));
        });

        it('responds to a valid id', (done) => {
          const { id } = poll1;
          const choice = poll1.choices[2].id;

          expect(poll1.choices[2].votes).to.equal(3);

          request(app)
            .post(`/api/polls/${id}/${choice}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
              expect(res.body.choices[2].votes).to.equal(4);
              expect(res.body.respondents).to.contain(zach.id);
              done();
            })
            .catch((err) => done(err));
        });

        it('rejects attempts to vote multiple times', (done) => {
          const { id } = poll1;
          let choice = poll1.choices[2].id;

          expect(poll1.choices[2].votes).to.equal(3);

          request(app)
            .post(`/api/polls/${id}/${choice}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
              expect(res.body.choices[2].votes).to.equal(4);
              expect(res.body.respondents).to.contain(zach.id);
              choice = poll1.choices[1].id;
              request(app)
                .post(`/api/polls/${id}/${choice}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
                .then(res => {
                  expect(res.body).to.have.property('error');
                  expect(res.body.error).to.equal('You have already voted on this poll.');
                  done();
                })
                .catch((err) => done(err));
            })
            .catch((err) => done(err));
        });
      })

      it('responds to requests for an unrecognized path', (done) => {
        request(app)
          .get('/some/fake-path')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
          .then(res => {
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal('Resource not found');
            done();
          })
          .catch((err) => done(err));
      });
    });
  });
});
