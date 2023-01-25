const express=require('express');
var cors =require('cors');
const connection=require('./connection');
const userRoute= require('./routes/user');
//const categoryRoute=require('./routes/sirovine');
const app=express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/user', userRoute);
//app.use('/sirovine', categoryRoute);

module.exports=app;