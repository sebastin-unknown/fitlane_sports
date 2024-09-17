// const Email = require("email-templates")
const mongoose = require("mongoose")

const contacteSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    
    phno:{
        type:Number,
        require:true,
        Range:10
    },
        
    
    subject:{
        type:String,
        
        require:true},
        
    
    message:{
        type:String,
        
        require:true},
    })



module.exports = mongoose.model("contact",contacteSchema)     
// module.exports = contactEE