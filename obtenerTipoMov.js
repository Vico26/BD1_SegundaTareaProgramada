const{sql,config}=require('./db');
async function obtenerTipoMov(){
    try{
        let pool=await sql.connect(config);
        let result=await pool.request().execute('sp_obternerTipoMov');
        console.log(result.recordset);
        return result.recordset;
    }catch(err){
        console.log(err);
    }}
    module.exports={obtenerTipoMov};