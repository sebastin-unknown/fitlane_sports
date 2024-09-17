const mongoose= require("mongoose")
const Schema = mongoose.Schema;

// mongoose.set('strictQuery', false);
const categories= new Schema({
    
    name:{
        type:String,
        required:true
    }

})

// const collection =new mongoose.model("Login_Details",LogInSchema)




module.exports = mongoose.model('Category', categories);

