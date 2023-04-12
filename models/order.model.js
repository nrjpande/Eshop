const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
   orderId :{
    type:Number,
    require:true,
    unique:true 
   },
productId :{
    type:Number,
    require:true,
    unique:true
},
orderAmount :{
    type:Number,
    require:true,
},
addressId :{
    type:Number,
    require:true
},
userId :{
    type:Number,
    require:true,
    unique:true 
   },

orderDate:{
    type:Date,
    immutable:true,
    default:() =>{
        return Date.now();
    }
}
});

module.exports = mongoose.model('order', orderSchema);