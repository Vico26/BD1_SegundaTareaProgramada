const{sql,config}=require('./db');
async function logIn(Username,Pass,PostInIp){
    try{
        let pool=await sql.connect(config); //conexion a la base de datos
        let result=await pool.request()
        .input('Username',sql.VarChar(50),Username)
        .input('Pass',sql.VarChar(50),Pass)
        .input('PostInIp',sql.VarChar(45),PostInIp)  //Cambiar a VarChar(45)
        .output('UserId',sql.Int)
        .execute('sp_LogIn');
    const codigoError=result.returnValue;
    if(codigoErroo===0){
        console.log('LogIn exitoso',result.output.UserId);
        return{success:true,UserId:result.output.UserId};

    }else{
        console.log('LogIn fallido',codigoError);
        return{success:false,codigoError};
    }

}catch(err){
    console.log('Error con el LogIn',err); //imprimir el error en la consola
    return {success: false, error: err};
}}
module.exports={logIn};