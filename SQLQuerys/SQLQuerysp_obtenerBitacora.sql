USE Empresa2;
GO
CREATE PROCEDURE sp_obtenerBitacora
AS
BEGIN
	SET NOCOUNT ON;
	SELECT
		b.id,
		t.ID AS idTipoEvento, 
		b.Descripcion,
		u.id AS idPostByUser,
		b.PostInIP,
		b.PostTime
	FROM BitacoraEvento b 
	INNER JOIN TipoEvento t ON b.idTipoEvento=t.ID
	INNER JOIN Usuario u ON b.idPostByUser=u.id;
END;