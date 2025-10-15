/*
Este file trabja la parte centra del servidor, en donde se manejan las rutas y la conexion con la base de datos
*/
const express=require('express');  //importacion de express
const session = require('express-session'); //importacion de express-session
const cors=require('cors');  //importacion de cors
const rutas=require('./serverProcesos');//importacion de las rutas
const path=require('path');      //importacion de path
const app=express();

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(rutas);  //definicion de la ruta principal

app.use(session({
    secret: 'MY_secret',
    resave: false,
    saveUninitialized: true,
    cookie:{ maxAge: 1000 * 60 * 60, httpOnly:true}
 })); // 1 hora

 app.use('/api', rutas);  //definicion de la ruta principal

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
});

const PORT=process.env.PORT || 3000;  //definicion del puerto
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
})

