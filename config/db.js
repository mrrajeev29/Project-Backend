const mongoose= require('mongoose');
const colors=require('colors')
const connectDB=async()=>{
    try{
        await mongoose.connect('mongodb+srv://ag8244932:gIdTMXNWJrPiocni@data.uxqhtt5.mongodb.net/?retryWrites=true&w=majority&appName=Data');
        console.log(`connected to database ${mongoose.connection.host}`.bgMagenta.white);
    }catch (error){
        console.log(`Mongo Connect Error`.bgRed.white);
    }
}
module.exports=connectDB; 