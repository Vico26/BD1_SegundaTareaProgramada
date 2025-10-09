USE Empresa2;

CREATE TABLE dbo.Puesto(
	id INT IDENTITY(1,1) PRIMARY KEY,
	Nombre varchar(128) NOT NULL,
	SalarioxHora DECIMAL(10,2) NOT NULL
);
GO
CREATE TABLE dbo.Empleado(
	id INT IDENTITY(1,1) PRIMARY KEY,
	idPuesto INT NOT NULL,
	valorDocumentoIdentidad varchar(20) UNIQUE NOT NULL,
	Nombre varchar(128) NOT NULL,
	fechaContratacion DATE NOT NULL,
	saldoVacaciones INT DEFAULT 0,
	esActivo TINYINT DEFAULT 1
	FOREIGN KEY(idPuesto) REFERENCES dbo.Puesto(id) 
);
GO
CREATE TABLE dbo.TipoMovimiento(
	id INT PRIMARY KEY,
	Nombre varchar(128) NOT NULL,
	tipoAccion varchar(128) NOT NULL
);
GO
CREATE TABLE dbo.Usuario(
	id INT PRIMARY KEY,
	Username varchar(128),
	Password varchar(128)
);
GO
CREATE TABLE dbo.Movimiento( 
	id INT IDENTITY(1,1) PRIMARY KEY, 
	IdEmpleado VARCHAR(20) NOT NULL, 
	IdTipoMovimiento INT NOT NULL,
	Fecha DATETIME NOT NULL, 
	Monto INT NOT NULL,  
	PostByUser VARCHAR (128) NOT NULL,
	PostInIP VARCHAR (45) NOT NULL, 
	PostTime DATETIME NOT NULL,
	NuevoSaldo INT NOT NULL
	FOREIGN KEY (IdEmpleado) REFERENCES dbo.Empleado(valorDocumentoIdentidad), 
	FOREIGN KEY (IdTipoMovimiento) REFERENCES dbo.TipoMovimiento(id),
	FOREIGN KEY (PostByUser) REFERENCES dbo.Usuario(Username)
);
GO
CREATE TABLE dbo.TipoEvento(
	ID INT PRIMARY KEY,
	Nombre varchar(128)
);
GO
CREATE TABLE dbo.BitacoraEvento(
	id INT PRIMARY KEY,
	idTipoEvento INT NOT NULL,
	Descripcion TEXT NOT NULL,
	idPostByUser INT NOT NULL,
	PostInIP varchar(128) NOT NULL,
	PostTime DATETIME NOT NULL,
	FOREIGN KEY (idTipoEvento) REFERENCES dbo.TipoEvento(id),
	FOREIGN KEY (idPostByUser) REFERENCES dbo.Usuario(id)
);
GO
CREATE TABLE dbo.BDError(
	id INT PRIMARY KEY,
	UserName varchar(50) NOT NULL,
	Number INT NOT NULL,
	StateE  INT NOT NULL,
	Severity INT NOT NULL,
	Line INT NOT NULL,
	ProcedureE varchar(100) NOT NULL,
	MessageE TEXT NOT NULL,
	DateTimeE DATETIME NOT NULL
);
GO
CREATE TABLE dbo.ERROR(
	id INT PRIMARY KEY NOT NULL,
	Codigo INT NOT NULL,
	Descripcion TEXT NOT NULL
);