const productController = require('../controllers/product.controller');

const authMiddleware = require('../middleware/auth');

module.exports = function (app) {

    app.post('/products', [authMiddleware.verifyToken, authMiddleware.isAdmin], productController.saveProduct);

    app.get('/products/categories', productController.getProductCategories);

    app.get('/products/:id', productController.productById);

    app.put('/products/:id', [authMiddleware.verifyToken, authMiddleware.isAdmin], productController.updateProduct)

    app.delete('/products/:id', [authMiddleware.verifyToken, authMiddleware.isAdmin], productController.deleteProductByID)

    app.get('/products', productController.searchProducts);
    
}