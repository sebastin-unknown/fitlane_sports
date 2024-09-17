const mongoose= require("mongoose")
const Schema = mongoose.Schema;

// mongoose.set('strictQuery', false);
const LogInSchema= new Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },

})

// const collection =new mongoose.model("Login_Details",LogInSchema)

module.exports=mongoose.model("Login_Details",LogInSchema)