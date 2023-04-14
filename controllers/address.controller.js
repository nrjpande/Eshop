const Address = require('../models/address.schema');
const User = require('../models/user.model')

exports.addAddress = async (req, res) => {

    try {

        const addressObj = {
            name: req.body.name,
            contactNumber: req.body.contactNumber,
            street: req.body.street,
            landmark: req.body.landmark,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
        }

        const address = await Address.create(addressObj);

        const user = await User.findOne({ email: req.email });

        res.status(200).send({
            id: address._id,
            name: address.name,
            contactNumber: address.contactNumber,
            street: address.street,
            landmark: address.landmark,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            createdAt: address.createdAt,
            updatedAt: address.updatedAt,
            user: user
        });

    } catch (err) {
        console.log("Error updating Address", err);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }

}