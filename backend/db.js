const  mongoose =require("mongoose")
const dotenv=require('dotenv')
dotenv.config()
mongoose.connect(process.env.DB_URL)

const userschema=new mongoose.Schema({
    username:String,
    password:String,
    firstName:String, 
    lastName:String
})
const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})
const Account=mongoose.model('Account',accountSchema)
const User=mongoose.model('User',userschema)
module.exports={
    User,Account
}