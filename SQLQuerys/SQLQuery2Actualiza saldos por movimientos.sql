USE Empresa2;
GO
;WITH MovOrd AS
(
    SELECT
        m.id,
        m.IdEmpleado,
        m.Monto,
        tm.TipoAccion,
        m.Fecha,
        m.PostTime,
        ROW_NUMBER() OVER(PARTITION BY m.IdEmpleado ORDER BY m.Fecha, m.PostTime, m.id) AS rn
    FROM Movimiento m
    JOIN TipoMovimiento tm ON tm.id = m.IdTipoMovimiento
),
SaldoRec AS
(
    SELECT
        mo.id,
        mo.IdEmpleado,
        mo.Monto,
        mo.TipoAccion,
        mo.Fecha,
        mo.PostTime,
        mo.rn,
        e.saldoVacaciones AS SaldoPrev,
        CASE 
            WHEN mo.TipoAccion = 'Credito' THEN e.saldoVacaciones + mo.Monto
            ELSE e.saldoVacaciones - mo.Monto
        END AS SaldoNuevo
    FROM MovOrd mo
    JOIN Empleado e ON e.valorDocumentoIdentidad = mo.IdEmpleado
    WHERE mo.rn = 1

    UNION ALL

    SELECT
        mo.id,
        mo.IdEmpleado,
        mo.Monto,
        mo.TipoAccion,
        mo.Fecha,
        mo.PostTime,
        mo.rn,
        sr.SaldoNuevo AS SaldoPrev,
        CASE 
            WHEN mo.TipoAccion = 'Credito' THEN sr.SaldoNuevo + mo.Monto
            ELSE sr.SaldoNuevo - mo.Monto
        END AS SaldoNuevo
    FROM MovOrd mo
    JOIN SaldoRec sr ON sr.IdEmpleado = mo.IdEmpleado AND mo.rn = sr.rn + 1
)
-- UPDATE directo usando el CTE
UPDATE e
SET saldoVacaciones = sr.SaldoNuevo
FROM Empleado e
JOIN
(
    SELECT IdEmpleado, MAX(SaldoNuevo) AS SaldoNuevo
    FROM SaldoRec
    GROUP BY IdEmpleado
) sr ON sr.IdEmpleado = e.valorDocumentoIdentidad;
