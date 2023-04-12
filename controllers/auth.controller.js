const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const secret = require('../configs/Auth.configs');
const bodyParser = require('body-parser');

const secretConfig = require('../configs/Auth.configs');

//SignUp API

function validateEmail(email){

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,6}$/;
    if (!regex.test(email)) {
      return "invalid";
    } else {
      return "valid";
    }
}

async function signup(req, res) {
try{
    const emailReq = req.body.email;

    const userCheck = await User.find({email : emailReq});

    if(userCheck.length !== 0){
        console.log("Email Id Already Registered!");
        return [JSON.stringify({ message: "Try any other email, this email is already registered!" }), 400];
    }

    if(validateEmail(emailReq) == "invalid"){
        console.log("Email invalid!");
        return [JSON.stringify({ message: 'Invalid email-id format!' }), 400];
    }

    const phoneNumberReq = req.body.phoneNumber;

    if(!isNaN(phoneNumberReq) && phoneNumberReq.length !== 10){
        console.log("Email phone number!");
        return [JSON.stringify({ message: 'Invalid contact number!' }), 400];
    }

    const UserObj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: emailReq,
        password: bcrypt.hashSync(req.body.password, 8),
        phoneNumber: phoneNumberReq
    };

    
        const user = await User.create(UserObj);

        res.status(200).send({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,

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

async function signIn(req, res) {

    const user = await User.findOne({ userName: req.body.userName });

    if (user == null) {
        res.status(400).send({
            message: "Userid doesn't exist."
        });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(200).send({
            message: "Invalid Password."
        });
    }

    var token = jwt.sign({ userName: user.userName, someData: "Important" },
        secretConfig.secret,
        { expiresIn: 5000 }
    );

    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,

        accessToken: token,
    });
}