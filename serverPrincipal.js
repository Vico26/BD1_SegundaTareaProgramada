/*
Este file trabja la parte centra del servidor, en donde se manejan las rutas y la conexion con la base de datos
*/
const express=require('express');  //importacion de express
const path=require('path');      //importacion de path
const app=express();
const cors=require('cors');  //importacion de cors

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use("/api",router);  //definicion de la ruta principal

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
});

const PORT=process.env.PORT || 3000;  //definicion del puerto
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

