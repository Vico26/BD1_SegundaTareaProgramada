USE Empresa2;
GO

CREATE PROCEDURE sp_verificarLogIn
	@Username VARCHAR(128),
	@Pass VARCHAR(128),
	@PostInIp VARCHAR(128) 
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @UserId INT, @TimepoAhora DATETIME= GETDATE(),@fracasos INT;


	--VALIDA SI EXISTE USUARIO
	SELECT @UserId =id FROM Usuario WHERE Username =@Username;
	IF @UserId IS NULL
	BEGIN
		EXEC sp_GuardarEvento 2, 'Username no existe', NULL,@PostInIp;
		RETURN 50001;
	END;
	IF EXISTS(SELECT 1 FROM BitacoraEvento WHERE idPostByUser=@UserId
		AND PostInIP=@PostInIp AND idTipoEvento=3 AND DATEDIFF(MINUTE, PostTime,@TimepoAhora)<10
	)
	BEGIN
		EXEC sp_GuardarEvento 3, 'Intento de usuario bloqueado', @UserId,@PostInIp;
		RETURN 50003;
	END;

	IF NOT EXISTS(SELECT 1 FROM Usuario WHERE id=@UserId AND Pass=@Pass)
	BEGIN
		SELECT @fracasos = COUNT(*) FROM BitacoraEvento WHERE idPostByUser=@UserId 
		AND PostInIP=@PostInIp AND idTipoEvento=2 AND DATEDIFF(MINUTE,PostTime,@TimepoAhora) <5;

		IF @fracasos>=4
		BEGIN
			EXEC sp_GuardarEvento 3, 'Usuario bloqueado por 5 intentos fallidos', @UserId,@PostInIp;
			RETURN 50003;
		END
		ELSE
		BEGIN
			EXEC sp_GuardarEvento 2,'Password incorrecta',@UserId,@PostInIp;
			RETURN 50002;
		END
	END;

	EXEC sp_GuardarEvento 1,'Login exitoso',@UserId,@PostInIp;
END;