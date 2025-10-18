/*
Este file trabja la parte centra del servidor, en donde se manejan las rutas y la conexion con la base de datos
*/
const express=require('express');  //importacion de express
const session = require('express-session'); //importacion de express-session
const cors=require('cors');  //importacion de cors
const rutas=require('./serverProcesos');//importacion de las rutas
const path=require('path');      //importacion de path
const app=express();

app.use(session({
    secret: 'MY_secret',
    resave: false,
    saveUninitialized: true,
    cookie:{ secure:false}
 })); // 1 hora
 
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(rutas);  //definicion de la ruta principal
app.use(express.urlencoded({extended:true}));

 app.use(cors({
    origin: 'http://localhost:5500', // el origen de tu front
    credentials: true
}));

 app.use('/api', rutas);  //definicion de la ruta principal

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
});
app.get('/interfazDentro.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'interfazDentro.html'));
});


const PORT=process.env.PORT || 3000;  //definicion del puerto
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
})

