/*Esta aprte es para obtener la rutas del servidor*/
const express=require('express');
const router=express.router();

const { logIn }=require('./logIn');//listo
const { logOut }=require('./logOut');//listo
const { obtenerEmpleados }=require('./obtenerEmpleados');//listo
const { obtenerMovimientos }=require('./obtenerMovimientos');
const{ obtenerErrores }=require('./obtenerErrores');//No se ocupa directo pero para logic si
const { obtenerBitacora }=require('./obtenerBitacora');//No se si se ocupa en GUI pero para logica si
const { obtenerUsuario }=require('./obtenerUsuario');//No se ocupa directo pero para logic si
const { insertarEmpleado }=require('./insertarEmpleado');//Listo
const { insertarMovimiento }=require('./insertarMovimiento');
const {guardaBitacora}=require('./guardaBitacora');//Por si se llega a necesitar
const {buscarEmpleados}=require('./buscarEmpleados');
const {actualizarEmpleado}=require('./actualizarEmpleado');
const {consultarEmpleado}=require('./consultarEmpleado');
const {borrarEmpleado}=require('./borrarEmpleado');

/*LOGIN AND LOGOUT*/
router.post('/login',async(req,res)=>{
    const {Usuario,Password}=req.body;
    if (!Usuario || !Password) {
        return res.status(400).json({ error: 'Faltan datos' });
    }
    try {
        const PostInIP=req.headers['x-forwarded-for'] || req.connection.remoteAddress||req.ip;
        const resultado = await logIn(Usuario, Password,PostInIP);
        if (resultado.success) {
            req.session.userId = userId; // Guardar el usuario en la sesión
            res.json(resultado);}
        else {
            const errores = await obtenerErrores();
            const descripcionError = errores.find(e => e.CodigoError === resultado.codigoError)?.DescripcionError || 'Error desconocido';
            res.status(400).json({ error: descripcionError, CodigoError: resultado.codigoError });
    }}catch (error) {
        console.error('Error en /login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.post('/logout',async(req,res)=>{
    const {Usuario}=req.body;
    try{const PostInIP=req.headers['x-forwarded-for'] || req.connection.remoteAddress||req.ip;
    const resultado=await logOut(Usuario,PostInIP);
    res.json(resultado);}
    catch(error){
        console.error('Error en /logout:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
    
});
/*Procesos de empleados*/
router.get('/empleados',async(req,res)=>{ //Obtener empleados
    try{
        const empleados=await obtenerEmpleados();
        res.json(empleados);
    }
    catch(error){
        console.error('Error en /empleados:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }});

router.post('/empleados/',async(req,res)=>{ //Insertar empleado
    const{valorDocIdenti,Nombre,NombrePuesto,FechaContratacion}=req.body;
    const PostByUser=req.session.userId; // Obtener el usuario de la sesión
    if(!PostByUser){
        return res.status(401).json({error:'No autenticado'});
    }
    if(!valorDocIdenti || !Nombre || !NombrePuesto || !FechaContratacion){
        return res.status(400).json({error:'Faltan datos'});
    }
    try{
        const PostInIP=req.headers['x-forwarded-for'] || req.connection.remoteAddress||req.ip;
        const resultado=await insertarEmpleado(valorDocIdenti,Nombre,NombrePuesto,FechaContratacion,PostByUser,PostInIP);
        if(resultado.success){ 
            res.json(resultado,{menssage:'Empleado insertado correctamente'});
        }else{
            const errores=await obtenerErrores();
            const descripcionError=errores.find(e=>e.CodigoError===resultado.CodigoError)?.DescripcionError || 'Error desconocido';
            res.status(400).json({error:descripcionError, CodigoError:resultado.CodigoError});
        }}
    catch(error){
        console.error('Error en /empleados:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }});
