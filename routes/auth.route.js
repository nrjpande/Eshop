const authController = require('../controllers/auth.controller');

const authMiddleware = require('../middleware/auth');

module.exports = function(app){

    app.post('/users',[authMiddleware.validateEmail, authMiddleware.verifyContactNumber], authController.signup);

    app.post('/auth', authController.signIn);

}