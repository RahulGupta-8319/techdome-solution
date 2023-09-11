const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const loanController = require('../controllers/loanController')
const https = require('https');

router.get('/', (req, res) => {


    res.send('working fine ...!!')

})

router.post('/signup', userController.createUser)
router.post('/login', userController.loginUser)

router.post('/createloan', loanController.createLoan)
router.put('/loanpayment', loanController.loanPayment)

router.all('*', (req, res) => {
    res.send('page not found...!!!')
})


module.exports = router

