const loanModel = require('../models/loanModel')
const moment = require('moment')

const createLoan = async (req, res) => {

    try {

        let data = req.body

        let { firstName, lastName, email, password, loanAmount, term, } = data

        const isloancreated = await loanModel.findOne({ email: email, status: "ongoing" })
        ////console.log("isloancreated", isloancreated);
        if (isloancreated) return res.status(400).send({ status: false, message: "Your Loan is Ongoing First pay Your previous Loan" });

        loanAmount = parseInt(loanAmount)
        term = parseInt(term)

        if (!loanAmount) return res.status(400).send({ status: false, message: "write Loan Amount" });
        if (!term) return res.status(400).send({ status: false, message: "Write terms of your Loan" });
        if (term > loanAmount) return res.status(400).send({ status: false, message: "terms should be less then Loan amount" });


        let remainder = loanAmount % term
        let amount = Math.floor(loanAmount / term)
        const repayments = [];

        let currentDate = moment()

        for (let i = 1; i <= term; i++) {

            if (i == term) {
                repayments.push({
                    date: currentDate.format('Do MMM YYYY'),
                    amount: amount + remainder
                });
            } else {
                repayments.push({
                    date: currentDate.format('Do MMM YYYY'),
                    amount: amount
                });
            }
            currentDate = currentDate.add(1, 'week')
        }

        data.repayments = repayments

        //console.log("data==>", data);
        let loanCreated = await loanModel.create(data)
        //console.log("loanCreate==>", loanCreated);
        return res.status(201).send({ status: true, message: "loanCreated created successfully", data: loanCreated });


    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }

}

const loanPayment = async (req, res) => {
    try {
        //console.log('server inside loan payment');
        let body = req.body

        let { firstName, lastName, email, password, loanAmount, term, _id } = body

        const loanDocument = await loanModel.findOne({ _id });

        if (!loanDocument) {
            //console.log('No document found with the specified ID.');
            return res.status(404).send({ status: false, message: "No Loan found with this user" });

        } else {
            // Find the first unpaid repayment
            const firstUnpaidRepayment = loanDocument.repayments.find(repayment => repayment.status === 'unpaid');

            //console.log(firstUnpaidRepayment);

            if (firstUnpaidRepayment) {
                // Update the status to 'paid'
                firstUnpaidRepayment.status = 'paid';

                // Save the document to persist the changes
                await loanDocument.save();

                let isLastUnpaidPayment = loanDocument.repayments.filter((re) => re.status === 'unpaid')
                if (isLastUnpaidPayment.length === 0) {
                    loanDocument.status = 'paid'
                    await loanDocument.save();


                    return res.status(201).send({ status: true, message: "Your Loan Successfully Completed", data: loanDocument });
                }
                // console.log('Updated document:', loanDocument.repayments);
                return res.status(201).send({ status: true, message: "Loan Payment Done", data: loanDocument });

            } else {

                loanDocument.status = 'paid'
                await loanDocument.save();

                //console.log('No unpaid repayments found.');
                return res.status(201).send({ status: true, message: "No unpaid repayments found.", data: loanDocument });
            }
        }

    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

module.exports = { createLoan, loanPayment }