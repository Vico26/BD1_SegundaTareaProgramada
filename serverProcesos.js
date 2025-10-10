/*Esta aprte es para obtener la rutas del servidor*/
const express=require('express');
const { logIn }=require('./logIn');
const { logOut }=require('./logOut');
const { obtenerEmpleados }=require('./obtenerEmpleados');
const { obtenerMovimientos }=require('./obtenerMovimientos');
const{ obtenerErrores }=require('./obtenerErrores');
const { obtenerBitacora }=require('./obtenerBitacora');
const { insertarEmpleado }=require('./insertarEmpleado');
const { insertarMovimiento }=require('./insertarMovimiento');
const {guardaBitacora}=require('./guardaBitacora');
const {buscarEmpleados}=require('./buscarEmpleados');
const {actualizarEmpleado}=require('./actualizarEmpleado');
const {consultarEmpleado}=require('./consultarEmpleado');
const router=express.router();