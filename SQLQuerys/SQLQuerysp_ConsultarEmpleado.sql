USE Empresa2;
GO
CREATE PROCEDURE sp_ConsultarEmpleado
	@Filtro varchar(128)
AS
BEGIN
	DECLARE @descrip VARCHAR(MAX);
	SELECT
		e.valorDocumentoIdentidad AS 'DocuemntoIdentidad',
		e.Nombre AS 'Nombre',
		p.Nombre AS 'Nombre del Puesto',
		e.saldoVacaciones AS 'Saldo de vacaciones'
	FROM dbo.Empleado e INNER JOIN Puesto p ON e.idPuesto=p.id 
	WHERE e.esActivo=1 
		AND(@Filtro IS NULL OR e.Nombre LIKE '%'+@Filtro+'%' OR e.valorDocumentoIdentidad =@Filtro);
END;

