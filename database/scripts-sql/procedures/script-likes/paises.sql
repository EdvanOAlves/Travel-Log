DELIMITER $$
CREATE PROCEDURE obter_paises()
BEGIN
    SELECT * FROM tbl_pais;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE obter_paise_id(
  IN pais_id INT
)
BEGIN
    SELECT * FROM tbl_pais WHERE id = pais_id;
END $$
DELIMITER ;