/*
Este file trabja la parte centra del servidor, en donde se manejan las rutas y la conexion con la base de datos
*/
const express=require('express');  //importacion de express
const path=require('path');      //importacion de path
const app=express();
app.use(express.json());
app.use(express.static('public'));

