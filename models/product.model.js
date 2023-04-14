const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
//    productId :{
//     type:Number,
//     unique:true 
//    },
category :{
    type:String,
    require:true,
    lowercase:true
},
description :{
    type:String,
    require:true,
    lowercase:true
},
price:{
    type : Number,
    require : true
},
name:{
    type:String,
    require:true,
    lowercase:true
},
availableItems : {
    type:Number,
    require:true,
},
imageUrl :{
    type:String,
    require:true
},
manufacturer:{
    type : String,
    require:true,
},
createdAt:{
    type:Date,
    immutable:true,
    default:() =>{
        return Date.now();
    }
},
updatedAt:{
    type:Date,
    default:() =>{
        return Date.now();
    } 
}
});

module.exports = mongoose.model('product', productSchema);