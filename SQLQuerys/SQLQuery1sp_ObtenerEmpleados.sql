USE Empresa2;
GO
CREATE PROCEDURE sp_ObtenerEmpleados
AS 
BEGIN
	SET NOCOUNT ON;
	SELECT 
		e.id,e.Nombre,
		e.valorDocumentoIdentidad AS ValorDocumentoIdentidad,
		p.Nombre AS Puesto,
		p.SalarioxHora AS SalarioxHora,
		e.fechaContratacion AS FechaContratacion,
		e.saldoVacaciones AS SaldoVacaciones,
	CASE
		WHEN e.esActivo=1 THEN 'Activo' ELSE 'INACTIVO' --Pone el estado en Activo(1) o Inactivo(0)
	END AS ESTADO
	FROM Empleado e INNER JOIN Puesto p ON e.idPuesto = p.id --RELACIONA EL idPuesto de Empleado con el id de Puesto.
	ORDER BY e.Nombre ASC;--Ordena el Nombre en ASC
END;




