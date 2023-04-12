const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   userId :{
    type:Number,
    unique:true 
   },
   email:{
    type:String,
    require:true,
    unique:true,
    lowercase:true
   },
firstName :{
    type:String,
    require:true,
    lowercase:true
},
lastName :{
    type:String,
    require:true,
    lowercase:true
},
password:{
    type:String,
    require:true
},
phoneNumber : {
    type:String,
    require:true,
    unique:true
},
role :{
    type:String,
    default: "USER"
},
userName:{
    type : String,
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

module.exports = mongoose.model('user', userSchema);