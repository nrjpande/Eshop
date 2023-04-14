const authController = require('../controllers/auth.controller');

const userMiddleware = require('../middleware/user.middleware');

module.exports = function (app) {

    app.post('/users', [userMiddleware.validateEmail, userMiddleware.verifyContactNumber], authController.signup);

    app.post('/auth', authController.signIn);

}