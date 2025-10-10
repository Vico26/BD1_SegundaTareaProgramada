const{sql,config}=require('./db');
async function obtenerUsuario(Usuario,Pass){
    try{
        let pool=await sql.connect(config);
        let result=await pool.request()
        .input('Usuario',sql.VarChar,Usuario)
        .input('Password',sql.VarChar,Pass)
        .execute('sp_obtenerUsuario');
        console.log(result.recordset);
        return result.recordset;
    }catch(err){
        console.log(err);
    }}
    module.exports={obtenerUsuario};
    