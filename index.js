const express=require('express');
var cors =require('cors');
const connection=require('./connection');
//const userRoute= require('./routes/user.js');
//const sirovineRoute=require('./routes/sirovine.js');
//const proizvodiRoute =require('./routes/proizvodi.js');
//const dobavljaciRoute= require('./routes/dobavljaci.js');
//const proizvodniprocesRoute= require('./routes/proizvodniproces.js');
const app=express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//app.use('/user', userRoute);
//app.use('/sirovine', sirovineRoute);
//app.use('/proizvodi', proizvodiRoute);
//app.use('/dobavljaci', dobavljaciRoute);
//app.use('/proizvodniprocesi',proizvodniprocesRoute);
module.exports=app;