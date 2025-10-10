const{sql,config}=require('./db');  //importacion del modulo de la base de datos
async function actualizarEmpleado(valorDocumentoIdentidad,nuevoValorDocumentoIdentidad,nuevoNombre,
    nuevoPuesto,PsotByUser,PostInIP,CodigoError){  //funcion para actualizar un empleado
    try{
        let pool=await sql.connect(config);  //conexion con la base de datos
        let result=await pool.request()   //peticion a la base de datos
        .input('valorDocumentoIdentidadActual',sql.VarChar,valorDocumentoIdentidad) //parametros de entrada
        .input('nuevoValorDocumentoIdentidad',sql.VarChar,nuevoValorDocumentoIdentidad)
        .input('nuevoNombre',sql.VarChar,nuevoNombre)
        .input('nuevoPuesto',sql.VarChar,nuevoPuesto)
        .input('PostByUser',sql.Int,PsotByUser)
        .input('PostInIP',sql.VarChar,PostInIP)
        .output('CodigoError',sql.Int,CodigoError)
        .execute('sp_ActualizarEmpleado'); //ejecucion del procedimiento almacenado
        console.log(result.output);  //impresion del resultado
        return result.output;  //retorno del resultado
    }catch(error){
        console.log(error);
    }  }
    module.exports={actualizarEmpleado};  //exportacion del modulo para ser utilizado en otros archivos
    //actualizarEmpleado('94377996','94377222',null,null,'6','120.60.29.65');