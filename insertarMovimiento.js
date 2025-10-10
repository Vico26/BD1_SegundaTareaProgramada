const{sql,config}=require('./db');
async function insertarMovimiento(valorDocID,idTipoMovimiento,Monto,PostByUser,PostInIP,CodigoError){
    try{
        let pool= await sql.connect(config);
        let result= await pool.request()
        .input('valorDocID',sql.VarChar(20),valorDocID)
        .input('idTipoMovimiento',sql.Int,idTipoMovimiento)
        .input('Monto',sql.INT,Monto)
        .input('PostByUser',sql.Int,PostByUser)
        .input('PostInIP',sql.VarChar(45),PostInIP)
        .output('CodigoError',sql.Int)
        .execute('sp_InsertarMovimiento');
        const codigoError=result.output.CodigoError;
        if(codigoError!=0){
            console.log({success: false, codigoError});
            return {success: false, codigoError};
        }else{
            console.log('Movimiento insertado correctamente');
            return {success: true, rowsAffected: result.rowsAffected};
        }
    }catch(err){
        console.log(err);
        return {success: false, error: err};
    }}
    module.exports={insertarMovimiento};
//insertarMovimiento('6575299',3,5000,3,'151.147.244.214');