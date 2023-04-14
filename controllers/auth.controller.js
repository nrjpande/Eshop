const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const secret = require('../configs/Auth.configs');
const bodyParser = require('body-parser');

const secretConfig = require('../configs/Auth.configs');

//SignUp API to add a user or an admin


async function signup(req, res) {

    try {

        const emailReq = req.body.email;

        const userCheck = await User.find({ email: emailReq });

        if (userCheck.length !== 0) {
            console.log("Email Id Already Registered!");
            return [JSON.stringify({ message: "Try any other email, this email is already registered!" }), 400];
        }

        const UserObj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            contactNumber: req.body.contactNumber,
            userId: req.body.userId,
            role: req.body.role != undefined ? req.body.role : "USER"
        };

        const user = await User.create(UserObj);

        res.status(200).send({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userId: user.userId

        });
    } catch (err) {
        console.log("Error Creating User", err);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

module.exports = {
    signup: signup,
    signIn: signIn
};

// To signIn the user and send token as header

async function signIn(req, res) {

    try {

        const user = await User.findOne({ email: req.body.email });

        if (user == null) {
            res.status(400).send({
                message: "This email has not been registered!"
            });
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).send({
                message: "Invalid Credentials!"
            });
        }

        var token = jwt.sign({ email: user.email, someData: "Important" },
            secretConfig.secret,
            { expiresIn: 5000 }
        );
        //setting token as header for response
        res.set('x-auth-token', token);

        res.status(200).send({
            email: user.email,
            name: user.firstName + " " + user.lastName,
            isAuthenticated: true
        });
    } catch (err) {
        console.log("Error Signing in the User", err);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}