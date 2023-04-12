const mongoose = require("mongoose");

const addSchema = new mongoose.Schema({
   addId :{
    type:Number,
    require:true,
    unique:true 
   },
   city:{
    type:String,
    require:true,
    lowercase:true
   },
landmark :{
    type:String,
    require:true,
    lowercase:true
},
name :{
    type:String,
    require:true,
    lowercase:true
},
state:{
    type:String,
    require:true,
    lowercase:true
},
phoneNumber : {
    type:String,
    require:true,
    unique:true
},
street :{
    type:String,
    require:true
},
zipCode :{
    type:String,
    require:true
},
userId:{
    type : String,
    require:true,
    unique:true
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

module.exports = mongoose.model('address', addSchema);