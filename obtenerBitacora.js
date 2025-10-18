const{sql,config}=require('./db');
async function obtenerBitacora(){
    try{
        let pool=await sql.connect(config);
        let result=await pool.request().execute('sp_obtenerBitacora');
        console.log(result.recordset);
        return result.recordset;
    }catch(err){
        console.log(err);
    }}
    module.exports={obtenerBitacora};
    //obtenerBitacora();