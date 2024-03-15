const mongoose =require('mongoose')

const codeSchema= new mongoose.Schema({
    question:{
        type:String,
        required:[true,'question is required']
    },
    language:{
        type:String,
        required:[true,'language is required']
    },
    answer:{
        type:String,
        required:[true, 'image is required']
    },
    comment:{
        type:String
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:[true,"User id is required"],
    },
},{timestamps:true})
const codeModel= mongoose.model('Code',codeSchema);

module.exports= codeModel;