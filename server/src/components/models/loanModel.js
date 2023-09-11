const mongoose = require('mongoose')

const loanSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    loanAmount: {
        type: Number,
        required: true
    },
    term: {
        type:Number,
        required:true
    },
    aprovalStatus: {
        type: String,
        enum: ["pending", "aproved"],
        default: 'pending'
    },
    status: {
        type: String,
        enum: ["paid","ongoing"],
        default: 'ongoing'
    },
    repayments: [{
        date: String,
        amount: Number,
        status: {
            type: String,
            default:'unpaid',
            enum: ['unpaid', 'paid']
        },
        _id:false
    }]


}, { timestamps: true })

module.exports = mongoose.model('Loan', loanSchema)