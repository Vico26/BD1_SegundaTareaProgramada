const{sql,config}=require('./db'); //importacion del modulo de la base de datos
async function obtenerErrores(){
    try{
        let pool=await sql.connect(config);
        let result=await pool.request().execute('sp_ObtenerErrores');
        console.log("Resultados: ",result.recordset);
        sql.close();
        return result.recordset;
    }catch(error){
        console.log(error);
    }}
module.exports=obtenerErrores; //exportacion de la funcion para ser utilizada en otros archivos
//obtenerErrores(); //llamada a la funcion para obtener los empleados   