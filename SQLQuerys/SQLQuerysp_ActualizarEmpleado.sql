USE Empresa2;
GO
CREATE PROCEDURE sp_ActualizarEmpleado
    @valorDocumentoIdentidadActual VARCHAR(20),
    @nuevoValorDocumentoIdentidad VARCHAR(20) = NULL,
    @nuevoNombre VARCHAR(128) = NULL,
    @nuevoPuesto VARCHAR(128) = NULL, --NOMBRE DEL PUESTO NO EL ID
    @PostByUser INT,
    @PostInIP VARCHAR(45),
    @CodigoError INT OUTPUT
AS
BEGIN
    DECLARE @descrip VARCHAR(MAX), @nombreActual VARCHAR(128), @puestoActual VARCHAR(128), @saldoV DECIMAL(10,2), @idPuestoNew INT;
    SET NOCOUNT ON;
    SELECT @nombreActual=e.Nombre, @puestoActual=p.Nombre, @saldoV=e.saldoVacaciones 
    FROM Empleado e INNER JOIN Puesto p ON e.idPuesto=p.id WHERE e.valorDocumentoIdentidad=@valorDocumentoIdentidadActual;

    -- Validar que el empleado exista
    IF NOT EXISTS (
        SELECT 1 FROM Empleado 
        WHERE valorDocumentoIdentidad = @valorDocumentoIdentidadActual
          AND esActivo = 1
    )
    BEGIN
        SET @CodigoError=50008;
        SET @descrip= 'El empleado que se intento actaulizar NO existe. Documento Identidad actual:'+@valorDocumentoIdentidadActual+
                    ', Nombre del empleado: '+@nombreActual+', Nombre del puesto:'+@puestoActual+', Saldo de vacaciones: '+@saldoV;
        EXEC sp_GuardarEvento 7,@descrip,@PostByUser,@PostInIP;
        RETURN @CodigoError;
    END;

    -- Validar duplicados solo si se mandan valores nuevos
    IF @nuevoValorDocumentoIdentidad IS NOT NULL
       AND EXISTS (
           SELECT 1 FROM Empleado
           WHERE valorDocumentoIdentidad = @nuevoValorDocumentoIdentidad
             AND valorDocumentoIdentidad <> @valorDocumentoIdentidadActual
       )
    BEGIN
        SET @CodigoError=50006;
        SET @descrip= 'Existe un empleado con ese valor de Documento identidad. Documento Identidad actual:'+@valorDocumentoIdentidadActual+
                    ', Nombre del empleado: '+@nombreActual+', Nombre del puesto:'+@puestoActual+', Saldo de vacaciones: '+@saldoV;
        EXEC sp_GuardarEvento 7,@descrip,@PostByUser,@PostInIP;
        RETURN @CodigoError;
    END;

    IF @nuevoNombre IS NOT NULL
       AND EXISTS (
           SELECT 1 FROM Empleado
           WHERE Nombre = @nuevoNombre
             AND valorDocumentoIdentidad <> @valorDocumentoIdentidadActual
       )
    BEGIN
        SET @CodigoError=50007;
        SET @descrip= 'Existe un empleado con ese Nombre. Documento Identidad actual:'+@valorDocumentoIdentidadActual+
                    ', Nombre del empleado: '+@nombreActual+', Nombre del puesto:'+@puestoActual+', Saldo de vacaciones: '+@saldoV;
        EXEC sp_GuardarEvento 7,@descrip,@PostByUser,@PostInIP;
        RETURN @CodigoError;
    END;

    IF @nuevoPuesto IS NOT NULL
    BEGIN
        SELECT @idPuestoNew =id FROM Puesto WHERE Nombre=@nuevoPuesto;
        IF @idPuestoNew IS NULL
        BEGIN
            SET @CodigoError=50008;
            SET @descrip= 'El nombre del puesto ingresado no existe'+@valorDocumentoIdentidadActual+
                ', Nombre del empleado: '+@nombreActual+', Nombre del puesto:'+@puestoActual+', Saldo de vacaciones: '+@saldoV;
            EXEC sp_GuardarEvento 7,@descrip,@PostByUser,@PostInIP;
            RETURN @CodigoError;
        END;
    END;

    -- Actualizar solo los campos que vienen con valores
    UPDATE Empleado
    SET
        valorDocumentoIdentidad = COALESCE(@nuevoValorDocumentoIdentidad, valorDocumentoIdentidad),
        Nombre = COALESCE(@nuevoNombre, Nombre),
        idPuesto = COALESCE(@idPuestoNew, idPuesto)
    WHERE valorDocumentoIdentidad = @valorDocumentoIdentidadActual
      AND esActivo = 1;

    SET @CodigoError=0;
    SET @descrip= 'Update exitoso. Documento Identidad anterior:'+@valorDocumentoIdentidadActual+
                ', Documento Identidad nuevo:'+ISNULL(@nuevoValorDocumentoIdentidad,@valorDocumentoIdentidadActual)+
                ', Nombre del empleado anterior: '+ISNULL(@nombreActual,'N/A')+
                ', Nombre nuevo:'+ISNULL(@nuevoNombre,@nombreActual)+
                ', Nombre del puesto anterior:'+ISNULL(@puestoActual,'N/A')+
                ', Nuevo puesto: '+ISNULL(@nuevoPuesto,@puestoActual)+', Saldo de vacaciones: '+CAST(@saldoV AS VARCHAR(20));
    EXEC sp_GuardarEvento 8,@descrip,@PostByUser,@PostInIP;
    RETURN @CodigoError;
END;
GO