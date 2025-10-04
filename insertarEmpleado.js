const { rows } = require('mssql');
const{sql,config}=require('./db'); //importacion del modulo de la base de datos
async function insertarEmpleado(id,ValorDocumentoIdentidad,Nombre,NombrePuesto,FechaContratacion){
    try{
        let pool=await sql.connect(config); //conexion a la base de datos
        let result=await pool.request() //ejecucion del procedimiento almacenado
        .input('id',sql.Int,id)
        .input('ValorDocumentoIdentidad',sql.VarChar(20),ValorDocumentoIdentidad)
        .input('Nombre',sql.VarChar(128),Nombre)
        .input('NombrePuesto',sql.VarChar(128),NombrePuesto)
        .input('FechaContratacion',sql.Date,FechaContratacion)
        .output('CodigoError',sql.Int)
        .execute('sp_InsertarEmpleado');
        
        const codigoError=result.output.CodigoError; //obtener el codigo de error del procedimiento almacenado
        if(codigoError!=0){
            console.log({success: false, codigoError});
            return {success: false, codigoError};
        }else{
            console.log('Empleado insertado correctamente');
            return {success: true, rowsAffected: result.rowsAffected};
        }
}catch(err){
    console.log(err); //imprimir el error en la consola
    return {success: false, error: err};
}}
//insertarEmpleado(6,'118536989','Rosa Monteverde Hidalgo','Conductor','2021-11-12'); //llamada a la funcion para insertar un empleado