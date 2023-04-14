const addressController = require('../controllers/address.controller');

const authMiddleware = require('../middleware/auth');

module.exports = function (app) {

    app.post('/addresses', [authMiddleware.verifyToken, authMiddleware.verifyContactNumber, authMiddleware.verifyZipCode],
        addressController.addAddress
    );

}