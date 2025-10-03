USE Empresa2;
GO
CREATE PROCEDURE sp_LogOut --Como estaba LoggedIN se asume que existe el usuario para el LogOut
	@User VARCHAR(128),
	@PostInIP VARCHAR(45)
AS 
BEGIN
	SET NOCOUNT ON;
	DECLARE @userID INT; --SE DECLARA UN INT PORQUE idPostByUser recibe un INT y no un varchar
	SELECT @userID=id FROM Usuario WHERE Username=@User;

	EXEC sp_GuardarEvento 4, 'Logout existoso',@userID,@PostInIP;
	RETURN 0;
END
