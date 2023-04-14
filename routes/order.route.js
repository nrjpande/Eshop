const orderController = require('../controllers/order.controller');

const authMiddleware = require('../middleware/auth');

module.exports = function(app){
    app.post('/orders',authMiddleware.verifyToken, orderController.createOrder);
}