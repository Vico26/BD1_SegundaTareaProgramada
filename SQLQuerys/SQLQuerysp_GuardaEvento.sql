USE Empresa2;
GO
CREATE PROCEDURE sp_GuardarEvento
	@idTipoEvento INT,
	@Descripcion TEXT,
	@idPostByUser INT,
	@PostInIP VARCHAR(45)
AS
BEGIN
	SET NOCOUNT ON;
BEGIN TRY
	INSERT INTO bitacoraEvento(idTipoEvento,Descripcion,idPostByUser,PostInIP,PostTime)
	VALUES(@idTipoEvento,@Descripcion,@idPostByUser,@PostInIP,GETDATE());
END TRY

BEGIN CATCH
	DECLARE @identificaUser VARCHAR(128) --DECLARA UNA VARIABLE PARA BUSCAR EL USERNAME QUE INTENTA ENTRAR
	IF @idPostByUser IS NOT NULL --SI NO ES NULL BUSCA EL ID POR USUARIO 
		SELECT @identificaUser=Username FROM Usuario WHERE id=@idPostByUser;
	ELSE
		SET @identificaUser='UserNoDeterminado'; --NO LO ENCUENTRA, PONER 'UserNoIdeterminado' EN BDERROR

	INSERT INTO BDError(UserName,Number,MessageE,DateTimeE)
	VALUES(ISNULL(@identificaUser, SYSTEM_USER),ERROR_NUMBER(), ERROR_MESSAGE(),GETDATE());
END CATCH
END;