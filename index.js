const express= require('express')
const cors= require('cors')
const morgan = require('morgan')
const colors= require('colors')
const connectDB = require('./config/db')

const userRoutes=require('./routes/userRoutes')
const codeRoutes=require('./routes/codeRoutes')
connectDB();


const app=express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/code',codeRoutes);


app.listen(8000,()=>{
    console.log(`Server Running on port 8080`.bgCyan.white);
})