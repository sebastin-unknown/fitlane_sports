const mongoose= require("mongoose")

// mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/LoginSignUpTutorial")
.then(()=>{
    console.log("database connected")
})
.catch(()=>{
    console.log("failed to connect")
})

const LogInSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

})

const collection =new mongoose.model("Collection1",LogInSchema)

module.exports=collection