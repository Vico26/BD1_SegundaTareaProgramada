const{sql,config}=require('./db');
async function obtenerUsuario(user,Pass){
    try{
        let pool=await sql.connect(config);
        let result=await pool.request().execute('sp_obtenerUsuario');
        console.log(result.recordset);
        return result.recordset;
    }catch(err){
        console.log(err);
    }}
    module.exports={obtenerUsuario};
    //obtenerUsuario();
    