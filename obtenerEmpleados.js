const{sql,config}=require('./db'); //importacion del modulo de la base de datos
async function obtenerEmpleados(){
    try{
        let pool=await sql.connect(config); //conexion a la base de datos
        let result=await pool.request().execute('sp_ObtenerEmpleados'); //ejecucion del procedimiento almacenado
        console.log("Resultados: ",result.recordset); //imprimir el resultado en la consola\
        sql.close(); //cerrar la conexion
        return result.recordset; //retornar el resultado
    }catch(error){
        console.log(error); //imprimir el error en la consola
    }
}
module.exports={obtenerEmpleados}; //exportacion de la funcion para ser utilizada en otros archivos
//obtenerEmpleados(); //llamada a la funcion para obtener los empleados

