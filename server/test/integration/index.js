const app = require('../../app')

//REQUIRE MODELS
const User = require('../../models/user')
const Question = require('../../models/question')

//REQUIRE CHAI AND MOCHA
const mocha = require('mocha')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

//START TESTING

//TESTING FOR USER
describe("Test for User", function () {
    //SET UP BEFORE TESTING USER
    before(function (done) {
        chai.request(app)
            .get('/api/user/seed')
            .end(function (err, res) {
                console.log("User seeded")
                done()
            })
    })

    after(function (done) {
        chai.request(app)
            .delete('/api/user')
            .end(function (err, res) {
                console.log("All user deleted")
                done()
            })
    })

    describe("Test if get all users working", function () {

        it("Expect to return all list of users", function (done) {
            chai.request(app)
                .get('/api/user')
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(res.body[0].name).to.equal('admin')
                    done()
                })
        })
    })

    describe("Test if register user working", function () {

        it("Expect to return user that has been created", function (done) {
            chai.request(app)
                .post('/api/user/register')
                .send({
                    name: 'name create',
                    username: 'usernamecreate',
                    password: 'passwordcreate',
                    email: 'create@gmail.com'
                })
                .end(function (err, res) {
                    User.findOne({
                        username: res.body.username
                    }, function (err, data) {
                        expect(res).to.have.status(200)
                        expect(res.body.userId).to.equal(data.userId)
                        expect(res.body.name).to.equal(data.name)
                        expect(res.body.username).to.equal(data.username)
                        expect(res.body.email).to.equal(data.email)
                        done()
                    })
                })
        })
    })

    describe("Test if login user working", function () {
        it("Expect to return user session if can login", function (done) {
            chai.request(app)
                .post('/api/user/login')
                .send({
                    username: 'admin',
                    password: 'admin'
                })
                .end(function (err, res) {
                    expect(res).to.have.session
                    done()
                })
        })
    })

    describe("Test if delete user working", function () {

        it("Expect to return true if delete user working", function (done) {

            User.findOne({}, {}, { sort: { 'userId' : -1 } }, function (err, data) {
                chai.request(app)
                    .delete(`/api/user/${data.userId}`)
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        expect(res.body.name).to.equal(data.name)
                        done()
                    })
            })
        })
    })

    describe("Test if update user working", function () {

        it("Expect to return user that has been updated", function (done) {

            let input = {
                name: 'name update',
                username: 'username update',
                password: 'passwordupdate',
                email: 'update@gmail.com'
            }

            User.findOne({}, {}, { sort: { 'createdAt' : -1 } }, function (err, data) {
                chai.request(app)
                    .put(`/api/user/${data.userId}`)
                    .send(input)
                    .end(function (err, res) {
                        User.findOne({
                            userId: data.userId
                        }, function (err2, data2) {
                            expect(res).to.have.status(200)
                            expect(res.body.name).to.equal(data2.name)
                            expect(res.body.username).to.equal(data2.username)
                            expect(res.body.email).to.equal(data2.email)
                            done()
                        })
                    })
            })
        })
    })
})

//TESTING FOR QUESTION
describe.only("Test for Question", function () {
//     //SET UP BEFORE TESTING QUESTION


    before(function (done) {
        chai.request(app)
            .get('/api/user/seed')
            .end(function (err, res) {
                console.log("User seeded")

            })

        chai.request(app)
            .get('/api/question/seed')
            .end(function (err, res) {
                console.log("User and Question seeded")
                done()
            })
    })

    after(function (done) {
        chai.request(app)
            .delete('/api/user')
            .end(function (err, res) {
                console.log("All user deleted")
            })

        chai.request(app)
            .delete('/api/question')
            .end(function (err, res) {
                console.log("All question deleted")
                done()
            })
    })

    describe("Test if get all question working", function () {

        it("Expect to return all list of question", function (done) {
            chai.request(app)
                .get('/api/question')
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(res.body[0].title).to.equal('title a')
                    expect(res.body[0].content).to.equal('content a')
                    done()
                })
        })
    })

    describe("Test if create question working", function () {

        it("Expect to return question that has been created", function (done) {
            chai.request(app)
                .post('/api/question')
                .send({
                    createdBy: 1,
                    title: 'title create',
                    content: 'content create',
                    votes: [],
                    answer: []
                })
                .end(function (err, res) {
                    Question.findOne({
                        title: res.body.title
                    }, function (err, data) {
                        expect(res).to.have.status(200)
                        expect(res.body.questionId).to.equal(data.questionId)
                        expect(res.body.title).to.equal(data.title)
                        expect(res.body.content).to.equal(data.content)
                        done()
                    })
                })
        })
    })

    describe("Test if delete question working", function () {

        it("Expect to return true if delete question working", function (done) {

            Question.findOne({}, {}, { sort: { 'questionId' : -1 } }, function (err, data) {
                chai.request(app)
                    .delete(`/api/question/${data.questionId}`)
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        expect(res.body.title).to.equal(data.title)
                        expect(res.body.content).to.equal(data.content)
                        done()
                    })
            })
        })
    })

    describe("Test if update question working", function () {

        it("Expect to return question that has been updated", function (done) {

            let input = {
                title: 'title update',
                content: 'content update'
            }

            Question.findOne({}, {}, { sort: { 'questionId' : -1 } }, function (err, data) {
                chai.request(app)
                    .put(`/api/question/${data.questionId}`)
                    .send(input)
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        expect(res.body.title).to.equal(input.title)
                        expect(res.body.content).to.equal(input.content)
                        done()
                    })
            })
        })
    })

    describe("Test if vote question working", function () {

        it.only("Expect to return vote that has been inserted", function (done) {
            User.findOne({}, {}, { sort: { 'createdAt' : -1 } }, function (errUser, dataUser) {
                let input = {
                    id:dataUser._id
                }

                Question.findOne({}, {}, { sort: { 'createdAt' : -1 } }, function (err, data) {
                    chai.request(app)
                        .put(`/api/question/vote/${data._id}`)
                        .send(input)
                        .end(function (err, res) {

                            Question.findOne({
                                _id: data._id
                            } ,function (err2, data2) {
                                expect(res).to.have.status(200)
                                expect(res.body.votes[res.body.votes.length - 1]).to.exist
                                // expect(res.body.votes[res.body.votes.length - 1]).to.equal(dataUser._id)
                                done()
                            })
                        })
                })
            })
        })

    })

    describe("Test if add answer working", function () {

        it("Expect to return answers that has been inserted", function (done) {

            User.findOne({}, {}, { sort: { 'createdAt' : -1 } }, function (errUser, dataUser) {
                let input = {
                    id:dataUser._id,
                    answer: "testing answer"
                }

                Question.findOne({}, {}, { sort: { 'questionId' : -1 } }, function (err, data) {
                    chai.request(app)
                        .put(`/api/question/answer/${data.questionId}`)
                        .send(input)
                        .end(function (err, res) {

                            Question.find(function (err2, data2) {
                                expect(res).to.have.status(200)
                                expect(res.body.answers[res.body.answers.length - 1].answer).to.equal(input.answer)
                                done()
                            })
                        })
                })
            })
        })
    })

    describe("Test if vote answer working", function () {

        it("Expect to return vote answer that has been inserted", function (done) {

            User.findOne({}, {}, { sort: { 'createdAt' : -1 } }, function (errUser, dataUser) {
                let input = {
                    id:dataUser._id
                }

                Question.findOne({}, {}, { sort: { 'createdAt' : -1 } }, function (err, data) {
                    chai.request(app)
                        .put(`/api/question/answer/vote/${data._id}/${data.answers[data.answers.length - 1]._id}`)
                        .send(input)
                        .end(function (err, res) {

                            Question.findOne({
                                _id: data._id
                            } ,function (err2, data2) {
                                expect(res).to.have.status(200)
                                expect(res.body.answers[res.body.answers.length - 1].answerVotes).to.exist
                                done()
                            })
                        })
                })
            })
        })
    })
})

