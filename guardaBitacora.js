const { MAX } = require('mssql');
const{sql,config}=require('./db');
async function guardaBitacora(idTipoEvento,Descripcion,idPostByUser,PostInIP){
    try{
        let pool=await sql.connect(config);
        let insert=await pool.request()
        .input('idTipoEvento',sql.Int,idTipoEvento)
        .input('Descripcion',sql.VarChar(MAX),Descripcion)
        .input('idPostByUser',sql.Int,idPostByUser)
        .input('PostInIP',sql.VarChar(45),PostInIP)
        .execute('sp_GuardarEvento');
    }catch(err){
        console.log(err);
    }}
    module.exports={guardaBitacora};