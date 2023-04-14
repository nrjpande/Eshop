const Order = require('../models/order.model');
const User = require('../models/user.model');
const Address = require('../models/address.schema');
const Product = require('../models/product.model');

exports.createOrder = async (req, res) => {

    try {

        const user = await User.findOne({ email: req.email });
        //if user is not available or role of the user is not USER then order can't be created  
        if (!user || user.role != 'USER') {
            console.log("You are not authorised to access this endpoint.");
            return res.status(401).send({ message: 'You are not authorised to access this endpoint.' });
        }

        const product = await Product.findOne({ _id: req.body.productId });
        //if product is not available or out of stock then order can't be created
        if (!product || product.availableItems < req.body.quantity) {
            console.log("Either No Product Available with given ID or quantity is less")
            return res.status(404).json({ message: "Product with ID " + req.params.productId + " is currently out of stock!" });
        }

        const address = await Address.findOne({ _id: req.body.addressId });
        //if address is not available then order can't be created
        if (!address) {
            console.log("No Address found, check again")
            return res.status(404).json({ message: "No Address found for ID " + req.body.addressId + "!" })
        }
        //finally after all checks order is created

        const orderObj = {
            orderAmount: req.body.quantity * product.price,
            addressId: req.body.addressId,
            userId: user._id
        }

        const order = await Order.create(orderObj);

        res.status(200).send({
            id: order._id,
            user: user,
            product: product,
            shippingAddress: address,
            amount: order.orderAmount,
            orderDate: order.orderDate
        })

    } catch (err) {
        console.log("Error Creating Order", err);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}