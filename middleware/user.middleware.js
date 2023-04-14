const User = require('../models/user.model');

verifyContactNumber = (req, res, next) => {
    const contactNumberReq = req.body.contactNumber;

    if (!isNaN(contactNumberReq) && contactNumberReq.length !== 10) {
        console.log("Invalid phone number!");
        return [JSON.stringify({ message: 'Invalid contact number!' }), 400];
    }
    next();
}

verifyZipCode = (req, res, next) => {

    const zipCodeReq = req.body.zipCodeReq;

    if (!isNaN(zipCodeReq) && zipCodeReq.length !== 6) {
        console.log('Invalid zip code!');
        return [JSON.stringify({ message: 'Invalid zip code!' }, 400)];
    }
    next();
}

validateEmail = (req, res, next) => {

    const email = req.body.email;

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,6}$/;
    if (!regex.test(email)) {
        console.log('Invalid email-id format!');
        return [JSON.stringify({ message: 'Invalid email-id format!' }, 400)];
    }
    next();
}


const detailsValidation = {
    
    verifyZipCode: verifyZipCode,
    verifyContactNumber: verifyContactNumber,
    validateEmail: validateEmail
}

module.exports = detailsValidation;