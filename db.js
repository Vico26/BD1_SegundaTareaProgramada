/*BD-Proyecto programado 2
    Integrantes: Victoria Molina Martínez
                  Gabriel Perez Tullocks
Se esta utilizando  Node.js con Express para el servidor
Para el servidor se esta manejando SQL Server, en conjunto con MSSQL
*/

const sql=require('mssql');

const config={              //configuracion de la base de datos
    user:'sa',              //usuario del servidor, para la conexion de la BD
    password:'aWo3lp0lloC1x',   //contraseña del servidor
    server:'DESKTOP-VICTORI',   //Servidor donde se esta corriendo la base de datos
    database:'Empresa2',         //Nombre de la base de datos
    options:{
        encrypt:true,
        trustServerCertificate:true
    }
};
module.exports={sql,config};        //exportacion del modulo para ser utilizado en otros archivos