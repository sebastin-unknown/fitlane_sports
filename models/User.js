const mongoose = require("mongoose")

const bcrypt = require("bcrypt")

mongoose.connect("mongodb://127.0.0.1:27017/Fitlane_Sorts",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        
        require:true},
    Login:{
        type:Boolean,
        default:false,
        require:true},
    role:{
        type:String,
        require:true}

})

// helpfull functions 

// whenever you submit the user details automatically this function will execute

userSchema.pre("save",function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password = bcrypt.hashSync(this.password,10)
    next()
})

//campare password

// this is coustom function not mongodb function
userSchema.methods.comparePassword = function(plainText,callback){
    return callback(null,bcrypt.compareSync(plainText,this.password))
}

const userModel = mongoose.model("user",userSchema)     
module.exports = userModel