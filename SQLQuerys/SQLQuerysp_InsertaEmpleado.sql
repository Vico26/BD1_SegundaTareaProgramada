USE Empresa2;
GO
CREATE PROCEDURE sp_InsertarEmpleado
	@id INT,
	@ValorDocumentoIdentidad VARCHAR(20),
	@Nombre VARCHAR(128),
	@NombrePuesto VARCHAR(128),
	@FechaContratacion DATE,
	@CodigoError INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	SET @CodigoError=0;
	DECLARE @idPuesto INT;

	BEGIN TRY
		IF @id <=0
		BEGIN
			SET @CodigoError=50008; --ERROR=> ID MAL PUESTO
			RETURN;
		END

		IF @ValorDocumentoIdentidad LIKE '%[^0-9]%'
		BEGIN
			SET @CodigoError=50010; --ERROR=> Valor de doc no numerico
			RETURN;
		END

		IF @Nombre LIKE '%[^A-Za-z ]%'
		BEGIN
			SET @CodigoError=50009;--ERROR=> NOMBRE NO ALFABETICO
			RETURN;
		END

		IF EXISTS(SELECT 1 FROM Empleado WHERE valorDocumentoIdentidad=@ValorDocumentoIdentidad)
		BEGIN
			SET @CodigoError=50004; --ERROR=> VALOR DE INDENTIDAD YA EXISTE
			RETURN;
		END

		IF EXISTS(SELECT 1 FROM Empleado WHERE Nombre=@Nombre)
		BEGIN
			SET @CodigoError=50005;--ERROR=> MISMO NOMBRE Y APELLIDO
			RETURN;
		END

		SELECT @idPuesto=id FROM Puesto WHERE nombre=@NombrePuesto;
		IF @idPuesto IS NULL
		BEGIN
			SET @CodigoError=50008; --ERROR=> PUESTO NO ENCONTRADO.
			RETURN;
		END

		INSERT INTO Empleado(id,idPuesto,valorDocumentoIdentidad,Nombre,fechaContratacion,saldoVacaciones,esActivo)
		VALUES(@id,@idPuesto,@ValorDocumentoIdentidad,@Nombre,@FechaContratacion,0,1);
		SET @CodigoError=0;
	END TRY
	BEGIN CATCH
		SET @CodigoError=50008;
	END CATCH
END;