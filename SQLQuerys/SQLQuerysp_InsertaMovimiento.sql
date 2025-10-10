USE Empresa2;
GO
CREATE PROCEDURE sp_InsertarMovimiento
    @ValorDocId VARCHAR(20),
    @IdTipoMovimiento INT,
    @Monto INT,
    @PostByUser INT,
    @PostInIP VARCHAR(45),
    @CodigoError INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @saldoActual INT, @nuevoSaldo INT, @tipoAccionM VARCHAR(10), @descrip VARCHAR(MAX), 
	@nombreEmpleado VARCHAR(128),@NombreTipoM VARCHAR(128),@username VARCHAR(128);

	--Traer username del Usuario
	SELECT @username= UserName FROM Usuario WHERE id=@PostByUser;

	-- Traer saldo actual del empleado
    SELECT @saldoActual = saldoVacaciones, @nombreEmpleado=Nombre
    FROM Empleado
    WHERE valorDocumentoIdentidad = @ValorDocId
      AND esActivo = 1;

	-- Traer tipo de acción del movimiento (Credito/Debito)
    SELECT @tipoAccionM =tipoAccion, @NombreTipoM= Nombre
    FROM TipoMovimiento 
    WHERE id = @IdTipoMovimiento;

	IF @username IS NULL
	BEGIN
		SET @CodigoError=50008;
		SET @descrip='Usuario no encontrado. Documento Identidad: '+@ValorDocId+
		', Nombre del empleado: '+@nombreEmpleado+
		', Saldo actual: '+CAST(@saldoActual AS VARCHAR(20))+
		', Nombre del movimiento: '+@NombreTipoM+
		', Monto: '+CAST(@Monto AS VARCHAR(20));

		EXEC sp_GuardarEvento 13,@descrip,@PostByUser,@PostInIP;
		RETURN @CodigoError;
	END

    IF @saldoActual IS NULL
    BEGIN
        SET @CodigoError = 50008; -- Empleado no existe
		SET @descrip='Empleado no exite. Documento Identidad: '+@ValorDocId+
		', Nombre del empleado: '+@nombreEmpleado+
		', Saldo actual: '+CAST(@saldoActual AS VARCHAR(20))+
		', Nombre del movimiento: '+@NombreTipoM+
		', Monto: '+CAST(@Monto AS VARCHAR(20));
		EXEC sp_GuardarEvento 13,@descrip,@PostByUser,@PostInIP;
        RETURN @CodigoError;
    END

    IF @tipoAccionM IS NULL
    BEGIN
        SET @CodigoError = 50008; -- Empleado no existe
		SET @descrip='Tipo de movimiento no exite. Documento Identidad: '+@ValorDocId+
		', Nombre del empleado: '+@nombreEmpleado+
		', Saldo actual: '+CAST(@saldoActual AS VARCHAR(20))+
		', Nombre del movimiento: '+@NombreTipoM+
		', Monto: '+CAST(@Monto AS VARCHAR(20));
		EXEC sp_GuardarEvento 13,@descrip,@PostByUser,@PostInIP;
        RETURN @CodigoError;
    END

    -- Calcular nuevo saldo según TipoAccion
    IF @tipoAccionM = 'Debito'
        SET @nuevoSaldo = @saldoActual - @Monto;
    ELSE
        SET @nuevoSaldo = @saldoActual + @Monto;

    -- Validar que no sea negativo
    IF @nuevoSaldo < 0
    BEGIN
        SET @CodigoError = 50011; -- MONTO HACE NEG
		SET @descrip='Monto del movimiento rechazado pues si se aplicar el saldo seria negativo. Documento Identidad: '+@ValorDocId+
		', Nombre del empleado: '+@nombreEmpleado+
		', Saldo actual: '+CAST(@saldoActual AS VARCHAR(20))+
		', Nombre del movimiento: '+@NombreTipoM+
		', Monto: '+CAST(@Monto AS VARCHAR(20));
		EXEC sp_GuardarEvento 13,@descrip,@PostByUser,@PostInIP;
        RETURN @CodigoError;
    END

    -- Insertar movimiento
    INSERT INTO Movimiento(IdEmpleado, IdTipoMovimiento, Fecha, Monto, PostByUser, PostInIP, PostTime, NuevoSaldo)
    VALUES (@ValorDocId, @IdTipoMovimiento, GETDATE(), @Monto, @username, @PostInIP, GETDATE(), @nuevoSaldo);

    -- Actualizar saldo en Empleado
    UPDATE Empleado
    SET saldoVacaciones = @nuevoSaldo
    WHERE valorDocumentoIdentidad = @ValorDocId;
    SET @CodigoError = 0; -- Todo OK

	SET @CodigoError = 0; -- EXITO
		SET @descrip='Documento Identidad: '+@ValorDocId+
		', Nombre del empleado: '+@nombreEmpleado+
		', Nuevo saldo: '+CAST(@nuevoSaldo AS VARCHAR(20))+
		', Nombre del movimiento: '+@NombreTipoM+
		', Monto: '+CAST(@Monto AS VARCHAR(20));
		EXEC sp_GuardarEvento 14,@descrip,@PostByUser,@PostInIP;
	RETURN @CodigoError;
END;
GO
