const mongoose = require('mongoose')
var incrementQuestion = require('mongoose-increment');
const Schema = mongoose.Schema

const Question = new Schema({
    createdBy: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    votes: [
        {
            type: Schema.ObjectId,
            ref: 'User'
        }
    ],
    answers: [
        {
            createdBy: {
                type: Schema.ObjectId,
                ref: 'User'
            },
            answer: {
                type: String,
                required: true
            },
            answerVotes: [
                {
                    type: Schema.ObjectId,
                    ref: 'User'
                }
            ]
        }
    ]
}, {
    timestamps: true
})

Question.plugin(incrementQuestion, {
    modelName: 'Question',
    fieldName: 'questionId',
});

Question.pre('find', function (next) {
    this.populate('createdBy', 'name')
    this.populate('votes', 'name')
    this.populate('answers.$.createdBy', 'name')
    next()
})

// Question.pre('findOne', function (next) {
//     this.populate('createdBy', 'name')
//     this.populate('answers.createdBy', 'name')
//     next()
// })

module.exports = mongoose.model('Question', Question)