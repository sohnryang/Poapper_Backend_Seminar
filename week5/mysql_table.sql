USE poapper_backend;
CREATE TABLE foods(
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  kcal INTEGER NOT NULL,
  isVegan BOOLEAN NOT NULL,
  PRIMARY KEY(id)
);
