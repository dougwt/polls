const express = require('express');
const request = require('supertest');
const assert = require('assert');
const sinon = require('sinon');

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
    require('../routes/pollRoutes')(app);

    describe('unauthenticated', () => {
      beforeEach(() => {

      });

      it('responds to a GET request to /api/polls', (done) => {
        request(app)
          .get('/api/polls')
          .set('Accept', 'application/json')
          .expect((res) => {
            console.log(res.body);
          })
          .expect('Content-Type', /json/)
          .expect(200, done);
      });

      it('responds to a POST request to /api/polls');

      it('responds to a GET request to /api/polls/:id');

      it('responds to a POST request to /api/polls/:id');

      it('responds to a DELETE request to /api/polls/:id');

      it('responds to a POST request to /api/polls/new');

      it('responds to requests for an unrecognized path');
    });

    describe('authenticated', () => {
      beforeEach(() => {

      });

      it('responds to a GET request to /api/polls');

      it('responds to a POST request to /api/polls');

      it('responds to a GET request to /api/polls/:id');

      it('responds to a POST request to /api/polls/:id');

      it('responds to a DELETE request to /api/polls/:id');

      it('responds to a POST request to /api/polls/new');

      it('responds to requests for an unrecognized path');
    });

  });
});
