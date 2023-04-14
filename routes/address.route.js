const addressController = require('../controllers/address.controller');

const authMiddleware = require('../middleware/auth');

const userMiddleware = require('../middleware/user.middleware');

module.exports = function (app) {

    app.post('/addresses', [authMiddleware.verifyToken, userMiddleware.verifyContactNumber, userMiddleware.verifyZipCode],
    addressController.addAddress
    );

}