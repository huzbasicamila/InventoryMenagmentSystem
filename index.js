const express=require('express');
var cors =require('cors');
const connection=require('./connection');
const app = express();

const userRoute= require('./routes/user.js');
const sirovineRoute=require('./routes/sirovine.js');
const proizvodiRoute =require('./routes/proizvodi.js');
const dobavljaciRoute= require('./routes/dobavljaci.js');
const proizvodniprocesRoute= require('./routes/proizvodniproces.js');
const upravljanjesirovinamaRoute=require('./routes/upravljanjesirovinama.js');
const upravljanjeproizvodimaRoute=require('./routes/upravljanjeProizvodima.js');
const upravljanjeDobavljacima=require('./routes/upravljanjeDobavljacima');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/user', userRoute);
app.use('/sirovine', sirovineRoute);
app.use('/proizvodi', proizvodiRoute);
app.use('/dobavljaci', dobavljaciRoute);
app.use('/proizvodniprocesi',proizvodniprocesRoute);
app.use('/upravljanjesirovinama', upravljanjesirovinamaRoute);
app.use('/upravljanjeproizvodina', upravljanjeproizvodimaRoute);
app.use('/upravljanjeDobavljacima', upravljanjeDobavljacima);
module.exports=app;