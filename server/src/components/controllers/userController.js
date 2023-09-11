const userModel = require('../models/userModel')

const nameRegex = /^[a-zA-Z]+$/
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,15}$/

const createUser = async (req, res) => {
    try {

        // console.log('inside create user', req.body);

        let body = req.body

        // same validation

        let { firstName, lastName, email, password, confirmPassword } = body

        if (!body) return res.status(400).send({ status: false, message: "please provide user details" });

        if (!firstName) return res.status(400).send({ status: false, message: "fname is required" });
        if (!nameRegex.test(firstName)) return res.status(400).send({ status: false, message: "firstName can contain only small & capital latter EG:'techdome'" })

        if (!lastName) return res.status(400).send({ status: false, message: "lastName is required" });
        if (!nameRegex.test(lastName)) return res.status(400).send({ status: false, message: "lastName can contain only small & capital latter EG:'solution'" })

        if (!email) return res.status(400).send({ status: false, message: "email is required" });
        if (!emailRegex.test(email)) return res.status(400).send({ status: false, message: "ENVALID EMAIL eg:techdome123@gmail.com" })

        if (!password) return res.status(400).send({ status: false, message: "password is required" });
        if (!passwordRegex.test(password)) return res.status(400).send({ status: false, message: "write srong password contain atleast 1 latter & 1 digit  characters between 8-15 " })

        if (!confirmPassword) return res.status(400).send({ status: false, message: "confirmPassword is required" });

        // check duplicate email 
        let isExistUser = await userModel.findOne({ email })
        if (isExistUser) return res.status(400).send({ status: false, message: "This email is Already register " });

        if (password !== confirmPassword) return res.status(400).send({ status: false, message: "password and confirm password should be same" });

        // console.log('reached');


        const createUser = await userModel.create(body)
        // console.log('===>', createUser);

        return res.status(201).send({ status: true, message: "User created successfully", data: createUser });

    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}


const loginUser = async (req, res) => {
    try {

        // console.log('sever inside create user', req.body);

        let body = req.body

        // same validation

        let { email, password } = body

        if (!email) return res.status(400).send({ status: false, message: "email is required" });
        if (!password) return res.status(400).send({ status: false, message: "password is required" });

        // check duplicate email 
        let findUser = await userModel.findOne({ email })
        if (!findUser) return res.status(400).send({ status: false, message: "User not Found" });

        if (findUser.password !== body.password)
            return res.status(400).send({ status: false, message: "Wrong Password " });

        //console.log(findUser);

        return res.status(201).send({ status: true, message: "Login Successfully", data: findUser });

    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

module.exports = { createUser, loginUser }