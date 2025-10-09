USE Empresa2;
GO
CREATE PROCEDURE sp_obtenerMovimientos
	@valorDocId VARCHAR(128)
AS 
BEGIN
	SET NOCOUNT ON;
	SELECT
		e.valorDocumentoidentidad,
		e.Nombre,e.saldoVacaciones,
		m.Fecha,
		tm.Nombre AS TipoMovimiento,
		m.Monto,m.NuevoSaldo,
		u.Username AS UsuarioRegistro,
		m.PostInIP,m.PostTime 
		FROM Empleado e
		LEFT JOIN Movimiento m ON m.IdEmpleado=e.valorDocumentoIdentidad
		LEFT JOIN TipoMovimiento tm ON tm.id=m.IdTipoMovimiento
		LEFT JOIN Usuario u ON u.Username=m.PostByUser
		WHERE e.valorDocumentoIdentidad=@valorDocId
		ORDER BY m.Fecha DESC;
END;
