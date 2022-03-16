import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import 'mocha';

import { app } from '../src/server/index';
import { User } from '../src/server/models';

mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/golden-key-develop');
const db : mongoose.Connection = mongoose.connection;

const should = chai.should();

chai.use(chaiHttp);

describe('Golden-Key', () =>
{
    describe('backend api', () =>
    {
        before((done) =>
        {
            User.deleteOne({ username: 'test@example.com' }, (err : Error) =>
            {
                done();
            });
        });

        describe('/api/users', () =>
        {
            describe('create user', () =>
            {
                it('should fail to validate user creation', (done) =>
                {
                    chai.request(app)
                        .post('/api/users')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            username: 'test@example.com',
                            password: 'test1234',
                        })
                        .end((err, res) =>
                        {
                            res.should.have.status(200);
                            res.body.should.have.property('errors').and.not.be.lengthOf(0);

                            done();
                        });
                });

                it('should add new user to database', (done) =>
                {
                    chai.request(app)
                        .post('/api/users')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            username: 'test@example.com',
                            password: 'test1234',
                            passwordConfirmation: 'test1234'
                        })
                        .end((err, res) =>
                        {
                            res.should.have.status(200);
                            res.body.should.have.property('success').and.equal(true);

                            done();
                        });
                });

                it('should get a message that user already exists', (done) =>
                {
                    chai.request(app)
                        .post('/api/users')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            username: 'test@example.com',
                            password: 'test1234',
                            passwordConfirmation: 'test1234'
                        })
                        .end((err, res) =>
                        {
                            res.should.have.status(200);
                            res.body.should.have.property('errors').and.deep.equal([ 'User already exists!' ]);

                            done();
                        });
                });
            });

            describe('authenticate user', () =>
            {
                it('should fail to log in the testuser', (done) =>
                {
                    chai.request(app)
                        .post('/api/users/login')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            username: 'test@example.com',
                            password: 'test1111',
                        })
                        .end((err, res) =>
                        {
                            res.should.have.status(200);
                            res.body.should.have.property('success').and.equal(false);

                            done();
                        });
                });

                it('should fail to find testuser', (done) =>
                {
                    chai.request(app)
                        .post('/api/users/login')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            username: 'wrong@example.com',
                            password: 'test1234',
                        })
                        .end((err, res) =>
                        {
                            res.should.have.status(200);
                            res.body.should.have.property('success').and.equal(false);

                            done();
                        });
                });

                it('should log in the testuser', (done) =>
                {
                    chai.request(app)
                        .post('/api/users/login')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            username: 'test@example.com',
                            password: 'test1234',
                        })
                        .end((err, res) =>
                        {
                            res.should.have.status(200);
                            res.body.should.have.property('success').and.equal(true);

                            done();
                        });
                });

                it('should fail to authorize the testuser', (done) =>
                {
                    chai.request(app)
                        .post('/api/users/auth')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({ username: 'test@example.com' })
                        .end((err, res) =>
                        {
                            res.should.have.status(403);

                            done();
                        });
                });

                it('should fail to authorize the testusers cookie', (done) =>
                {
                    chai.request(app)
                        .post('/api/users/auth')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('Cookie', 'access_token=wrong-token')
                        .send({ username: 'test@example.com' })
                        .end((err, res) =>
                        {
                            res.should.have.status(403);

                            done();
                        });
                });

                it('should authorize the testuser cookie', (done) =>
                {
                    const agent = chai.request.agent(app);
                    
                    agent
                        .post('/api/users/login')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send({
                            username: 'test@example.com',
                            password: 'test1234'
                        })
                        .then(res =>
                        {
                            res.should.have.cookie('access_token');

                            return agent.post('/api/users/auth').then(res =>
                            {
                                res.should.have.status(200);
                                done();
                            });
                        });
                });
            });

            describe('log out user', () =>
            {
                it('should log out the testuser', (done) =>
                {
                    chai.request(app)
                        .post('/api/users/logout')
                        .end((err, res) =>
                        {
                            res.should.have.status(200);
                            res.body.should.have.property('success').and.equal(true);

                            done();
                        });
                });
            });
        });
    });
});
