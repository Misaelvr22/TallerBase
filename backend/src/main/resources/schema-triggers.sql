-- Script para crear la tabla trabajador
CREATE TABLE IF NOT EXISTS trabajador (
                                          id_trab INT AUTO_INCREMENT PRIMARY KEY,
                                          password VARCHAR(255),
                                          nombre VARCHAR(40) NOT NULL,
                                          oficio VARCHAR(20) NOT NULL,
                                          rfc VARCHAR(13) NOT NULL UNIQUE,
                                          sueldo_hr FLOAT,
                                          fecha_ingreso DATE
    -- Otras columnas necesarias
);

-- Script para crear la función y el trigger que establece el sueldo por oficio
CREATE TRIGGER IF NOT EXISTS trigger_set_sueldo_hr
    BEFORE INSERT ON trabajador
    FOR EACH ROW
BEGIN
    IF NEW.oficio = 'Ingeniero' THEN
        SET NEW.sueldo_hr = 50.0;
    ELSEIF NEW.oficio = 'Arquitecto' THEN
        SET NEW.sueldo_hr = 45.0;
    ELSEIF NEW.oficio = 'Obrero' THEN
        SET NEW.sueldo_hr = 20.0;
    ELSE
        SET NEW.sueldo_hr = 15.0; -- Sueldo por defecto para otros oficios
    END IF;
END;

