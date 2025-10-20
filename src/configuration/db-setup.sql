-- Crear base de datos:
CREATE DATABASE IF NOT EXISTS escuela_tp_final;
USE escuela_tp_final;

-- Crear tablas:
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    rol ENUM('profesor', 'alumno') NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE materia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    usuarioID INT NOT NULL,
    FOREIGN KEY (usuarioID) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE matricula (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarioID INT NOT NULL,
    materiaID INT NOT NULL,
    FOREIGN KEY (usuarioID) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (materiaID) REFERENCES materia(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE tarea (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    fechaEntrega DATE NOT NULL,
    usuarioID INT NOT NULL,
    materiaID INT NOT NULL,
    FOREIGN KEY (usuarioID) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (materiaID) REFERENCES materia(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Insertar datos genericos:
/* INSERT INTO usuario (nombre, email, rol) VALUES
('Genaro Parra','genaro.parra@escuela.com','profesor'),
('Guillermo Valenzuela', 'guillermo.valenzuela@escuela.com', 'profesor'),
('Lucía Fernández', 'lucia.fernandez@escuela.com', 'alumno'),
('Julián Pérez', 'julian.perez@escuela.com', 'alumno'),
('Valentina Rodríguez', 'valentina.rodriguez@escuela.com', 'alumno'),
('Tomás Díaz', 'tomas.diaz@escuela.com', 'alumno'),
('Camila Morales', 'camila.morales@escuela.com', 'alumno');

INSERT INTO materia (nombre, usuarioID) VALUES
('Matemáticas', 1),
('Lengua y Literatura', 1),
('Historia', 2),
('Biología', 2),
('Educación Física', 1),
('Inglés', 2),
('Física', 1); */