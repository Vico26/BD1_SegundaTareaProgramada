const{sql,config}=require('./db');  //importacion del modulo de la base de datos
async function consultarEmpleado(Filtro,PostByUser,PostInIP){
    try{
        let pool=await sql.connect(config);  //conexion con la base de datos
        let resultado=await pool.request()   //realizacion de la consulta
        .input('Filtro',sql.VarChar(128),Filtro)
        .input('PostByUser',sql.INT,PostByUser)
        .input('PostInIP',sql.VarChar(128),PostInIP)
        .execute('sp_ConsultarEmpleado');
        console.log(resultado.recordset);
        sql.close();
        return resultado.recordset;
    }catch(error){
        console.log(error);
    }} 
module.exports={consultarEmpleado};
//consultarEmpleado('94377996',1,'43.66.240.64'); 