const{sql,config}=require('./db');
async function obtenerPuestos(){
    try{
        let pool=await sql.connect(config);
        let result=await pool.request().execute('sp_obtenerPuestos');
        console.log(result.recordset);
        return result.recordset;
    }catch(err){
        console.log(err);
    }}
    module.exports={obtenerPuestos};