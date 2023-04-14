const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const config = require('../configs/Auth.configs');

verifyToken = (req, res, next) => {

    let token = req.headers['x-auth-token'];

    if (!token) {

        return res.status(403).send({
            message: "Please login first to access this endpoint!"
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Please login first to access this endpoint!"
            });
        }
        req.email = decoded.email;
        next();
    })
}

isAdmin = async (req, res, next) => {

    const user = await User.findOne({ email: req.email });

    if (!user || user.role != 'ADMIN') {
        console.log('You are not authorised to access this endpoint!');
        return [JSON.stringify({ message: 'You are not authorised to access this endpoint!' }, 401)];
    }
    next();
}

const authCheck = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
}

module.exports = authCheck;
