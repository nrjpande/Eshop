const Product = require('../models/product.model');

exports.saveProduct = async (req, res) => {
    try {

        const productObj = {
            name: req.body.name,
            availableItems: req.body.availableItems,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            manufacturer: req.body.manufacturer,
        }

        const product = await Product.create(productObj);

        res.status(200).send({
            id: product._id,
            name: product.name,
            category: product.category,
            price: product.price,
            description: product.description,
            manufacturer: product.manufacturer,
            availableItems: product.availableItems,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        });

    } catch (err) {
        console.log("Error Saving Product", err);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

exports.getProductCategories = async (req, res) => {
    try {

        const categoryArray = await Product.find({}, { category: 1 });

        const allCategories = categoryArray.map((result) => result.category);

        res.status(200).send(allCategories);

    } catch (err) {
        console.log("Error fetching categories", err);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

exports.productById = async (req, res) => {

    try {
        const product = await Product.findOne({ _id: req.params.id });

        if (product == null) {
            return res.status(404).json({ message: "No Product found for ID - " + req.params.id + "!" });
        }

        res.status(200).send(product);

    } catch (err) {
        console.log("Error fetching product", err);
        return res.status(404).send({
            message: "Internal server error"
        })
    }
}

exports.updateProduct = async (req, res) => {

    try {

        const productReq = await Product.findOne({ _id: req.params.id });

        if (!productReq) {
            console.log("No Product found for ID - " + req.params.id + "!");
            return res.status(404).json({
                message: "No Product found for ID - " + req.params.id + "!"
            });
        }

        productReq.name = req.body.name != undefined ? req.body.name : productReq.name
        productReq.availableItems = req.body.availableItems != undefined ? req.body.availableItems : productReq.availableItems
        productReq.price = req.body.price != undefined ? req.body.price : productReq.price
        productReq.category = req.body.category != undefined ? req.body.category : productReq.category
        productReq.description = req.body.description != undefined ? req.body.description : productReq.description
        productReq.imageUrl = req.body.imageUrl != undefined ? req.body.imageUrl : productReq.imageUrl
        productReq.manufacturer = req.body.manufacturer != undefined ? req.body.manufacturer : productReq.manufacturer

        const updatedProduct = await productReq.save();

        return res.status(200).send(updatedProduct);

    } catch (err) {
        console.log("Error updating product", err);
        return res.status(404).send({
            message: "Internal server error"
        })
    }
}

exports.deleteProductByID = async (req, res) => {

    try {

        const productReq = await Product.findOne({ _id: req.params.id });

        if (!productReq) {
            console.log("No Product found for ID - " + req.params.id + "!");
            return res.status(404).json({
                message: "No Product found for ID - " + req.params.id + "!"
            });
        }

        const deletedProduct = await Product.deleteOne(productReq);

        res.status(200).send(`Product with ID - ${req.params.id} deleted successfully!`)

    } catch (err) {
        console.log("Error deleting product", err);
        return res.status(404).send({
            message: "Internal server error"
        })
    }
}

exports.searchProducts = async (req, res) => {

    try {
        const { category, name, direction, sortBy } = req.query;
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = direction === 'ASC' ? 1 : -1;
        }

        const query = {};

        if (category) {
            query.category = category;
        }

        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }

        const products = await Product.find(query).sort(sortOptions);

        if (products.length === 0) {
            console.log("No Product found for given search criteria!");
            return res.status(404).json({
                message: "No Product found for given search criteria!"
            });
        }

        res.status(200).json(products);

    } catch (err) {
        console.log("Error searching products", err);
        return res.status(404).send({
            message: "Internal server error"
        })
    }
}