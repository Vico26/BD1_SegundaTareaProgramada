/*Esta aprte es para obtener la rutas del servidor*/
const express=require('express');
const router=express.Router();

/*LogIn y LogOut*/
const { logIn }=require('./logIn');//listo
const { logOut }=require('./logOut');//listo

/*Todos los procesos de obtener*/
const { obtenerEmpleados }=require('./obtenerEmpleados');//listo
const { obtenerMovimientos }=require('./obtenerMovimientos');//listo
const{ obtenerErrores }=require('./obtenerErrores');//No se ocupa directo pero para logic si
const { obtenerBitacora }=require('./obtenerBitacora');//No se si se ocupa en GUI pero para logica si
const { obtenerUsuario }=require('./obtenerUsuario');//No se ocupa directo pero para logic si
const { obtenerPuestos }=require('./obtenerPuestos');//No se ocupa directo pero para logic si
const { obtenerTipoMov }=require('./obtenerTipoMov');//No se ocupa directo pero para logic si

/*Todos los procesos de insertar*/
const { insertarEmpleado }=require('./insertarEmpleado');//Listo
const { insertarMovimiento }=require('./insertarMovimiento');//listo

/*Procesos para la bitacoira*/
const {guardaBitacora}=require('./guardaBitacora');//Por si se llega a necesitar

/*Procesos para empleados*/
const {buscarEmpleados}=require('./buscarEmpleados');//listo
const {actualizarEmpleado}=require('./actualizarEmpleado');//listo
const {consultarEmpleado}=require('./consultarEmpleado');//listo
const {borrarEmpleado}=require('./borrarEmpleado');//listo

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
            req.session.userId = resultado.UserId; // Guardar el usuario en la sesión
            res.json(resultado);}
        else {
            const errores = await obtenerErrores();
            const descripcionError = errores.find(e => e.Codigo === resultado.codigoError)?.Descripcion || 'Error desconocido';
            res.status(400).json({ error: descripcionError, CodigoError: resultado.codigoError });
            console.log('Error de login:', descripcionError, resultado.codigoError);
    }}catch (error) {
        console.error('Error en /login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.post('/logout',async(req,res)=>{
    const {Usuario}=req.body;
    try{const PostInIP=req.headers['x-forwarded-for'] || req.connection.remoteAddress||req.ip;
    const resultado=await logOut(Usuario,PostInIP);
    req.session.destroy();
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
            const descripcionError=errores.find(e=>e.CodigoError===resultado.CodigoError)?.Descripcion || 'Error desconocido';
            res.status(400).json({error:descripcionError, CodigoError:resultado.CodigoError});
        }}
    catch(error){
        console.error('Error en /empleados:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }});

router.get('/empleados/buscar/:termino',async(req,res)=>{
    try{
        const termino=req.params.termino;
        const result=await buscarEmpleados(termino);
        if (result==="No se ha encontrado"){
            return res.status(404).json({error:result});
        }
        if (result==="Error al buscar empleados"){
            return res.status(500).json({error:result});
        }
        res.json(result);
    }catch(error){
        console.error('Error en /empleados/buscar:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }});
router.put('/empleados/actualizar',async(req,res)=>{
    try{
    const{
        valorDocumentoIdentidad,
        nuevoValorDocumentoIdentidad,
        nuevoNombre,
        nuevoPuesto,
    } =req.body;

    const PostByUser=req.session.userId;
    const PostInIP=req.headers['x-forwarded-for'] || req.connection.remoteAddress||req.ip;

    if(!valorDocumentoIdentidad || !PostByUser || PostByUser===0 || !PostInIP){
        return res.status(400).json({error:'Faltan datos obligatorios'});
    }
    const resultado=await actualizarEmpleado(
        valorDocumentoIdentidad,
        nuevoValorDocumentoIdentidad || null,
        nuevoNombre || null,
        nuevoPuesto || null,
        PostByUser,
        PostInIP,
        0
    );
    const CodigoError=resultado?.CodigoError?? -1;
    if (CodigoError!==0){
        const errores=await obtenerErrores();
        const descripcionError=errores.find(e=>e.CodigoError===CodigoError)?.Descripcion || 'Error desconocido';
        return res.status(400).json({error:descripcionError, CodigoError:CodigoError});
    }
    res.json({message:'Empleado actualizado correctamente'});
}catch(error){
    console.error('Error en /empleados/actualizar:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
}});

router.get('/empleados/consultar/:Filtro', async (req, res) => {
  try {
    const filtro = req.params.Filtro;

    if(!req.session || !req.session.userId){
      return res.status(401).json({ error: 'No estás autenticado' });
    }

    const userId = req.session.userId;
    const userIP = req.ip;

    const empleados = await consultarEmpleado(filtro, userId, userIP);

    if(!empleados || empleados.length === 0){
      return res.status(404).json({ error: 'No se encontró ningún empleado' });
    }

    res.json(empleados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al consultar empleado' });
  }
});


router.delete('/empleados/borrar/:id', async (req, res) => {
    try {
        const valorDocId = req.params.id?.trim();
        const PostByUser = req.session?.userId;
        const PostInIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;

        console.log('ID recibido:', valorDocId);
        console.log('Usuario en sesión:', PostByUser);
        console.log('IP detectada:', PostInIP);

        if (!valorDocId || !PostByUser || PostByUser === 0 || !PostInIP) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }

        const resultado = await borrarEmpleado(valorDocId, PostByUser, PostInIP);
        console.log('Resultado borrarEmpleado:', resultado);

        const CodigoError = resultado?.CodigoError ?? -1;

        if (CodigoError !== 0) {
            const errores = await obtenerErrores();
            const descripcionError = errores.find(e => e.CodigoError === CodigoError)?.Descripcion || 'Error desconocido';
            return res.status(400).json({ error: descripcionError, CodigoError });
        }

        return res.json({ message: 'Empleado borrado correctamente' });
    } catch (error) {
        console.error('Error en /empleados/borrar:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/*Procesos de movimientos*/
router.get('/empleados/movimientos/:valorDocId',async(req,res)=>{
    try{
        const valorDocId=req.params.valorDocId?.trim();
        if(!valorDocId){
            return res.status(400).json({error:'Faltan datos'});
        }
        const resultado=await obtenerMovimientos(valorDocId);
        if(!resultado || resultado.length===0){
            return res.status(404).json({error:'No se han encontrado movimientos'});
        }
        res.json(resultado);
    }catch(error){
        console.error('Error en /empleados/movimientos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.post('/empleados/movimientos',async(req,res)=>{
    try{
        const{valorDocIdenti,TipoMovimiento,Monto}=req.body;
        const PostByUser=req.session.userId; // Obtener el usuario de la sesión
        const PostInIP=req.headers['x-forwarded-for'] || req.connection.remoteAddress||req.ip;
        if(!valorDocIdenti||!TipoMovimiento||!Monto||!PostByUser){
            return res.status(401).json({error:'Faltan datos obligatorios'});
        }
        const resultado=await insertarMovimiento(valorDocIdenti,TipoMovimiento,Monto,PostByUser,PostInIP);
        if(!resultado.success){
            const errores=await obtenerErrores();
            const descripcionError=errores.find(e=>e.CodigoError===resultado.CodigoError)?.Descripcion || 'Error desconocido';
            return res.status(400).json({error:descripcionError, CodigoError:resultado.CodigoError});
        }
        res.json({message:'Movimiento insertado correctamente'});
    }catch(error){
        console.error('Error en /empleados/movimientos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }  
});
/*Funciones extra*/ 
router.get('/puestos', async (req, res) => {
    try {
        const puestos = await obtenerPuestos();
        //console.log("Puestos obtenidos:", puestos); // debug
        res.json(puestos);
    } catch (error) {
        console.error('Error en /puestos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/tipoMovs',async(req,res)=>{ //Obtener empleados
    try{
        const tipoM=await obtenerTipoMov();
        res.json(tipoM);
    }
    catch(error){
        console.error('Error en /tipoMovs:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }});

module.exports=router;
