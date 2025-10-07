const{sql,config}=require('./db');
async function logOut(User,PostInIp){
    try{
        let pool=await sql.connect(config); //conexion a la base de datos
        let result=await pool.request()
        .input('User',sql.VarChar(128),User)
        .input('PostInIp',sql.VarChar(45),PostInIp)  //Cambiar a VarChar(45)
        .execute('sp_LogOut');
    const codigoError=result.returnValue;
    if(codigoError===0){
        console.log('LogOut exitoso');
        return{success:true};       
    }else{
        console.log('LogOut fallido',codigoError);
        return{success:false,codigoError};  

    }
}catch(err){
    console.log('Error con el LogOut',err); //imprimir el error en la consola
    return {success: false, error: err};
}}