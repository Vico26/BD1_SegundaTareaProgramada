USE Empresa2;
GO
CREATE PROCEDURE sp_obtenerPuestos
AS
BEGIN
	SELECT Nombre FROM Puesto;
END;
GO

CREATE PROCEDURE sp_obtenerTipoMov
AS
BEGIN
	SELECT Nombre FROM TipoMovimiento;
END;