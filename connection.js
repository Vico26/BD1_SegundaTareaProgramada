/*BD-Proyecto programado 2
    Integrantes: Victoria Molina Martínez
                  Gabriel Perez Tullocks
Se esta utilizando  Node.js con Express para el servidor
Para el servidor se esta manejando SQL Server, en conjunto con MSSQL
*/

const sql=require('mssql');

const config={              //configuracion de la base de datos
    user:'admin_viewer',              //usuario del servidor, para entrar desde otro lado(locally)
    password:'c0nTr4S3nNi1a',   //contraseña del user admin_viewer
    server:'25.50.124.70', 
    port:1433,  //Servidor donde se esta corriendo la base de datos(IP de Hamachi)
    database:'Empresa2',         //Nombre de la base de datos
    options:{
        encrypt: false,      // Importante: false para Hamachi
        trustServerCertificate: true,
        connectTimeout: 30000,
        requestTimeout: 30000
    }
};
module.exports={sql,config};        //exportacion del modulo para ser utilizado en otros archivos