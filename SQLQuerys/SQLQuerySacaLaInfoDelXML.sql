USE Empresa2;
GO
DECLARE @xml XML;

SELECT @xml= CONVERT(XML,BulkColumn) 
FROM OPENROWSET (BULK 'C:\Users\USUARIO\Documents\GitHub\BD1_SegundaTareaProgramada\archivoDatos.xml', SINGLE_BLOB) AS X;

--INSERT INTO dbo.Puesto(Nombre,SalarioxHora)
--SELECT 
--	P.value('@Nombre','VARCHAR(128)'),
--	P.value('@SalarioxHora', 'DECIMAL(10,2)')
--FROM @xml.nodes('/Datos/Puestos/Puesto') AS X(P);

--INSERT INTO dbo.TipoEvento(ID,Nombre)  --Saca Puestos del xml
--SELECT 
--	T.value('@Id','INT'),
--	T.value('@Nombre', 'VARCHAR(128)')
--FROM @xml.nodes('/Datos/TiposEvento/TipoEvento') AS X(T);

--INSERT INTO dbo.TipoMovimiento(id,Nombre,tipoAccion) --Saca Tipos de movimientos del xml
--SELECT
--	M.value('@Id','INT'),
--	M.value('@Nombre','VARCHAR(128)'),
--	M.value('@TipoAccion','VARCHAR(128)')
--FROM @xml.nodes('Datos/TiposMovimientos/TipoMovimiento') AS X(M);

--INSERT INTO dbo.Usuario(id,Username,Pass) --Saca Usuarios del xml
--SELECT
--	U.value('@Id','INT'),
--	U.value('@Nombre','VARCHAR(128)'),
--	U.value('@Pass','VARCHAR(128)')
--FROM @xml.nodes('/Datos/Usuarios/usuario') AS X(U);

--INSERT INTO dbo.ERROR(id,Codigo,Descripcion)
--SELECT
--	E.value('@Id','INT'),
--	E.value('@Codigo','INT'),
--	E.value('@Descripcion','VARCHAR(MAX)')
--FROM @xml.nodes('/Datos/Error/errorCodigo') AS X(E);

--INSERT INTO dbo.Empleado(idPuesto,valorDocumentoIdentidad,Nombre,fechaContratacion,saldoVacaciones,esActivo)
--SELECT
--	P.id,
--	E.value('@ValorDocumentoIdentidad','VARCHAR(20)'),
--	E.value('@Nombre','VARCHAR(128)'),
--	E.value('@FechaContratacion','DATETIME'),
--	0,
--	1
--FROM @xml.nodes('/Datos/Empleados/empleado') AS X(E)
--INNER JOIN Puesto P ON P.Nombre=E.value('@Puesto','VARCHAR(128)');

--INSERT INTO dbo.Movimiento(IdEmpleado,IdTipoMovimiento,Fecha,Monto,PostByUser,PostInIP,PostTime,NuevoSaldo)
--SELECT
--	M.value('@ValorDocId','VARCHAR(20)'),
--	M.value('@IdTipoMovimiento','INT'),
--	M.value('@Fecha','DATE'),
--	M.value('@Monto','INT'),
--	M.value('@PostByUser','VARCHAR(128)'),
--	M.value('@PostInIP','VARCHAR(45)'),
--	M.value('@PostTime','DATETIME'),
--	0
--FROM @xml.nodes('/Datos/Movimientos/movimiento') AS X(M);









