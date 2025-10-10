USE Empresa2;
GO
CREATE PROCEDURE sp_ObtenerErrores
AS
BEGIN
	SET NOCOUNT ON;
	SELECT
		e.id,
		e.Codigo,
		e.Descripcion
	FROM ERROR e;
END;