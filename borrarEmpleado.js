const { sql, config } = require('./db');

async function borrarEmpleado(valorDocId, PostByUser, PostInIP) {
    try {
        let pool = await sql.connect(config);
        const resultado = await pool.request()
            .input('valorDocumentoIdentidad', sql.VarChar(128), valorDocId)
            .input('PostByUser', sql.Int, PostByUser)
            .input('PostInIP', sql.VarChar(128), PostInIP)
            .output('CodigoError', sql.Int)
            .execute('sp_BorrarEmpleado');

        const CodigoError = resultado.output.CodigoError ?? -1;
        return { CodigoError, datos: resultado.recordset };
    } catch (error) {
        console.log('Error al borrar empleado', error);
        return { CodigoError: -1, datos: null };
    } finally {
        sql.close();
    }
}

module.exports = { borrarEmpleado };
borrarEmpleado('94377996',1,'177.104.198.156');
