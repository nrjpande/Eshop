const authController = require('../controllers/auth.controller');

module.exports = function(app){

    app.post('/users', authController.signup);

    // app.post('/crm/api/v1/auth/signIn', authController.signIn);

}