USE Empresa2;
GO
CREATE PROCEDURE sp_obtenerUsuario
	@user VARCHAR(128),
	@pass VARCHAR(128)
AS
BEGIN
	SELECT
		id,Username FROM Usuario WHERE Username=@user AND Pass=@pass;
END;