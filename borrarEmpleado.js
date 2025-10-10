const{sql,config}=require('./db');  //importacion del modulo de la base de datos
async function borrarEmpleado(valorDocId,PostByUser,PostInIP,CodigoErrror){
    try{
        let pool= await sql.connect(config);  //conexion con la base de datos
        let resultado=await pool.request()   //realizacion de la consulta
        .input('valorDocId',sql.VarChar(128),valorDocId)
        .input('PostByUser',sql.INT,PostByUser)
        .input('PostInIP',sql.VarChar(128),PostInIP)
        .output('CodigoErrror',sql.INT,CodigoErrror)
        .excecute('sp_BorrarEmpleado');

        console.log(resultado.recordset);
        sql.close();
        return resultado.recordset;
    }catch(error){
        console.log(error);
    }}
    module.exports={borrarEmpleado};
    //borrarEmpleado('94377996',1,')
