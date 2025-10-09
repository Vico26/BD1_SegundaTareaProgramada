USE Empresa2;
GO
CREATE PROCEDURE sp_BorrarEmpleado
	@valorDocumentoIdentidad VARCHAR(20)
AS
BEGIN
	SELECT 
		e.valorDocumentoIdentidad FROM Empleado e WHERE e.valorDocumentoIdentidad=@valorDocumentoIdentidad AND e.esActivo=1;
	UPDATE dbo.Empleado
	SET esActivo=0 WHERE valorDocumentoIdentidad=@valorDocumentoIdentidad AND esActivo=1;
END;